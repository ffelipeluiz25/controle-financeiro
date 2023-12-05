$(document).ready(function () {
    carregarListagem();
    pesquisarListagemGastoGeral();
});

function carregarListagem() {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#DataInicio').val(today);

    $('#btnBuscar').click(function () {
        pesquisarListagemGastoGeral();
    });

    $('#btnNovoGastoGeral').click(function () {
        novoGastoGeral();
    });
}

function novoGastoGeral() {
    $.ajax({
        type: 'GET',
        url: '/GastoGeral/NovoGastoGeralPartial',
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalGastoGeral').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup de Gasto Geral.');
        $('.preloader').fadeOut();
    });
}

function editarGastoGeral(id) {
    $.ajax({
        type: 'GET',
        url: `/GastoGeral/EditarGastoGeralPartial?Id=${id}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-content').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalGastoGeral').modal('show');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup de Gasto Geral.');
        $('.preloader').fadeOut();
    });
}

function pesquisarListagemGastoGeral() {
    var descricao = $('#Descricao').val();
    var dataInicio = $('#DataInicio').val();
    var dataFinal = $('#DataFinal').val();
    var url = `/GastoGeral/ListaGastoGeralPartial?Descricao=${descricao}&DataInicio=${dataInicio}&DataFinal=${dataFinal}`;

    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        $('#divGastosGerais').html(data);
        paginacaoTables();
        carregarToolTips();

    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}