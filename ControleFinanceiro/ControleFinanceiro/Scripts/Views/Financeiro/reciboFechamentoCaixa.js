function salvarFechamentoCaixa(IdRecibo) {
    if ($("input:radio[name='IdFormaPagamento']:checked").val() == undefined) {
        mensagemInformacao('O campo Forma de Pagamento é obrigatório!');
        return;
    }

    if ($('#hdnPermiteLancamentoDataRetroativaRecibo').val() == '0') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        $('#DataPagamento').val(today);
    }

    if ($('#DataPagamento').val() == '') {
        mensagemInformacao('O campo Data de Pagamento é obrigatório!');
        return;
    }

    var model = {
        IdFormaPagamento: $("input:radio[name='IdFormaPagamento']:checked").val(),
        Observacao: $('#ObservacaoFechamentoCaixa').val(),
        DataPagamento: $('#DataPagamento').val(),
        IdRecibo: IdRecibo,
    }

    $.ajax({
        type: 'POST',
        url: `/Financeiro/FecharCaixa`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Fechamento realizado com sucesso!');
            $('#modalReciboFechamentoCaixa').modal('hide');
            pesquisarFinanceiroListagem();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function salvarFechamentoCaixaAbaRecibo(IdRecibo) {
    if ($("input:radio[name='IdFormaPagamento']:checked").val() == undefined) {
        mensagemInformacao('O campo Forma de Pagamento é obrigatório!');
        return;
    }

    if ($('#hdnPermiteLancamentoDataRetroativaRecibo').val() == '0') {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        $('#DataPagamento').val(today);
    }

    if ($('#DataPagamento').val() == '') {
        mensagemInformacao('O campo Data de Pagamento é obrigatório!');
        return;
    }

    var model = {
        IdFormaPagamento: $("input:radio[name='IdFormaPagamento']:checked").val(),
        Observacao: $('#ObservacaoFechamentoCaixa').val(),
        DataPagamento: $('#DataPagamento').val(),
        IdRecibo: IdRecibo,
    }

    $.ajax({
        type: 'POST',
        url: `/Financeiro/FecharCaixa`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Fechamento realizado com sucesso!');
            $('#modalReciboFechamentoCaixaAbaRecibo').modal('hide');
            $('#conteudoAbaRecibo').empty();
            carregarAbaRecibosPartial();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}