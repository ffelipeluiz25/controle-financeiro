$(document).ready(function () {
    carregar();
});

function carregar() {
    alteraStatus();
    carregarToolTips();
    iniciar();
}

function iniciar() {
    $('#btnSalvar').click(function () {
        salvar();
    });
}

function salvar() {
    $.ajax({
        type: 'POST',
        url: `/TipoOutro/SalvarTipoOutro`,
        dataType: 'json',
        data: $('#frmTipoOutro').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Tipo Outro salvo com sucesso!');
            $('#modalTipoOutro').modal('hide');
            pesquisarListagemTiposOutro();
        }
        else
            mensagemInformacao(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function alteraStatus() {
    $('#StatusSituacaoFormatado').val($('#Situacao')[0].checked);
}