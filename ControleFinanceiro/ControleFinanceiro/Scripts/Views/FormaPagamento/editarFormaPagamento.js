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
        url: `/FormaPagamento/SalvarFormaPagamento`,
        dataType: 'json',
        data: $('#frmFormaPagamento').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Forma de Pagamento salva com sucesso!');
            $('#modalFormaPagamento').modal('hide');
            pesquisarListagemFormaPagamentos();
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