$(document).ready(function () {
    iniciar();
    pesquisarListagemTiposRecibo();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemTiposRecibo();
    });

    $('#btnNovoTipoRecibo').click(function () {
        novoTipoRecibo();
    });
}

function pesquisarListagemTiposRecibo() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/TipoRecibo/ListaTipoReciboPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novoTipoRecibo() {
    $.ajax({
        type: 'GET',
        url: '/TipoRecibo/NovoTipoReciboPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoRecibo').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Recibo.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/TipoRecibo/EditarTipoReciboPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoRecibo').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Recibo.');
        $('.preloader').fadeOut();
    });
}