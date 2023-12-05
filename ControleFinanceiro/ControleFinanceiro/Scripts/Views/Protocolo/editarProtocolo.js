$(document).ready(function () {
    carregar();
});

function carregar() {
    var IdProtocolo = $('#IdProtocolo').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/Protocolo/EditarProtocoloPartial?IdProtocolo=${IdProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#divEditarProtocolo').html(data);
        $('.preloader').fadeOut();

        alteraStatus();

        carregarAbaRecibosPartial();
        iniciar();
        carregarToolTips();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function iniciar() {
    $('#btnEstorno').click(function () {
        abrirModalEstorno();
    });

    $('#btnSalvarEstorno').click(function () {
        salvarEstorno();
    });
}

function salvar() {
    $.ajax({
        type: 'POST',
        url: `/Protocolo/SalvarProtocolo`,
        dataType: 'json',
        data: $('#frmProtocolo').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso)
            mensagemSucesso('Protocolo alterado com sucesso!');
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

function carregaAbaGerenciamentoDados() {
    var IdProtocolo = $('#IdProtocolo').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDados/CarregaAbaGerenciamentoDados?IdProtocolo=${IdProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#divTableGerenciamentoDados').empty();
        $('#divTableGerenciamentoDados').html(data);
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}