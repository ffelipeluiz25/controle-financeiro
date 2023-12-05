var enumStatus = new EnumStatus();
function carregarAbaRecibosPartial() {
    $('.preloader').fadeIn();
    var IdProtocolo = $('#IdProtocolo').val();
    var numeroProtocolo = $('#NumeroProtocolo').val();
    $.ajax({
        type: 'GET',
        url: `/ReciboProtocolo/CarregarReciboPartial?IdProtocolo=${IdProtocolo}&numeroProtocolo=${numeroProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#conteudoAbaRecibo').html(data);
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function acionarBotaoSlide() {
    $('#IdRecibo').val('0');
    $('#btnSlideRecibo').click();
}

function adicionarRecibo() {
    carregaSlideRecibo();
}

function carregaSlideRecibo() {
    var IdProtocolo = $('#IdProtocolo').val();
    var NumeroProtocolo = $('#NumeroProtocolo').val();
    var IdRecibo = $('#IdRecibo').val();
    $.ajax({
        type: 'GET',
        url: `/ReciboProtocolo/CarregarNovoRecibo?NumeroProtocolo=${NumeroProtocolo}&IdRecibo=${IdRecibo}&IdProtocolo=${IdProtocolo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#sidebarRecibo').empty();
        $('#sidebarRecibo').html(data);
        $('#btnCancelarModalRecibo').on('click', function () {
            setTimeout(function () { $('#sidebarRecibo').empty(); }, 200);
            $('#IdRecibo').val('0');
        });

        setTimeout(function () {
            $('#IdFormaPagamento').val($('#inputIdFormaPagamento').val());

            for (var i = 0; i < $('[id*=ValorTipoServico_]').length; i++) {
                const element = $('[id*=ValorTipoServico_]')[i];
                mascaraMoeda(element);
            }

        }, 200);

        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function tipoReciboChange(button) {
    if (button.id == 'btnCobranca') {
        var btnDevolucaoElement = document.getElementById('btnDevolucao');
        btnDevolucaoElement.classList.remove("active");

        var btnCobrancaElement = document.getElementById('btnCobranca');
        btnCobrancaElement.classList.add("active");
    }
    else {

        var btnDevolucaoElement = document.getElementById('btnDevolucao');
        btnDevolucaoElement.classList.add("active");

        var btnCobrancaElement = document.getElementById('btnCobranca');
        btnCobrancaElement.classList.remove("active");
    }
}

function salvarReciboProtocolo() {
    var IdProtocolo = $('#IdProtocolo').val();
    var IdRecibo = $('#IdRecibo').val();

    var ListaTipoServico = [];
    for (var i = 0; i < $('[id*=ValorTipoServico_]').length; i++) {
        const element = $('[id*=ValorTipoServico_]')[i];
        if ($(element).val() != '')
            ListaTipoServico.push({ Id: parseInt(element.id.split('_')[1]), ValorString: $(element).val() });
    }

    var model = {
        Id: IdRecibo,
        IdProtocolo: IdProtocolo,
        IdTipoRecibo: $('#btnDevolucao').hasClass('active') ? 1 : 2,
        NumeroRecibo: $('#NumeroRecibo').val(),
        NumeroProtocolo: $('#NumeroProtocolo').val(),
        IdFormaPagamento: $('#IdFormaPagamento').val(),
        NomeParteRecibo: $('#NomeParteRecibo').val(),
        ListaTipoServico: ListaTipoServico,
        Observacao: $('#Observacao').val(),
    }

    $.ajax({
        type: 'POST',
        url: `/ReciboProtocolo/SalvarReciboProtocolo`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Recibo salvo com sucesso!');
            setTimeout(() => {
                $('#btnCancelarModalRecibo').click();
                $('#conteudoAbaRecibo').empty();
                carregarAbaRecibosPartial();
            }, 2000);
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function botaoEditarRecibo(IdRecibo, status) {
    $('#IdRecibo').val(IdRecibo);
    $('#btnSlideRecibo').click();
}

function deletarReciboAbaRecibo(IdRecibo, status) {
    $('#IdRecibo').val(IdRecibo);
    if (status != enumStatus.EmAbertoString.toLowerCase()) {
        mensagemInformacao('Esse Recibo já foi pago, não pode ser Excluído.');
        return;
    }

    Swal.fire({
        title: 'Deletar Recibo',
        text: 'Realmente deseja excluir o Recibo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4141',
        cancelButtonColor: '#929292',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value)
            efetivarDeleteAbaRecibo(IdRecibo);
    });
}

function abrirFechamentoCaixaModalAbaRecibo(IdRecibo, IdProtocolo) {
    $.ajax({
        type: 'GET',
        url: `/Financeiro/ReciboFechamentoCaixaPartial?IdRecibo=${IdRecibo}&IdProtocolo=${IdProtocolo}&AbaRecibo=${true}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (result) {
        $('#divAbaReciboModalContent').empty();
        $('#divAbaReciboModalContent').html(result);
        $('.preloader').fadeOut(600, function () {
            $('#modalReciboFechamentoCaixaAbaRecibo').modal('show');
        });
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup de Entrada.');
        $('.preloader').fadeOut();
    });
}

function efetivarDeleteAbaRecibo(IdRecibo) {
    $.ajax({
        type: 'POST',
        url: `/Recibo/DeletarRecibo?IdRecibo=${IdRecibo}`,
        dataType: 'json',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Recibo deletado com sucesso!');
            setTimeout(() => {
                $('#conteudoAbaRecibo').empty();
                carregarAbaRecibosPartial();
            }, 2000);
        }
        else
            mensagemErro(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function imprimir(IdRecibo, NumeroProtocolo, NumeroRecibo, ValorRecibo) {
    var valorSplitado = ValorRecibo.replace('.', '').replace('R$ ', '').split(',');
    var modelo = {
        IdRecibo: IdRecibo,
        NumeroProtocolo: NumeroProtocolo,
        NumeroRecibo: NumeroRecibo,
        ValorAntesDaCasaDecimal: parseInt(valorSplitado[0]),
        ValorDepoisDaCasaDecimal: parseInt(valorSplitado[1])
    }

    var url = `/Recibo/ImprimirRecibo?IdRecibo=${modelo.IdRecibo}
    &NumeroProtocolo=${modelo.NumeroProtocolo}
    &NumeroRecibo=${modelo.NumeroRecibo}
    &ValorAntesDaCasaDecimal=${modelo.ValorAntesDaCasaDecimal}
    &ValorDepoisDaCasaDecimal=${modelo.ValorDepoisDaCasaDecimal}`;
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (_pageHtml) {
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