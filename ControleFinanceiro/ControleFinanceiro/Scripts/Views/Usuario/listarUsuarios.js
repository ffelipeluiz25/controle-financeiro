$(document).ready(function () {
    carregarListagemUsuarios();
    pesquisarListagemUsuarios();
});

function carregarListagemUsuarios() {
    $('#btnBuscar').click(function () {
        pesquisarListagemUsuarios();
    });
}

function pesquisarListagemUsuarios() {
    var cpf = $('#cpf').val();
    var nomeCompleto = $('#nomeCompleto').val();
    var email = $('#email').val();
    var idStatus = $('#status').val();

    $.ajax({
        type: 'GET',
        url: `/Usuario/ListaUsuarioPartial?CPF=${cpf}&NomeCompleto=${nomeCompleto}&Email=${email}&IdStatus=${idStatus}`,
        contentType: 'html',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {

        $('#cardBody').html(data);
        paginacaoTables();
        carregarToolTips();

        $('.preloader').fadeOut();
    }).fail(function (e, a, b, c) {
        $('.preloader').fadeOut();
    });
}

function inativarUsuario(idUsuario) {
    Swal.fire({
        title: 'Inativar Usuário',
        text: 'Realmente deseja Inativar o Usuário?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4141',
        cancelButtonColor: '#929292',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value)
            efetivarInativacao(idUsuario);
    });
}

function efetivarInativacao(idUsuario) {
    $.ajax({
        type: 'POST',
        url: `/Usuario/InativarUsuario?idUsuario=${idUsuario}`,
        dataType: 'json',
        beforeSend: function () {
            $('.preloader').fadeIn();
        }
    }).done(function (data) {
        $('.preloader').fadeOut();

        if (data.Sucesso) {
            mensagemSucesso('Usuário Inativado com Sucesso!');
            setTimeout(() => {
                pesquisarListagemUsuarios();
            }, 2000);
        }
        else
            mensagemErro(data.Mensagem);
    }).fail(function () {
        $('.preloader').fadeOut();
        mensagemErro('Erro ao processar a solicitação.');
    });
}