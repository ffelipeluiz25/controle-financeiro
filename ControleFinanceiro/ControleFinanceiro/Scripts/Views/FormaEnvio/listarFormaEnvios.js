$(document).ready(function () {
    iniciar();
    pesquisarListagemFormaEnvios();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemFormaEnvios();
    });

    $('#btnNovaFormaEnvio').click(function () {
        novaFormaEnvio();
    });
}

function pesquisarListagemFormaEnvios() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/FormaEnvio/ListaFormaEnvioPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novaFormaEnvio() {
    $.ajax({
        type: 'GET',
        url: '/FormaEnvio/NovaFormaEnvioPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalFormaEnvio').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup da Forma de Envio.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/FormaEnvio/EditarFormaEnvioPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalFormaEnvio').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup da Forma de Envio.');
        $('.preloader').fadeOut();
    });
}