$(document).ready(function () {
    var cookie = getCookie('certificare_login_session');
    const nome = atob(cookie).split('\\')[1];
    $('#nomeUsuarioLoginSuperior').text(nome);
});