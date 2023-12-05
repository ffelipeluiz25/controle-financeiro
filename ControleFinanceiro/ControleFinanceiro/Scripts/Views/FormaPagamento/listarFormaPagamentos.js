$(document).ready(function () {
    iniciar();
    pesquisarListagemFormaPagamentos();
});

function iniciar() {
    $('#btnBuscar').click(function () {
        pesquisarListagemFormaPagamentos();
    });

    $('#btnNovaFormaPagamento').click(function () {
        novaFormaPagamento();
    });
}

function pesquisarListagemFormaPagamentos() {
    var descricao = $('#descricao').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/FormaPagamento/ListaFormaPagamentoPartial?Descricao=${descricao}&IdStatus=${idStatus}`,
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

function novaFormaPagamento() {
    $.ajax({
        type: 'GET',
        url: '/FormaPagamento/NovaFormaPagamentoPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalFormaPagamento').modal('show');
            $('#Ordenacao').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup da Forma de Pagamento.');
        $('.preloader').fadeOut();
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',
        url: '/FormaPagamento/EditarFormaPagamentoPartial?Id=' + id,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalFormaPagamento').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup da Forma de Pagamento.');
        $('.preloader').fadeOut();
    });
}