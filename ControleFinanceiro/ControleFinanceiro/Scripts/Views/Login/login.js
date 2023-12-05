$(document).ready(function () {
    $("#inputEmail, inputPassword").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#btnEntrar").click();
        }
    });

});

function Logar() {
    $.ajax({
        type: 'POST',
        url: `/Login/Logar`,
        dataType: 'json',
        data: {
            Login: $('#inputEmail').val(),
            Senha: $('#inputPassword').val()
        }
    }).done(function (data) {
        if (!data.Sucesso) {
            $('#msgErroValidacaoLogin').text(data.Mensagem);
            setTimeout(function () {
                $('#msgErroValidacaoLogin').text('');
            }, 2000);

            return;
        }

        window.location.href = data.Url;

    }).fail(function (e) {
    });

}