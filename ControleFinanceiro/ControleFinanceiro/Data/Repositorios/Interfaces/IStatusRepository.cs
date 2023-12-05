using ControleFinanceiro.Data.DTOs;
using System.Collections.Generic;
namespace ControleFinanceiro.Data.Repositorios.Interfaces
{
    public interface IStatusRepository
    {
        ResultDTO<List<StatusDTO>> ListarStatusTodos();
        ResultDTO<List<StatusDTO>> ListarStatusAtivoInativo();
        ResultDTO<List<StatusDTO>> ListarStatusPagoEmAberto();
    }
}