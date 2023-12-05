using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using ControleFinanceiro.Services.Interfaces;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ControleFinanceiro.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUsuarioFuncionalidadeRepository _usuarioFuncionalidadeRepository;
        private readonly IFuncionalidadeRepository _funcionalidadeRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository,
                              IUsuarioFuncionalidadeRepository usuarioFuncionalidadeRepository,
                              IFuncionalidadeRepository funcionalidadeRepository)
        {
            _usuarioRepository = usuarioRepository;
            _usuarioFuncionalidadeRepository = usuarioFuncionalidadeRepository;
            _funcionalidadeRepository = funcionalidadeRepository;
        }

        public ResultDTO<UsuarioDTO> BuscarPorId(int id)
        {
            try
            {
                var usuarioFuncionalidades = _usuarioFuncionalidadeRepository.ListarUsuarioFuncionalidadePorIdUsuario(id).Dados;
                var usuario = _usuarioRepository.BuscarPorId(id);
                var dados = usuario.Dados;

                dados.UsuarioFuncionalidades = usuarioFuncionalidades;

                var retorno = new ResultDTO<UsuarioDTO>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = dados;

                return retorno;
            }
            catch (Exception ex)
            {
                return new ResultDTO<UsuarioDTO>(false, ex.Message);
            }
        }

        public ResultDTO<List<FuncionalidadeDTO>> ListarFuncionalidadeVersusUsuario(int id)
        {
            try
            {
                var usuarioFuncionalidades = _usuarioFuncionalidadeRepository.ListarUsuarioFuncionalidadePorIdUsuario(id).Dados;
                var funcionalidades = _funcionalidadeRepository.ListarFuncionalidadeTodos().Dados;

                foreach (var item in funcionalidades)
                    item.Checado = usuarioFuncionalidades.Where(x => x.IdFuncionalidade == item.Id).Any();

                var retorno = new ResultDTO<List<FuncionalidadeDTO>>(true, "");
                retorno.Sucesso = true;
                retorno.Dados = funcionalidades;

                return retorno;
            }
            catch (Exception ex)
            {
                return new ResultDTO<List<FuncionalidadeDTO>>(false, ex.Message);
            }
        }

        public List<UsuarioDTO> ListarUsuariosFiltro(UsuarioRequestDTO request)
        {
            var usuario = _usuarioRepository.ListarUsuariosFiltro(request);
            return usuario.Dados;
        }

        private ResultDTO InserirUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades)
        {
            usuario.DataCriacao = DateTime.Now;
            var retorno = _usuarioRepository.InserirUsuario(usuario, listaIdFuncionalidades);
            return retorno;
        }

        private ResultDTO EditarUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades)
        {
            var retorno = _usuarioRepository.EditarUsuario(usuario, listaIdFuncionalidades);
            return retorno;
        }

        private List<ValidationResult> ValidarUsuario(UsuarioDTO usuario)
        {
            var validacoes = new List<ValidationResult>();

            #region Validações Campos em branco

            if (string.IsNullOrWhiteSpace(usuario.CPF))
                validacoes.Add(new ValidationResult($"O campo CPF está em branco!"));

            if (string.IsNullOrWhiteSpace(usuario.NomeCompleto))
                validacoes.Add(new ValidationResult($"O campo Nome Completo está em branco!"));

            if (string.IsNullOrWhiteSpace(usuario.Login))
                validacoes.Add(new ValidationResult($"O campo E-mail / Login está em branco!"));

            if (usuario.Id == 0 && string.IsNullOrWhiteSpace(usuario.Senha))
                validacoes.Add(new ValidationResult($"O campo Senha está em branco!"));

            if (validacoes.Count() > 0)
                return validacoes;

            #endregion Validações Campos em branco

            var usuariosCadastrados = new List<UsuarioDTO>();
            if (usuario.Id == 0)
            {
                var dados = _usuarioRepository.ListarUsuariosFiltro(new UsuarioRequestDTO { IdStatus = 1 }).Dados;
                usuariosCadastrados = dados;

                var mesmoCPF = usuariosCadastrados.Where(x => x.CPF == usuario.CPFFormatadoSemPonto);
                if (mesmoCPF.Count() > 0)
                    validacoes.Add(new ValidationResult($"Já possui um Usuário cadastrado com esse CPF!"));

                var mesmoNomeCompleto = usuariosCadastrados.Where(x => x.NomeCompleto == usuario.NomeCompleto);
                if (mesmoNomeCompleto.Count() > 0)
                    validacoes.Add(new ValidationResult($"Já possui um Usuário cadastrado com esse Nome Completo!"));

                var mesmoLogin = usuariosCadastrados.Where(x => x.Login == usuario.Login);
                if (mesmoLogin.Count() > 0)
                    validacoes.Add(new ValidationResult($"Já possui um Usuário cadastrado com esse E-mail / Login!"));
            }
            else
            {
                var dados = _usuarioRepository.ListarUsuariosFiltro(new UsuarioRequestDTO { IdStatus = 1 }).Dados;
                usuariosCadastrados = dados.Where(x => x.Id != usuario.Id).ToList();

                var mesmoCPF = usuariosCadastrados.Where(x => x.CPF == usuario.CPFFormatadoSemPonto && !x.Id.Equals(usuario.Id));
                if (mesmoCPF.Count() > 0)
                    validacoes.Add(new ValidationResult($"Já possui um Usuário cadastrado com esse CPF!"));

                var mesmoNomeCompleto = usuariosCadastrados.Where(x => x.NomeCompleto == usuario.NomeCompleto && !x.Id.Equals(usuario.Id));
                if (mesmoNomeCompleto.Count() > 0)
                    validacoes.Add(new ValidationResult($"Já possui um Usuário cadastrado com esse Nome Completo!"));

                var mesmoLogin = usuariosCadastrados.Where(x => x.Login == usuario.Login && !x.Id.Equals(usuario.Id));
                if (mesmoLogin.Count() > 0)
                    validacoes.Add(new ValidationResult($"Já possui um Usuário cadastrado com esse E-mail / Login!"));
            }
            return validacoes;
        }

        public ResultDTO SalvarUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades)
        {
            var validacoes = ValidarUsuario(usuario);

            if (validacoes.Count() > 0)
            {
                var msgValidacoes = string.Join(";", validacoes.Select(x => x.ErrorMessage));
                return new ResultDTO() { Sucesso = false, Mensagem = msgValidacoes };
            }

            if (usuario.Id == 0)
                return InserirUsuario(usuario, listaIdFuncionalidades);
            else
                return EditarUsuario(usuario, listaIdFuncionalidades);
        }

        public ResultDTO InativarUsuario(int idUsuario)
        {
            var retorno = _usuarioRepository.InativarUsuario(idUsuario);
            return retorno;
        }
    }
}