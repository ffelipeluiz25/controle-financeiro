$(document).ready(function () {
    carregar();
});

function carregar() {
    alteraStatus();
    carregarToolTips();
    iniciar();
}

function iniciar() {
    $('#btnSalvar').click(function () {
        salvar();
    });
}

function salvar() {
    $.ajax({
        type: 'POST',
        url: `/TipoAcompanhamentoRegistro/SalvarTipoAcompanhamentoRegistro`,
        dataType: 'json',
        data: $('#frmTipoAcompanhamentoRegistro').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Tipo Acompanhamento Registro salvo com sucesso!');
            $('#modalTipoAcompanhamentoRegistro').modal('hide');
            pesquisarListagemTipoAcompanhamentoRegistro();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function alteraStatus() {
    $('#StatusSituacaoFormatado').val($('#Situacao')[0].checked);
}