function modalCertidao() {
    var IdProtocolo = $('#IdProtocolo').val();
    var valorRecebido = $('#TotalRecebidoGD').val();
    var valorGasto = $('#TotalGastoGD').val();
    var valorSaldo = $('#TotalSaldoGD').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDados/CarregaModalCertidao?IdProtocolo=${IdProtocolo}&valorRecebido=${valorRecebido}&valorGasto=${valorGasto}&valorSaldo=${valorSaldo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#modalCertidoesBody').html(data);
        $('#modalCertidoes').modal('show');

        for (var i = 0; i < $('[id*="TipoCertidaoValor_"]').length; i++) {
            var element = $('[id*="TipoCertidaoValor_"]')[i];
            mascaraMoeda(element);
        }

        carregarToolTips();
        $('.preloader').fadeOut();

    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}
function salvarCertidoes() {
    var IdProtocolo = $('#IdProtocolo').val();
    var ObservacaoCertidao = $('#ObservacaoCertidao').val();
    var ListaTipoCertidao = [];
    for (var i = 0; i < $('[id*=TipoCertidaoValor_]').length; i++) {
        const element = $('[id*=TipoCertidaoValor_]')[i];
        if ($(element).val() != '')
            ListaTipoCertidao.push({ IdProtocolo: $('#IdProtocolo').val(), IdTipoCertidao: parseInt(element.id.split('_')[1]), ValorCertidaoSlide: formataDecimalJs($(element).val()) });
    }

    var model = {
        IdProtocolo: IdProtocolo,
        Observacao: ObservacaoCertidao,
        ListaDados: ListaTipoCertidao
    }

    $.ajax({
        type: 'POST',
        url: `/GerenciamentoDados/SalvarCertidao`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Valores de Certidão foram salvo com sucesso!');
            cancelarModalCertidao();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}
function cancelarModalCertidao() {
    setTimeout(() => {
        $('#modalCertidoes').modal('hide');
        carregaAbaGerenciamentoDados();
    }, 500);
}