$(document).ready(function () {
    iniciar();
    pesquisarListagemTiposServicoRegistro();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemTiposServicoRegistro();
    });

    $('#btnNovoTipoServicoRegistro').click(function () {
        novoTipoServicoRegistro();
    });
}

function pesquisarListagemTiposServicoRegistro() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/TipoServicoRegistro/ListaTipoServicoRegistroPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novoTipoServicoRegistro() {
    $.ajax({
        type: 'GET',
        url: '/TipoServicoRegistro/NovoTipoServicoRegistroPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoServicoRegistro').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Serviço Registro.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/TipoServicoRegistro/EditarTipoServicoRegistroPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalTipoServicoRegistro').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Tipo Serviço Registro.');
        $('.preloader').fadeOut();
    });
}