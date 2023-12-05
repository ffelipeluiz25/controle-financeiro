function cancelarModalAcompanhamentoRegistro() {
    $('#modalRegistros').removeClass('d-block');
    $('#modalRegistros').removeClass('d-none');
    $('#modalRegistros').addClass('d-block');

    $('#modalAcompanhamentoRegistros').modal('hide');
    modalRegistro();
}

function acompanhamentoModal(IdRegistroGasto) {

    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/GerenciamentoDados/CarregaModalAcompanhamentoRegistro?IdRegistroGasto=${IdRegistroGasto}`,
        contentType: 'html',
    }).done(function (data) {
        $('#modalRegistros').removeClass('d-block');
        $('#modalRegistros').removeClass('d-none');
        $('#modalRegistros').addClass('d-none');

        $('#modalAcompanhamentoRegistrosBody').html(data);
        $('#modalAcompanhamentoRegistros').modal('show');

        carregarToolTips();
        paginacaoTablesSegunda();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function novoAcompanhamentoRegistro() {
    $('#divFormAcompanhamento').removeClass('d-block');
    $('#divFormAcompanhamento').removeClass('d-none');
    $('#divFormAcompanhamento').addClass('d-block');

    $('#divTableAcompanhamento').removeClass('d-none');
    $('#divTableAcompanhamento').removeClass('d-block');
    $('#divTableAcompanhamento').addClass('d-none');

    $('#btnNovoAcompanhamentoRegistros').removeClass('d-block');
    $('#btnNovoAcompanhamentoRegistros').removeClass('d-none');
    $('#btnNovoAcompanhamentoRegistros').addClass('d-none');
}

function cancelNovoAcompanhamentoRegistro() {
    $('#divFormAcompanhamento').removeClass('d-none');
    $('#divFormAcompanhamento').removeClass('d-block');
    $('#divFormAcompanhamento').addClass('d-none');

    $('#divTableAcompanhamento').removeClass('d-block');
    $('#divTableAcompanhamento').removeClass('d-none');
    $('#divTableAcompanhamento').addClass('d-block');

    $('#btnNovoAcompanhamentoRegistros').removeClass('d-block');
    $('#btnNovoAcompanhamentoRegistros').removeClass('d-none');
    $('#btnNovoAcompanhamentoRegistros').addClass('d-block');
}

function salvarAcompanhamentoRegistro() {
    var model = {
        IdProtocolo: $('#IdProtocolo').val(),
        IdReciboRegistroGasto: $('#hdnIdReciboRegistroGasto').val(),
        ProtocoloRegistro: $('#ProtocoloRegistro').val(),
        CodigoVerificacao: $('#CodigoVerificacao').val(),
        IdTipoAcompanhamentoRegistro: $('#IdTipoAcompanhamentoRegistro').val()
    }

    $.ajax({
        type: 'POST',
        url: `/GerenciamentoDados/SalvarAcompanhamentoRegistro`,
        dataType: 'json',
        data: model,
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Registro foi salvo com sucesso!');
            var IdReciboRegistroGasto = $('#hdnIdReciboRegistroGasto').val();
            acompanhamentoModal(IdReciboRegistroGasto);
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function excluirAcompanhamentoRegistro(IdAcompanhamentoRegistro) {
    Swal.fire({
        title: 'Deletar Acompanhamento Registro',
        text: 'Realmente deseja excluir o acompanhamento de registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4141',
        cancelButtonColor: '#929292',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value)
            efetivarDeleteAcompanhamentoRegistro(IdAcompanhamentoRegistro);
    });
}

function efetivarDeleteAcompanhamentoRegistro(IdAcompanhamentoRegistro) {
    $.ajax({
        type: 'POST',
        url: `/GerenciamentoDados/DeletarAcompanhamentoRegistro?IdAcompanhamentoRegistro=${IdAcompanhamentoRegistro}`,
        dataType: 'json',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Acompanhamento de registro excluído com sucesso!');
            setTimeout(() => {
                var IdReciboRegistroGasto = $('#hdnIdReciboRegistroGasto').val();
                acompanhamentoModal(IdReciboRegistroGasto);
            }, 500);
        }
        else
            mensagemErro(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });

}