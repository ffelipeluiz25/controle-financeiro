function modalOutros() {
    var IdProtocolo = $('#IdProtocolo').val();
    var numeroProtocolo = $('#NumeroProtocolo').val();
    var valorRecebido = $('#TotalRecebidoGD').val();
    var valorGasto = $('#TotalGastoGD').val();
    var valorSaldo = $('#TotalSaldoGD').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDados/CarregaModalOutros?IdProtocolo=${IdProtocolo}&numeroProtocolo=${numeroProtocolo}&valorRecebido=${valorRecebido}&valorGasto=${valorGasto}&valorSaldo=${valorSaldo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#modalOutrosBody').html(data);
        $('#modalOutros').modal('show');

        for (var i = 0; i < $('[id*="TipoOutroValor_"]').length; i++) {
            var element = $('[id*="TipoOutroValor_"]')[i];
            mascaraMoeda(element);
        }

        setTimeout(function () {
            $('#IdTipoOutro').val($('#inputIdTipoOutro').val());
        }, 200);

        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}
function salvarOutros() {
    var IdProtocolo = $('#IdProtocolo').val();
    var ObservacaoOutros = $('#ObservacaoOutros').val();
    var ListaTipoOutro = [];
    for (var i = 0; i < $('[id*=TipoOutroValor_]').length; i++) {
        const element = $('[id*=TipoOutroValor_]')[i];
        if ($(element).val() != '')
            ListaTipoOutro.push({ IdTipoOutro: parseInt(element.id.split('_')[1]), ValorOutroSlide: formataDecimalJs($(element).val()) });
    }

    var model = {
        IdProtocolo: IdProtocolo,
        Observacao: ObservacaoOutros,
        NumeroProtocolo: $('#NumeroProtocolo').val(),
        ListaDados: ListaTipoOutro
    }

    $.ajax({
        type: 'POST',
        url: `/GerenciamentoDados/SalvarOutros`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Outro gasto foi salvo com sucesso!');
            cancelarModalOutros();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}
function cancelarModalOutros() {
    setTimeout(() => {
        $('#modalOutros').modal('hide');
        carregaAbaGerenciamentoDados();
    }, 500);
}