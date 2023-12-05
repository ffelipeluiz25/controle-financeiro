$(document).ready(function () {
    carregar();
});

function carregar() {
    $('#btnSalvar').click(function () {
        salvar();
    });

    $.ajax({
        type: 'GET',
        url: `/Protocolo/NovoProtocoloPartial`,
        contentType: 'html',
    }).done(function (data) {
        $('#divNovoProtocolo').html(data);

        var cookie = getCookie('cf_login_session');
        const nome = atob(cookie).split('\\')[1];
        $('#NomeUsuario').val(nome);

        alteraStatus();

        $('#NumeroProtocolo').on('blur', function () {
            $('#NumeroProtocolo').val(apenasNumeros($('#NumeroProtocolo').val()));
        });

        carregarToolTips();
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function salvar() {
    $.ajax({
        type: 'POST',
        url: `/Protocolo/SalvarProtocolo`,
        dataType: 'json',
        data: $('#frmProtocolo').serialize(),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();
        if (data.Sucesso) {
            mensagemSucesso('Protocolo salvo com sucesso!');
            setTimeout(() => {
                location.href = '/Protocolo/EditarProtocolo?IdProtocolo=' + data.Dados;
            }, 2000);
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