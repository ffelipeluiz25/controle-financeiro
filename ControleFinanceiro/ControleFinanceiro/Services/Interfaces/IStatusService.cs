using ControleFinanceiro.Data.DTOs;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ControleFinanceiro.Services.Interfaces
{
    public interface IStatusService
    {
        List<StatusDTO> ListarStatusTodos();
        List<StatusDTO> ListarStatusAtivoInativo();

        #region Combo

        List<SelectListItem> ComboStatusAtivoInativo();
        List<SelectListItem> ComboStatusPagoEmAberto();

        #endregion Combo
    }
}