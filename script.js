
var btnListarCategorias = document.getElementById("btnListarCategorias")
var btnListarProdutos = document.getElementById("btnListarProdutos")
var btnAlterarCategorias = document.getElementById("btnAlterarCategorias")
var btnAlterarProdutos = document.getElementById("btnAlterarProdutos")
var btnExcluirCategorias = document.getElementById("btnExcluirCategorias")
var btnExcluirProdutos = document.getElementById("btnExcluirProdutos")
var btnCadastrarCategorias = document.getElementById("btnCadastrarCategorias")
var btnCadastrarProdutos = document.getElementById("btnCadastrarProdutos")


btnListarCategorias.addEventListener('click', function (event) {
    event.preventDefault()

    var request = new XMLHttpRequest();

    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado[0].id);
            var lista = document.getElementById('lista')
            for (let i = 0; i < resultado.length; i++) {
                let li = document.createElement('li')
                console.log(resultado[i].id)
                li.innerText = resultado[i].id + ' - ' + resultado[i].nome
                lista.appendChild(li)
            }
        } else {
            alert("Requisição errada")
        }
    }
}) 
btnListarProdutos.addEventListener('click', function (event) {
    event.preventDefault()

    var request = new XMLHttpRequest();
    var id = "&id=" + document.getElementById('idCategoria')
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar" + id
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado[0].id);
            var lista = document.getElementById('lista')
            for (let i = 0; i < resultado.length; i++) {
                let li = document.createElement('li')
                console.log(resultado[i].id)
                li.innerText = resultado[i].id + ' - ' + resultado[i].nome
                lista.appendChild(li)
            }
        } else {
            alert("Requisição errada")
        }
    }
}) 
btnAlterarCategorias.addEventListener('click', function (event) {
    event.preventDefault()

    var request = new XMLHttpRequest();
    var id = "&id=" + document.getElementById('idCategoria')
    var nome = "&nome=" + document.getElementById('nomeCategoria')
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=alterar" + id + nome
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado[0].id);
            var lista = document.getElementById('lista')
            for (let i = 0; i < resultado.length; i++) {
                let li = document.createElement('li')
                console.log(resultado[i].id)
                li.innerText = resultado[i].id + ' - ' + resultado[i].nome
                lista.appendChild(li)
            }
        } else {
            alert("Requisição errada")
        }
    }
}) 
btnAlterarProdutos.addEventListener('click', function (event) {
    event.preventDefault()

    var request = new XMLHttpRequest();
    var id = "&id=" + document.getElementById('idProduto')
    var nome = "&nome=" + document.getElementById('nomeProduto')
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=alterar" + id + nome
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado[0].id);
            var lista = document.getElementById('lista')
            lista.innerHTML = ""
            for (let i = 0; i < resultado.length; i++) {
                let li = document.createElement('li')
                console.log(resultado[i].id)
                li.innerText = resultado[i].id + ' - ' + resultado[i].nome
                lista.appendChild(li)
            }
        } else {
            alert("Requisição errada")
        }
    }
}) 
btnAlterarProdutos.addEventListener('click', function (event) {
    event.preventDefault()

    var request = new XMLHttpRequest();
    var id = "&id=" + document.getElementById('idProduto')
    var nome = "&nome=" + document.getElementById('nomeProduto')
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=alterar" + id + nome
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado[0].id);
            var lista = document.getElementById('lista')
            for (let i = 0; i < resultado.length; i++) {
                let li = document.createElement('li')
                console.log(resultado[i].id)
                li.innerText = resultado[i].id + ' - ' + resultado[i].nome
                lista.appendChild(li)
            }
        } else {
            alert("Requisição errada")
        }
    }
}) 
let form = document.getElementById('form')
let id = document.getElementById('id')
let codigo = document.getElementById('codigo')
let categoria = document.getElementById('categoria')
let nome = document.getElementById('nome')
let descriao = document.getElementById('descricao')
let preco = document.getElementById('preco')
let imagem = document.getElementById('imagem')
let peso = document.getElementById('peso')
