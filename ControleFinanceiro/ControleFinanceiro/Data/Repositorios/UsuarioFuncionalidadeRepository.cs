using Certificare.Data.DTOs;
using Certificare.Data.Factory;
using Certificare.Data.Repositorios.Interfaces;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Certificare.Data.Repositorios
{
    public class UsuarioFuncionalidadeRepository : IUsuarioFuncionalidadeRepository
    {
        public UsuarioFuncionalidadeRepository() { }

        public ResultDTO<List<UsuarioFuncionalidadeDTO>> ListarUsuarioFuncionalidadePorIdUsuario(int idUsuario)
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = $@"select *
                                 from UsuarioFuncionalidade
                                where IdUsuario = @IdUsuario";

                var status = connection.Query<UsuarioFuncionalidadeDTO>(query, new { IdUsuario = idUsuario });

                var retorno = new ResultDTO<List<UsuarioFuncionalidadeDTO>>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = status.ToList();

                return retorno;
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<List<UsuarioFuncionalidadeDTO>>(false, ex.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<UsuarioFuncionalidadeDTO>>(false, ex.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public string GerarScriptDeletePorIdUsuario(int idUsuario)
        {
            return string.Format("delete from UsuarioFuncionalidade where IdUsuario = {0}", idUsuario);
        }

        public string GerarScriptInsert(int idUsuario, List<string> listaIdFuncionalidades)
        {
            StringBuilder sqlInsert = new StringBuilder();

            foreach (var item in listaIdFuncionalidades)
            {
                if (sqlInsert.Length == 0)
                    sqlInsert.Append("INSERT INTO UsuarioFuncionalidade (IdUsuario, IdFuncionalidade) VALUES");

                sqlInsert.Append(string.Format("({0}, {1}),", idUsuario, item));
            }

            var retorno = sqlInsert.ToString();

            if (retorno.EndsWith(","))
                retorno = retorno.Remove(retorno.Length - 1, 1);

            return retorno;
        }
    }
}