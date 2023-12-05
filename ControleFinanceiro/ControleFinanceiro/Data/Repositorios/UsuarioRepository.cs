using Certificare.Data.DTOs;
using Certificare.Data.Factory;
using Certificare.Data.Repositorios.Interfaces;
using ControleFinanceiro.Data.Enumeradores;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
namespace Certificare.Data.Repositorios
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IUsuarioFuncionalidadeRepository _usuarioFuncionalidadeRepository;

        public UsuarioRepository(IUsuarioFuncionalidadeRepository usuarioFuncionalidadeRepository)
        {
            _usuarioFuncionalidadeRepository = usuarioFuncionalidadeRepository;
        }

        #region Consulta

        public ResultDTO<List<UsuarioDTO>> ListarUsuariosFiltro(UsuarioRequestDTO request)
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = @"select u.*,
                                     s.Nome StatusDescricao
                                from Usuario u inner join Status s on u.IdStatus = s.Id
                               where 1 = 1";

                var parametros = new DynamicParameters();

                if (!string.IsNullOrWhiteSpace(request.CPF))
                {
                    query += "   and u.CPF like @cpf";
                    parametros.Add("cpf", $"%{request.CPF.Replace(".", "").Replace("-", "")}%");
                }

                if (!string.IsNullOrWhiteSpace(request.NomeCompleto))
                {
                    query += "   and u.NomeCompleto like @nomeCompleto";
                    parametros.Add("nomeCompleto", $"%{request.NomeCompleto}%");
                }

                if (!string.IsNullOrWhiteSpace(request.Email))
                {
                    query += "   and u.Login like @email";
                    parametros.Add("email", $"%{request.Email}%");
                }

                if (request.IdStatus != null)
                {
                    query += "   and s.Id = @idStatus";
                    parametros.Add("idStatus", request.IdStatus);
                }

                query += " order by u.NomeCompleto";

                var usuario = connection.Query<UsuarioDTO>(query, parametros);

                var retorno = new ResultDTO<List<UsuarioDTO>>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = usuario.ToList();

                return retorno;
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<List<UsuarioDTO>>(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<UsuarioDTO>>(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public ResultDTO<UsuarioDTO> BuscarPorId(int id)
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = $@"select u.*
                                     ,s.Nome StatusDescricao
                                 from Usuario u inner join Status s on u.IdStatus = s.Id
                                where u.Id = @id";

                var usuario = connection.Query<UsuarioDTO>(query, new { id = id });

                var retorno = new ResultDTO<UsuarioDTO>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = usuario.FirstOrDefault();

                return retorno;
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<UsuarioDTO>(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<UsuarioDTO>(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        #endregion Consulta

        public ResultDTO InserirUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades)
        {
            var connection = FactoryDB.SQLConnLocal();
            MySqlTransaction tran = null;

            try
            {
                tran = connection.BeginTransaction();

                var query = @"insert into Usuario (NomeCompleto, CPF, Login, Senha, IdStatus, IdUsuarioAlteracao, Host, DataCriacao)
                                           values (@NomeCompleto, @CPF, @Login, @Senha, @IdStatus, @IdUsuarioAlteracao, @Host, @DataCriacao)";

                var parametros = new
                {
                    NomeCompleto = usuario.NomeCompleto,
                    CPF = usuario.CPF.Replace(".", "").Replace(".", "").Replace("-", ""),
                    Login = usuario.Login,
                    Senha = usuario.Senha,
                    IdStatus = usuario.IdStatus,
                    IdUsuarioAlteracao = usuario.IdUsuarioAlteracao,
                    Host = usuario.Host,
                    DataCriacao = DateTime.Now
                };

                //Insere o Usuário
                connection.Execute(query, parametros);

                var LastIdQuery = $@"SELECT LAST_INSERT_ID();";
                var IdUsuario = connection.Query<int>(LastIdQuery).FirstOrDefault();

                //Insere as Funcionalidades
                if (listaIdFuncionalidades.Count() > 0)
                {
                    var insertUsuarioFuncionalidades = _usuarioFuncionalidadeRepository.GerarScriptInsert(IdUsuario, listaIdFuncionalidades);
                    connection.Execute(insertUsuarioFuncionalidades);
                }

                tran.Commit();

                return new ResultDTO<List<UsuarioDTO>>(true, "");
            }
            catch (MySqlException ex)
            {
                if (tran != null)
                    tran.Rollback();

                return new ResultDTO(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                if (tran != null)
                    tran.Rollback();

                return new ResultDTO(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public ResultDTO EditarUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades)
        {
            var connection = FactoryDB.SQLConnLocal();
            MySqlTransaction tran = null;

            try
            {
                tran = connection.BeginTransaction();

                var query = @"UPDATE Usuario
                              SET 
                                NomeCompleto = @NomeCompleto,
                                CPF = @CPF,
                                Login = @Login,
                                IdStatus = @IdStatus,
                                IdUsuarioAlteracao = @IdUsuarioAlteracao,
                                Host = @Host
                              WHERE 
                                Id = @Id";

                var parametros = new
                {
                    NomeCompleto = usuario.NomeCompleto,
                    CPF = usuario.CPF.Replace(".", "").Replace(".", "").Replace("-", ""),
                    Login = usuario.Login,
                    IdStatus = usuario.IdStatus,
                    IdUsuarioAlteracao = usuario.IdUsuarioAlteracao,
                    Host = usuario.Host,
                    Id = usuario.Id
                };

                //Insere o Usuário
                connection.Execute(query, parametros);

                //Deleta as Funcionalidades
                var deleteUsuarioFuncionalidades = _usuarioFuncionalidadeRepository.GerarScriptDeletePorIdUsuario(usuario.Id);
                connection.Execute(deleteUsuarioFuncionalidades);

                //Insere as Funcionalidades
                if (listaIdFuncionalidades.Count() > 0)
                {
                    var insertUsuarioFuncionalidades = _usuarioFuncionalidadeRepository.GerarScriptInsert(usuario.Id, listaIdFuncionalidades);
                    connection.Execute(insertUsuarioFuncionalidades);
                }

                tran.Commit();

                return new ResultDTO<List<UsuarioDTO>>(true, "");
            }
            catch (MySqlException ex)
            {
                if (tran != null)
                    tran.Rollback();
                return new ResultDTO(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                if (tran != null)
                    tran.Rollback();
                return new ResultDTO(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public ResultDTO InativarUsuario(int idUsuario)
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = @"update Usuario
                                 set IdStatus = @IdStatus
                               where Id = @Id"
                ;

                connection.Execute(query, new { Id = idUsuario, IdStatus = (int)EnumStatus.Inativo });

                return new ResultDTO<List<UsuarioDTO>>(true, "");
            }
            catch (MySqlException ex)
            {
                return new ResultDTO(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO(false, ex.InnerException == null ? ex.Message : ex.InnerException.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }
    }
}