using Certificare.Data.DTOs;
using Certificare.Data.DTOs.Request;
using Certificare.Data.Factory;
using Certificare.Repositorios.Interfaces;
using ControleFinanceiro.Data.Enumeradores;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Linq;
using System.Threading.Tasks;
namespace Certificare.Data.Repositorios
{
    public class LoginRepository : ILoginRepository
    {
        public LoginRepository() { }
        public async Task<ResultDTO<UsuarioDTO>> Logar(LoginRequestDTO loginRequest)
        {
            var connection = FactoryDB.SQLConnLocal();
            try
            {
                var query = @"SELECT 
		                            Id,
                                    NomeCompleto,
                                    IdStatus
		                      FROM
		                            Usuario U
		                      WHERE
		                            U.Login = @login 
		                            AND U.Senha = @senha";

                var usuario = await connection.QueryAsync<UsuarioDTO>(query, new { login = loginRequest.Login, senha = loginRequest.Senha });
                var usuarioAtivo = usuario.Where(u => u.IdStatus.Equals((int)EnumStatus.Ativo)).ToList();
                if (usuario.Count() != usuarioAtivo.Count())
                    return new ResultDTO<UsuarioDTO>(true, "Usuario Inativo. Falar com seu administrador!");

                if (usuarioAtivo.Count() == 0)
                    return new ResultDTO<UsuarioDTO>(true, "Usuário não identificado");

                return new ResultDTO<UsuarioDTO>(usuarioAtivo.FirstOrDefault());
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<UsuarioDTO>(false, ex.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<UsuarioDTO>(false, ex.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }
    }
}