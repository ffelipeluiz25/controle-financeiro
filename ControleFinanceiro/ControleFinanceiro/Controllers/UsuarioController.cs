using ControleFinanceiro.Custom.Attribute;
using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Helpers;
using ControleFinanceiro.Services.Interfaces;
using ControleFinanceiro.Data.Enumeradores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
namespace ControleFinanceiro.Controllers
{
    public class UsuarioController : MasterController
    {
        private readonly IFuncionalidadeService _funcionalidadeService;
        private readonly IUsuarioService _usuarioService;
        private readonly IStatusService _statusService;

        public UsuarioController(IUsuarioService usuarioService,
                                 IStatusService statusService,
                                 IFuncionalidadeService funcionalidadeService) : base(funcionalidadeService)
        {
            _usuarioService = usuarioService;
            _statusService = statusService;
            _funcionalidadeService = funcionalidadeService;
        }

        [CustomAuthorize]
        public ActionResult Index()
        {
            ViewBag.Status = _statusService.ComboStatusAtivoInativo();
            return View();
        }

        [CustomAuthorize]
        [HttpGet()]
        [Route("ListaUsuarioPartial")]
        public ActionResult ListaUsuarioPartial(UsuarioRequestDTO request)
        {
            var model = new UsuarioListagemDTO();
            model.ListaUsuario = _usuarioService.ListarUsuariosFiltro(request);
            model.ListaFuncionalidade = _listaFuncionalidadesUsuario;
            return PartialView("~/Views/Usuario/_ListaUsuarioPartial.cshtml", model);
        }

        [CustomAuthorize]
        [Route("NovoUsuario")]
        public ActionResult NovoUsuario()
        {
            return View(new UsuarioDTO { Id = 0 });
        }

        [Route("NovoUsuarioPartial")]
        public ActionResult NovoUsuarioPartial()
        {
            ViewBag.Funcionalidade = _funcionalidadeService.ListarFuncionalidadeTodos();

            return PartialView("~/Views/Usuario/_UsuarioPartial.cshtml", new UsuarioDTO { Id = 0, DataCriacao = DateTime.Now });
        }

        [CustomAuthorize]
        [Route("EditarUsuario/{IdUsuario}")]
        public ActionResult EditarUsuario(int? IdUsuario)
        {
            if (IdUsuario.HasValue && _listaFuncionalidadesUsuario.Any(f => f.IdFuncionalidade.Equals((int)EnumPermissoes.PermiteAlterarUsuarios)))
                return View(new UsuarioDTO { Id = IdUsuario.Value });

            return RedirectToAction("Index");
        }

        [Route("EditarUsuarioPartial")]
        public ActionResult EditarUsuarioPartial(int IdUsuario)
        {
            ViewBag.Funcionalidade = _usuarioService.ListarFuncionalidadeVersusUsuario(IdUsuario).Dados;
            var usuario = _usuarioService.BuscarPorId(IdUsuario);
            if (usuario.Sucesso && usuario.Dados != null)
                return PartialView("~/Views/Usuario/_UsuarioPartial.cshtml", usuario.Dados);

            return RedirectToAction("Index");
        }

        [CustomAuthorize]
        public ActionResult SalvarUsuario(UsuarioDTO usuario, string listaIdFuncionalidades)
        {
            if (ModelState.IsValid)
            {
                usuario.IdUsuarioAlteracao = _usuarioUsuarioId;
                usuario.IdStatus = usuario.StatusSituacaoFormatado.Equals(true) ? (int)EnumStatus.Ativo : (int)EnumStatus.Inativo;
                if (usuario.Id == 0)
                    usuario.Senha = Utils.GerarHashMd5(usuario.Senha);
                //Funcionalidades
                List<string> funcionalidades = new JavaScriptSerializer().Deserialize<List<string>>(listaIdFuncionalidades);

                var retorno = _usuarioService.SalvarUsuario(usuario, funcionalidades);
                if (_usuarioUsuarioId == usuario.Id && retorno.Sucesso && usuario.RedirectLogin)
                    return Json(new { retorno, redirectUrl = "/Login/Sair" });

                return Json(new { retorno, redirectUrl = "/Usuario" });
            }
            else
            {
                var retorno = new ResultDTO { Sucesso = false, Mensagem = AddErrors() };
                return Json(new { retorno, redirectUrl = "/Usuario" });
            }
        }

        [CustomAuthorize]
        [Route("InativarUsuario/{idUsuario}")]
        public ActionResult InativarUsuario(int idUsuario)
        {
            var retorno = _usuarioService.InativarUsuario(idUsuario);
            return Json(retorno);
        }

        [CustomAuthorize]
        public ActionResult Perfil()
        {
            return View("Perfil", _usuarioService.BuscarPorId(_usuarioUsuarioId).Dados);
        }
    }
}