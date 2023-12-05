function acionarBotaoSlideHistoricoCertidao() {
    $('#btnSlideHistoricoCertidao').click();
    slideHistoricoCertidao();
}

function acionarBotaoSlideHistoricoRegistro() {
    $('#btnSlideHistoricoRegistro').click();
    slideHistoricoRegistro();
}

function acionarBotaoSlideHistoricoOutros() {
    $('#btnSlideHistoricoOutros').click();
    slideHistoricoOutros();
}

function slideHistoricoCertidao() {
    var IdProtocolo = $('#IdProtocolo').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDadosHistorico/CarregaSlideHistoricoCertidao?IdProtocolo=${IdProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#sidebarHistorico').html(data);
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function slideHistoricoRegistro() {
    var IdProtocolo = $('#IdProtocolo').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDadosHistorico/CarregaSlideHistoricoRegistro?IdProtocolo=${IdProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#sidebarHistorico').html(data);
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function slideHistoricoOutros() {
    var IdProtocolo = $('#IdProtocolo').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDadosHistorico/CarregaSlideHistoricoOutros?IdProtocolo=${IdProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#sidebarHistorico').html(data);
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}