const urlCEP = 'https://viacep.com.br/ws/';
var request = new XMLHttpRequest()

function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
}
function buscarCEP() {
    let cep = document.getElementById('cep').value.replace(/\D/g, "");
    if (cep.length < 8) {
        alert('CEP Inválido!')
        return
    }
    console.log(cep);
    loadJSON(urlCEP + cep + '/json', popularDados);
}

function popularDados(dados) {
    if (dados.erro == 'true') {
        alert('CEP Inválido!')
        return
    }
    document.getElementById('rua').setAttribute('value', dados.logradouro)
    document.getElementById('bairro').setAttribute('value', dados.bairro)
    document.getElementById('cidade').setAttribute('value', dados.localidade)
    document.getElementById('uf').setAttribute('value', dados.uf)
}

function loadJSON(url, callback) {
    var obj = new XMLHttpRequest();
    obj.overrideMimeType("application/json");
    obj.open('GET', url, true);
    console.log(url);
    obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == "200") {
            callback(JSON.parse(obj.responseText));
        }
    };
    obj.send(null)
}

document.getElementById('btnCadastrarCliente').addEventListener('click', () => {
    event.preventDefault()
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=pedido&t=inserir"
    let params = ""

    let cep = document.getElementById('cep').value

    console.log(cpf)

    for (let campo of ['nome', 'rua', 'numero', 'cidade', 'bairro', 'uf']) {

        if (!document.getElementById(campo).value) {
            alert(campo + ' não preenchido')
        }
        else {
            params += '&' + campo + '=' + document.getElementById(campo).value
            console.log(params)
        }
    }
    if (document.getElementById('cpf')) {
        let cpf = document.getElementById('cpf').value.replace(/\D/g, "");
        params += '&cpf=' + cpf
    }
    if (document.getElementById('cep')) {
        let cep = document.getElementById('cep').value.replace(/\D/g, "");
        params += '&cep=' + cep
    }
    if (document.getElementById('comp')) {
        params += '&complemento=' + document.getElementById('comp').value
    }

    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            localStorage.setItem('idPedido', resultado.id)
            finalizarPedido()
        }
    }


})

function finalizarPedido() {
    var carrinho = JSON.parse(localStorage.getItem('carrinho'))
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=item&t=inserir"
    var i = 0;
    adicionarPedido()
    function adicionarPedido() {
        if (i >= carrinho.length) {
            alert('pedido Realizado com sucesso');
            window.location.href = 'http://127.0.0.1:5500/pedidos.html'
            return;
        }
        let params = '&pedido=' + localStorage.getItem('idPedido') + '&produto=' + carrinho[i].id + '&qtd=' + carrinho[i].quantidade
        console.log(params)
        request.open('POST', url);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        request.responseType = 'json';
        request.send(params)
        request.onload = function () {
            if (request.readyState == 4 && request.status == 200) {
                    i++;
                    console.log('depois' + i)
                    adicionarPedido();
            }
        }
    }
}
