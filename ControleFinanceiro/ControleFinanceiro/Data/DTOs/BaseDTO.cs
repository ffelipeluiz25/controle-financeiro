using System;
namespace ControleFinanceiro.Data.DTOs
{
    public class BaseDTO
    {
        public int Id { get; set; }
        public int IdUsuarioAlteracao { get; set; }
        public int IdStatus { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public string DataCriacaoHoraFormatado
        {
            get
            {
                var currentInfo = new System.Globalization.CultureInfo("pt-BR", true);
                return DataCriacao.ToString(currentInfo);
            }
        }
        public DateTime? DataAlteracao { get; set; }
    }
}