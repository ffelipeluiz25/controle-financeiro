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
    public class StatusRepository : IStatusRepository
    {
        public StatusRepository() { }

        public ResultDTO<List<StatusDTO>> ListarStatusTodos()
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = $@"SELECT * FROM Status";

                var status = connection.Query<StatusDTO>(query);

                var retorno = new ResultDTO<List<StatusDTO>>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = status.ToList();

                return retorno;
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<List<StatusDTO>>(false, ex.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<StatusDTO>>(false, ex.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public ResultDTO<List<StatusDTO>> ListarStatusAtivoInativo()
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = $@"SELECT *
                               FROM Status
                               WHERE Id IN (@statusAtivo, @statusInativo)";

                var status = connection.Query<StatusDTO>(query, new { statusAtivo = (int)EnumStatus.Ativo, statusInativo = (int)EnumStatus.Inativo }).ToList();

                if (status != null && status.Count() > 0)
                    return new ResultDTO<List<StatusDTO>>(status);

                return new ResultDTO<List<StatusDTO>>(new List<StatusDTO>());
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<List<StatusDTO>>(false, ex.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<StatusDTO>>(false, ex.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }

        public ResultDTO<List<StatusDTO>> ListarStatusPagoEmAberto()
        {
            var connection = FactoryDB.SQLConnLocal();

            try
            {
                var query = $@"SELECT *
                               FROM Status
                               WHERE Id IN (@statusPago, @statusEmAberto)";

                var status = connection.Query<StatusDTO>(query, new { statusPago = (int)EnumStatus.Pago, statusEmAberto = (int)EnumStatus.EmAberto });

                var retorno = new ResultDTO<List<StatusDTO>>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = status.ToList();

                return retorno;
            }
            catch (MySqlException ex)
            {
                return new ResultDTO<List<StatusDTO>>(false, ex.Message);
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<StatusDTO>>(false, ex.Message);
            }
            finally
            {
                FactoryDB.MySqlClose(connection);
            }
        }
    }
}