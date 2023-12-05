function modalRegistro() {
    var IdProtocolo = $('#IdProtocolo').val();
    var valorRecebido = $('#TotalRecebidoGD').val();
    var valorGasto = $('#TotalGastoGD').val();
    var valorSaldo = $('#TotalSaldoGD').val();
    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDados/CarregaModalRegistro?IdProtocolo=${IdProtocolo}&valorRecebido=${valorRecebido}&valorGasto=${valorGasto}&valorSaldo=${valorSaldo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#modalRegistrosBody').html(data);
        $('#modalRegistros').modal('show');

        mascaraMoeda($('#ValorRegistro')[0]);

        carregarToolTips();
        paginacaoTables();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function salvarRegistro() {
    var IdProtocolo = $('#IdProtocolo').val();
    var ObservacaoRegistro = $('#ObservacaoRegistro').val();
    var model = {
        IdProtocolo: IdProtocolo,
        Observacao: ObservacaoRegistro,
        IdTipoRegistro: $('#IdTipoRegistro').val(),
        IdTipoServicoRegistro: $('#IdTipoServicoRegistro').val(),
        IdFormaEnvio: $('#IdFormaEnvio').val(),
        Matricula: $('#Matricula').val(),
        ValorRegistro: formataDecimalJs($('#ValorRegistro').val())
    }

    $.ajax({
        type: 'POST',
        url: `/GerenciamentoDados/SalvarRegistro`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Registro foi salvo com sucesso!');
            modalRegistro();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function novoRegistro() {
    $('#divForm').removeClass('d-block');
    $('#divForm').removeClass('d-none');
    $('#divForm').addClass('d-block');

    $('#divTable').removeClass('d-none');
    $('#divTable').removeClass('d-block');
    $('#divTable').addClass('d-none');

    $('#btnNovoRegistros').removeClass('d-block');
    $('#btnNovoRegistros').removeClass('d-none');
    $('#btnNovoRegistros').addClass('d-none');

}

function cancelNovoRegistro() {
    $('#divForm').removeClass('d-none');
    $('#divForm').removeClass('d-block');
    $('#divForm').addClass('d-none');

    $('#divTable').removeClass('d-block');
    $('#divTable').removeClass('d-none');
    $('#divTable').addClass('d-block');

    $('#btnNovoRegistros').removeClass('d-block');
    $('#btnNovoRegistros').removeClass('d-none');
    $('#btnNovoRegistros').addClass('d-block');
}

function excluirRegistroGasto(IdRegistro) {
    Swal.fire({
        title: 'Deletar Registro de Gasto',
        text: 'Realmente deseja excluir o registro de gasto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4141',
        cancelButtonColor: '#929292',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value)
            efetivarDeleteRegistroGasto(IdRegistro);
    });
}

function efetivarDeleteRegistroGasto(IdRegistro) {
    $.ajax({
        type: 'POST',
        url: `/GerenciamentoDados/DeletarRegistro?IdRegistro=${IdRegistro}`,
        dataType: 'json',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Registro excluído com sucesso!');
            setTimeout(() => {
                modalRegistro()
            }, 500);
        }
        else
            mensagemErro(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });

}

function cancelarModalRegistro() {
    setTimeout(() => {
        $('#modalRegistros').modal('hide');
        carregaAbaGerenciamentoDados();
    }, 500);
}