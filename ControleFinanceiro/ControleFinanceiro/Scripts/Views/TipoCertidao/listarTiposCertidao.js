$(document).ready(function () {
    iniciar();
    pesquisarListagemTiposCertidao();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemTiposCertidao();
    });

    $('#btnNovoTipoCertidao').click(function () {
        novoTipoCertidao();
    });
}

function pesquisarListagemTiposCertidao() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/TipoCertidao/ListaTipoCertidaoPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('#cardBody').html(data);
        paginacaoTables([[1, 'asc']]);
        carregarToolTips();

        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function novoTipoCertidao() {
    $.ajax({
        type: 'GET',
        url: '/TipoCertidao/NovoTipoCertidaoPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoCertidao').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo de Certidão.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/TipoCertidao/EditarTipoCertidaoPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoCertidao').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo de Certidão.');
        $('.preloader').fadeOut();
    });
}