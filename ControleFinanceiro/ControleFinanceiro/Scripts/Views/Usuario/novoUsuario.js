$(document).ready(function () {
    carregar();
});

function funcionalidadeChecada() { }

function carregar() {
    $.ajax({
        type: 'GET',
        url: `/Usuario/NovoUsuarioPartial`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('#divNovoUsuario').html(data);

        alteraStatus();
        registraEventoMascaraCPF();
        iniciar();
        carregarToolTips();
        $('#RedirectLogin').val(false);
        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function iniciar() {
    $('#btnSalvar').click(function () {
        salvar();
    });
}

function salvar() {
    $.ajax({
        type: 'POST',
        url: `/Usuario/SalvarUsuario`,
        dataType: 'json',
        data: $('#frmUsuario').serialize() + "&listaIdFuncionalidades=" + JSON.stringify(getFuncionalidades()),
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.retorno.Sucesso) {
            mensagemSucesso('Usuário salvo com sucesso!');
            setTimeout(() => {
                location.href = '/Usuario';
            }, 2000);
        }
        else
            mensagemInformacao(data.retorno.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}

function alteraStatus() {
    $('#StatusSituacaoFormatado').val($('#Situacao')[0].checked);
}

function getFuncionalidades() {
    let retorno = new Array();

    $('.funcionalidade').each(function () {
        if ($(this).is(':checked'))
            retorno.push($(this).attr("id"));
    });

    return retorno;
}