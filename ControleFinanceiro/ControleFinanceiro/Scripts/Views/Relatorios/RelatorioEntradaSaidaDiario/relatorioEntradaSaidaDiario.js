$(document).ready(function () {
    carregar();

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#DataInicio').val(today);
    $('#DataFinal').val(today);
});

function carregar() {
    $('#btnBuscar').click(function () {
        pesquisar();
    });
}

function pesquisar() {
    var dataInicio = $('#DataInicio').val();
    var dataFinal = $('#DataFinal').val();

    if ($('#DataInicio').val() == '' ) {
        mensagemInformacao('Campo Data Início é obrigatório!');
        $('#cardBody').empty();
        return;
    }

    if ($('#DataFinal').val() == '') {
        mensagemInformacao('Campo Data Final é obrigatório!');
        $('#cardBody').empty();
        return;
    }

    var from = $("#DataInicio").val().split("-")
    var _dataInicio = new Date(from[0], from[1] - 1, from[2])

    from = $("#DataFinal").val().split("-")
    var _dataFinal = new Date(from[0], from[1] - 1, from[2])

    debugger;
    if (_dataInicio > _dataFinal)
    {
        mensagemInformacao('Campo Data Início não pode ser maior que a Data Final!');
        $('#cardBody').empty();
        return;
    }

    $.ajax({
        type: 'GET',
        url: `/RelatorioEntradaSaidaDiario/ListaRelatorioEntradaSaidaDiarioPartial?DataInicio=${dataInicio}&DataFinal=${dataFinal}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('#cardBody').html(data);
        paginacaoTables();
        carregarToolTips();

        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function imprimir() {
    var dataInicio = $('#DataInicio').val();
    var dataFinal = $('#DataFinal').val();
    $.ajax({
        type: 'GET',
        url: `/RelatorioEntradaSaidaDiario/ImprimirRelatorio?DataInicio=${dataInicio}&DataFinal=${dataFinal}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (_pageHtml) {
        debugger;
        var newWindow = window.open(null, '_blank');
        var document = newWindow.document.open();
        var pageContent = _pageHtml;
        document.write(pageContent);
        document.close();

        setTimeout(function () {
            newWindow.print();
        }, 500);

        $('.preloader').fadeOut();

    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}