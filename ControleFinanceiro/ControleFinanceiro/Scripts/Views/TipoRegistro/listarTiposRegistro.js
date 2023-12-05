$(document).ready(function () {
    iniciar();
    pesquisarListagemTiposRegistro();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemTiposRegistro();
    });

    $('#btnNovoTipoRegistro').click(function () {
        novoTipoRegistro();
    });
}

function pesquisarListagemTiposRegistro() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/TipoRegistro/ListaTipoRegistroPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novoTipoRegistro() {
    $.ajax({
        type: 'GET',
        url: '/TipoRegistro/NovoTipoRegistroPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoRegistro').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Registro.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/TipoRegistro/EditarTipoRegistroPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoRegistro').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Registro.');
        $('.preloader').fadeOut();
    });
}