using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using ControleFinanceiro.Services.Interfaces;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ControleFinanceiro.Services
{
    public class StatusService : IStatusService
    {
        private readonly IStatusRepository _statusRepository;

        public StatusService(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public List<StatusDTO> ListarStatusTodos()
        {
            var retorno = _statusRepository.ListarStatusTodos();
            return retorno.Dados;
        }

        public List<StatusDTO> ListarStatusAtivoInativo()
        {
            var retorno = _statusRepository.ListarStatusAtivoInativo();
            return retorno.Dados;
        }

        public List<StatusDTO> ListarStatusPagoEmAberto()
        {
            var retorno = _statusRepository.ListarStatusPagoEmAberto();
            return retorno.Dados;
        }

        #region Combo

        public List<SelectListItem> ComboStatusAtivoInativo()
        {
            var retorno = new List<SelectListItem>();
            var dados = ListarStatusAtivoInativo();

            retorno.Add(new SelectListItem
            {
                Value = "",
                Text = "Selecione..."
            });

            foreach (var item in dados)
            {
                retorno.Add(new SelectListItem { 
                    Value = item.Id.ToString(),
                    Text = item.Nome
                });
            }

            return retorno;
        }

        public List<SelectListItem> ComboStatusPagoEmAberto()
        {
            var retorno = new List<SelectListItem>();
            var dados = ListarStatusPagoEmAberto();

            retorno.Add(new SelectListItem
            {
                Value = "",
                Text = "Selecione..."
            });

            foreach (var item in dados)
            {
                retorno.Add(new SelectListItem
                {
                    Value = item.Id.ToString(),
                    Text = item.Nome
                });
            }

            return retorno;
        }

        #endregion Combo
    }
}