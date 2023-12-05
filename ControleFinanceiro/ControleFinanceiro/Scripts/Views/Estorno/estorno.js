function abrirModalEstorno() {
    $.ajax({
        type: 'GET',
        url: '/Estorno/NovoEstornoPartial?IdProtocolo=' + $('#IdProtocolo').val(),
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('.modal-body').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalEstorno').modal('show');
            $('#Valor').val('');
        });
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup do Estorno.');
        $('.preloader').fadeOut();
    });
}

function salvarEstorno() {
    $.ajax({
        type: 'POST',
        url: `/Estorno/SalvarEstorno`,
        dataType: 'json',
        data: $('#frmEstorno').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        if (data.Sucesso) {
            carregaAbaGerenciamentoDados();
            $('#modalEstorno').modal('hide');
            mensagemSucesso('Estorno salvo com sucesso!');
        }
        else
            mensagemInformacao(data.Mensagem);

        $('.preloader').fadeOut();
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}