function pesquisarListagemProtocolo() {
    var NumeroRecibo = $('#NumeroRecibo').val();
    var NumeroProtocolo = $('#NumeroProtocolo').val();
    var DataInicioRecibo = $('#DataInicioRecibo').val();
    var DataFinalRecibo = $('#DataFinalRecibo').val();
    var IdStatus = $('#status').val();
    var IdStatusRecibo = $('#statusRecibo').val();

    $('.preloader').fadeIn();
    $.ajax({
        type: 'GET',
        url: `/Protocolo/ListaProtocoloPartial?NumeroRecibo=${NumeroRecibo}&NumeroProtocolo=${NumeroProtocolo}&DataInicioRecibo=${DataInicioRecibo}&DataFinalRecibo=${DataFinalRecibo}&IdStatus=${IdStatus}&IdStatusRecibo=${IdStatusRecibo}`,
        contentType: 'html',
    }).done(function (data) {
        $('#cardBody').html(data);

        paginacaoTables();
        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function excluirProtocolo(IdProtocolo) {
    Swal.fire({
        title: 'Excluir Protocolo',
        text: 'Deseja realmente excluir protocolo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4141',
        cancelButtonColor: '#929292',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value)
            excluirProtocoloAction(IdProtocolo);
    });
}

function excluirProtocoloAction(IdProtocolo) {
    $('.preloader').fadeIn();
    $.ajax({
        type: 'Post',
        url: `/Protocolo/ExcluirProtocolo?IdProtocolo=${IdProtocolo}`,
        dataType: "json",
    }).done(function (data) {
        $('.preloader').fadeOut();
        mensagemSucesso('Excluído com sucesso!');
        pesquisarListagemProtocolo();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}