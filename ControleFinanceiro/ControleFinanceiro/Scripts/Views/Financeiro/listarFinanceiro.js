$(document).ready(function () {
    carregarFinanceiroListagem();
    pesquisarFinanceiroListagem();
});

function carregarFinanceiroListagem() {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#DataInicioRecibo').val(today);

    $('#btnBuscar').click(function () {
        pesquisarFinanceiroListagem();
    });
}

function pesquisarFinanceiroListagem() {
    var numeroRecibo = $('#NumeroRecibo').val();
    var numeroProtocolo = $('#NumeroProtocolo').val();
    var dataInicioRecibo = $('#DataInicioRecibo').val();
    var dataFimRecibo = $('#DataFimRecibo').val();
    var valorMinimo = $('#ValorMinimoString').val();
    var valorMaximo = $('#ValorMaximoString').val();
    var idTipoRecibo = $('#IdTipoRecibo').val();
    var idTipoServico = $('#IdTipoServico').val();
    var url = `/Financeiro/ListaFinanceiroPartial?NumeroRecibo=${numeroRecibo}&NumeroProtocolo=${numeroProtocolo}&DataInicioRecibo=${dataInicioRecibo}&DataFimRecibo=${dataFimRecibo}&ValorMinimoString=${valorMinimo}&ValorMaximoString=${valorMaximo}&IdTipoRecibo=${idTipoRecibo}&IdTipoServico=${idTipoServico}`;

    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        $('#divFinanceiro').html(data);
        paginacaoTables();
        carregarToolTips();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function abrirFechamentoCaixaModal(IdRecibo, IdProtocolo) {
    carregaFechamentoCaixaModal(IdRecibo, IdProtocolo);
}

function abrirFechamentoCaixaModalVisualizacao(IdRecibo, IdProtocolo) {
    carregaFechamentoCaixaModal(IdRecibo, IdProtocolo);
}

function carregaFechamentoCaixaModal(IdRecibo, IdProtocolo) {

    $.ajax({
        type: 'GET',
        url: `/Financeiro/ReciboFechamentoCaixaPartial?IdRecibo=${IdRecibo}&IdProtocolo=${IdProtocolo}&AbaRecibo=${false}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('#divModalContent').empty();
        $('#divModalContent').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalReciboFechamentoCaixa').modal('show');
            if ($("#inputIdFormaPagamento").val() != '0')
                $("#IdFormaPagamento_" + $("#inputIdFormaPagamento").val())[0].checked = true;
        });

        carregarToolTips();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup de Entrada.');
        $('.preloader').fadeOut();
    });

}