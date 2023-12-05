$(document).ready(function () {
    iniciar();
    pesquisarListagemTipoAcompanhamentoRegistro();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemTipoAcompanhamentoRegistro();
    });

    $('#btnNovoTipoAcompanhamentoRegistro').click(function () {
        novoTipoAcompanhamentoRegistro();
    });
}

function pesquisarListagemTipoAcompanhamentoRegistro() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/TipoAcompanhamentoRegistro/ListaTipoAcompanhamentoRegistroPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novoTipoAcompanhamentoRegistro() {
    $.ajax({
        type: 'GET',
        url: '/TipoAcompanhamentoRegistro/NovaTipoAcompanhamentoRegistroPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoAcompanhamentoRegistro').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Acompanhamento Registro.');
        $('.preloader').fadeOut();
    });
}

function editarTipoAcompanhamentoRegistro(id) {
    $.ajax({
        type: 'GET',
        url: '/TipoAcompanhamentoRegistro/EditarTipoAcompanhamentoRegistroPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoAcompanhamentoRegistro').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Acompanhamento Registro.');
        $('.preloader').fadeOut();
    });
}