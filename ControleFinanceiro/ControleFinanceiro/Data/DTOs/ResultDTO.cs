namespace Certificare.Data.DTOs
{
    public class ResultDTO
    {
        public int Status { get; set; }
        public bool Sucesso { get; set; }
        public string Mensagem { get; set; }
        public string IdMensagem { get; set; }
        public dynamic Dados { get; set; }

        public ResultDTO()
        {
        }

        public ResultDTO(bool sucesso)
        {
            Sucesso = sucesso;
        }

        public ResultDTO(bool sucesso, string mensagem, string idMensagem = "")
        {
            Sucesso = sucesso;
            Mensagem = mensagem;
            IdMensagem = idMensagem;
        }

        public ResultDTO(string mensagem, string idMensagem = "")
        {
            Sucesso = false;
            Mensagem = mensagem;
            IdMensagem = idMensagem;
        }

        public ResultDTO(dynamic dados)
        {
            Sucesso = true;
            Dados = dados;
        }
    }

    public class ResultDTO<T> : ResultDTO
    {
        public T Dados { get; set; }

        public ResultDTO(bool sucesso, string mensagem) : base(sucesso, mensagem)
        {
        }
        public ResultDTO(T dados) : base(dados)
        {
            Dados = dados;
            Sucesso = true;
        }
    }
}