$(document).ready(function () {
    carregarReciboListagem();
    pesquisarReciboListagem();
});

function carregarReciboListagem() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#DataInicioRecibo').val(today);

    $('#btnBuscar').click(function () {
        pesquisarReciboListagem();
    });
}

function pesquisarReciboListagem() {
    var numeroRecibo = $('#NumeroRecibo').val();
    var numeroProtocolo = $('#NumeroProtocolo').val();
    var dataInicioRecibo = $('#DataInicioRecibo').val();
    var dataFimRecibo = $('#DataFimRecibo').val();
    var valorMinimo = $('#ValorMinimoString').val();
    var valorMaximo = $('#ValorMaximoString').val();
    var idTipoRecibo = $('#IdTipoRecibo').val();
    var idTipoServico = $('#IdTipoServico').val();
    var IdStatusRecibo = $('#statusRecibo').val();
    var url = `/Recibo/ListaReciboPartial?NumeroRecibo=${numeroRecibo}&NumeroProtocolo=${numeroProtocolo}&DataInicioRecibo=${dataInicioRecibo}&DataFimRecibo=${dataFimRecibo}&ValorMinimoString=${valorMinimo}&ValorMaximoString=${valorMaximo}&IdTipoRecibo=${idTipoRecibo}&IdTipoServico=${idTipoServico}&IdStatusRecibo=${IdStatusRecibo}`;

    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        $('#cardBody').html(data);
        paginacaoTables();
        carregarToolTips();

        $('.preloader').fadeOut();
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
        $('.preloader').fadeOut();
    }).fail(function () {
        mensagemErro('Erro ao abrir o popup de Entrada.');
        $('.preloader').fadeOut();
    });

}

function deletarRecibo(IdRecibo) {
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
            efetivarDelete(IdRecibo);
    });
}

function efetivarDelete(IdRecibo) {
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
                pesquisarReciboListagem();
            }, 2000);
        }
        else
            mensagemErro(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}