using Certificare.Data.DTOs;
using Certificare.Data.Factory;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
namespace ControleFinanceiro.Data.Repositorios
{
    public class FuncionalidadeRepository : IFuncionalidadeRepository
    {
        public FuncionalidadeRepository() { }

        public ResultDTO<List<FuncionalidadeDTO>> ListarFuncionalidadeTodos()
        {
            var connection = FactoryDB.SQLConnLocal();
            try
            {
                var query = $@"SELECT * FROM Funcionalidade";
                var status = connection.Query<FuncionalidadeDTO>(query);
                var retorno = new ResultDTO<List<FuncionalidadeDTO>>(status.ToList());
                return retorno;
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<List<FuncionalidadeDTO>>(false, ex.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<FuncionalidadeDTO>>(false, ex.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public ResultDTO<List<UsuarioFuncionalidadeDTO>> ListarFuncionalidadePorIdUsuario(int IdUsuario)
        {
            var connection = FactoryDB.SQLConnLocal();
            try
            {
                var query = $@"SELECT UF.* FROM UsuarioFuncionalidade UF WHERE UF.IdUsuario = @IdUsuario";
                var status = connection.Query<UsuarioFuncionalidadeDTO>(query, new { IdUsuario });
                var retorno = new ResultDTO<List<UsuarioFuncionalidadeDTO>>(status.ToList());
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
    }
}