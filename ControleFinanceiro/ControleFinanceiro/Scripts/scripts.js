$(document).ready(function () {
    menuSlideResolucaoMenor();
    registraEventoMascaraCPF();
    personalizaMenu();
    String.prototype.reverse = function () {
        return this.split('').reverse().join('');
    };
});

function isUpperCase(input) {
    if (input)
        $(input).val($(input).val().toUpperCase());
}

function carregarToolTips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        $(tooltipTriggerEl).on('click', function () {
            $(this).tooltip('hide');
        })
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function formataDecimalJs(valorDoCampo) {

    var valorFloat = '';
    if (valorDoCampo != '') {
        valorFloat = parseFloat(valorDoCampo.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.'));
    }
    return valorFloat.toString();
}

function menuSlideResolucaoMenor() {
    window.addEventListener('DOMContentLoaded', event => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }

    });
}

function personalizaMenu() {
    var queryString = window.location.href.toString();
    $('[id*="menu"]').removeClass('negrito');
    for (var i = 0; i < $('[id*="menu"]').length; i++) {
        if (queryString.includes('Protocolo')) {
            $('#menuProtocolo').addClass('negrito');
            $('#menuProtocolo').click();
            if (queryString.includes('ListaProtocolo') || queryString.includes('EditarProtocolo'))
                $('#menuListaProtocolo').addClass('negrito');
            else
                $('#menuNovoProtocolo').addClass('negrito');

            $('#menuProtocolo').removeClass('collapsed');
            $('#collapsePages').removeClass('d-none');
            $('#collapsePages').addClass('d-block');
        }
        else if (queryString.includes('Usuario'))
            $('#menuUsuario').addClass('negrito');
        else if (queryString.includes('Recibo'))
            $('#menuRecibo').addClass('negrito');
        else if (queryString.includes('Financeiro')) {
            $('#menuFinanceiro').addClass('negrito');
            $('#menuCaixa').addClass('negrito');
            $('#menuFinanceiro').removeClass('collapsed');
            $('#collapsePages2').removeClass('d-none');
            $('#collapsePages2').addClass('d-block');
        }
        else if (queryString.includes('GastoGeral')) {
            $('#menuFinanceiro').addClass('negrito');
            $('#menuGastosGerais').addClass('negrito');
            $('#menuFinanceiro').removeClass('collapsed');
            $('#collapsePages2').removeClass('d-none');
            $('#collapsePages2').addClass('d-block');
        }
        else
            $('#menuInicio').addClass('negrito');
    }
}

function expandirMenuProtocolo() {
    if ($('#menuProtocolo').hasClass('collapsed')) {
        $('#menuProtocolo').removeClass('collapsed');
        $('#collapsePages').removeClass('d-none');
        $('#collapsePages').addClass('d-block');
    }
    else {
        $('#menuProtocolo').addClass('collapsed');
        $('#collapsePages').removeClass('d-block');
        $('#collapsePages').addClass('d-none');
    }
}

function expandirMenuFinanceiro() {
    if ($('#menuFinanceiro').hasClass('collapsed')) {
        $('#menuFinanceiro').removeClass('collapsed');
        $('#collapsePagesFinanceiro').removeClass('d-none');
        $('#collapsePagesFinanceiro').addClass('d-block');
    }
    else {
        $('#menuFinanceiro').addClass('collapsed');
        $('#collapsePagesFinanceiro').removeClass('d-block');
        $('#collapsePagesFinanceiro').addClass('d-none');
    }
}

function expandirMenuRelatorio() {
    if ($('#menuRelatorios').hasClass('collapsed')) {
        $('#menuRelatorios').removeClass('collapsed');
        $('#collapsePagesRelatorios').removeClass('d-none');
        $('#collapsePagesRelatorios').addClass('d-block');
    }
    else {
        $('#menuRelatorios').addClass('collapsed');
        $('#collapsePagesRelatorios').removeClass('d-block');
        $('#collapsePagesRelatorios').addClass('d-none');
    }
}

function registraEventoMascaraCPF() {
    var cpf = document.querySelector("#cpf");
    if (cpf)
        cpf.addEventListener("blur", function () {
            if (cpf.value) {
                cpf.value = cpf.value.replace('.', '').replace('.', '').replace('-', '');
                cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/, "-");
            }
        });
}

function paginacaoTables(_orderBy) {
    var orderBy = [[0, 'asc']];
    if (orderBy != undefined) {
        orderBy = _orderBy;
    }

    new DataTable('#dataTables', {
        order: orderBy,
        language: {
            "decimal": "",
            "emptyTable": "Nenhum registro encontrado",
            "info": "Exibindo _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Exibindo 0 a 0 de 0 registros",
            "infoFiltered": "(Filtrando de _MAX_ total registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Exibir _MENU_ registros",
            "loadingRecords": "Carregando...",
            "processing": "",
            "search": "Pesquisar:",
            "zeroRecords": "Nenhum registro encontrado!",
            "paginate": {
                "first": "Primeira",
                "last": "Última",
                "next": "Próxima",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        }
    });
}

function paginacaoTablesSegunda(_orderBy) {
    var orderBy = [[0, 'asc']];
    if (orderBy != undefined) {
        orderBy = _orderBy;
    }

    new DataTable('#dataTables2', {
        order: orderBy,
        language: {
            "decimal": "",
            "emptyTable": "Nenhum registro encontrado",
            "info": "Exibindo _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Exibindo 0 a 0 de 0 registros",
            "infoFiltered": "(Filtrando de _MAX_ total registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Exibir _MENU_ registros",
            "loadingRecords": "Carregando...",
            "processing": "",
            "search": "Pesquisar:",
            "zeroRecords": "Nenhum registro encontrado!",
            "paginate": {
                "first": "Primeira",
                "last": "Última",
                "next": "Próxima",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        }
    });
}

function apenasNumeros(string) {
    if (string == '')
        return string;

    var numsStr = string.replace(/[^0-9]/g, '');
    if (numsStr == '')
        return numsStr;

    return parseInt(numsStr);
}

function formatarMascaraCPF() {
    var cpf = $("#cpf").val();
    if (cpf != null && cpf != '')
        $("#cpf").val(cpf.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/, "-"));
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function mensagemSucesso(textoMensagem) {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: textoMensagem,
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                    const b = content.querySelector('b');
                    if (b) {
                        b.textContent = Swal.getTimerLeft();
                    }
                }
            }, 100);
        },
        onClose: () => {
            clearInterval(timerInterval);
        }
    });
}

function mensagemErro(mensagem) {
    Swal.fire({ icon: 'error', title: 'Erro', text: mensagem });
}

function mensagemInformacao(mensagem) {
    let msgErro = mensagem;

    if (msgErro.indexOf(";") >= 0) {
        let msgSplit = msgErro.split(";");
        let msgTratada = "";

        $.each(msgSplit, function (index, value) {
            msgTratada += value + '<br>';
        });

        msgErro = msgTratada;
    }

    Swal.fire({ icon: 'warning', title: 'Atenção!', html: msgErro });
}

function mascaraMoeda(campo) {
    var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}