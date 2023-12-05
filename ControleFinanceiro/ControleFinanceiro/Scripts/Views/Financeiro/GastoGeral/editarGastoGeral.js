$(document).ready(function () {
    carregar();
});

function carregar() {
    alteraStatus();
    carregarToolTips();
    iniciar();
    mascaraMoeda($('#ValorString')[0]);
    $('#IdTipoGastoGeral').val($('#inputIdTipoGastoGeral').val());
}

function iniciar() {
    $('#btnSalvar').click(function () {
        debugger;
        salvar();
    });
}

function salvar() {
    debugger;
    $.ajax({
        type: 'POST',
        url: `/GastoGeral/SalvarGastoGeral`,
        dataType: 'json',
        data: $('#frmGastoGeral').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Gasto Geral salvo com sucesso!');
            $('#modalGastoGeral').modal('hide');
            pesquisarListagemGastoGeral();
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