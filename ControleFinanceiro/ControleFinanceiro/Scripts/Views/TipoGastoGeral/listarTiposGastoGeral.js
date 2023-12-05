$(document).ready(function () {
    iniciar();
    pesquisarListagemTiposGastoGeral();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemTiposGastoGeral();
    });

    $('#btnNovoTipoGastoGeral').click(function () {
        novoTipoGastoGeral();
    });
}

function pesquisarListagemTiposGastoGeral() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/TipoGastoGeral/ListaTipoGastoGeralPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novoTipoGastoGeral() {
    $.ajax({
        type: 'GET',
        url: '/TipoGastoGeral/NovoTipoGastoGeralPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoGastoGeral').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Gasto Geral.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/TipoGastoGeral/EditarTipoGastoGeralPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoGastoGeral').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Gasto Geral.');
        $('.preloader').fadeOut();
    });
}