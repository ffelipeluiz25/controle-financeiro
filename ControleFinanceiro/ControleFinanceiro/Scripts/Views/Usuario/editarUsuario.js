$(document).ready(function () {
    carregar();
});


function funcionalidadeChecada() {
    $('#RedirectLogin').val(true);
}

function carregar() {
    $.ajax({
        type: 'GET',
        url: `/Usuario/EditarUsuarioPartial?IdUsuario=` + $('#IdUsuario').val(),
        contentType: 'html',
    }).done(function (data) {
        $('#divEditarUsuario').html(data);

        alteraStatus();
        formatarMascaraCPF();
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

        if (data.retorno.Sucesso) {
            var mensagem = data.redirectUrl.includes('Login') ? 'Usuário logado alterado sera redirecionado para Login!' : 'Usuário alterado com sucesso!';
            mensagemSucesso(mensagem);
            setTimeout(() => {
                location.href = data.redirectUrl;
            }, 2000);
        }
        else
            mensagemInformacao(data.retorno.Mensagem);


        $('.preloader').fadeOut();
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