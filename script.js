
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
    esconderTabelas();
    limparTabelas(); 
    var request = new XMLHttpRequest();
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            var tabelaCategoria = document.getElementById('tabelaCategoria')
            for (let i = 0; i < listaCategorias.length; i++) {
                let tr = document.createElement('tr')
                tabelaCategoria.appendChild(tr)
                let td = document.createElement('td')
                td.innerText = listaCategorias[i].id
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaCategorias[i].nome
                tr.appendChild(td)
            }
            document.getElementById('lista-categoria').style.display = "flex"
        } else {
            alert("Requisição errada")
        }
    }
})
btnListarProdutos.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas()
    limparTabelas()
    var request = new XMLHttpRequest();
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaProdutos = request.response.dados
            console.log(listaProdutos)
            var tabelaProduto = document.getElementById('tabela')
            for (let i = 0; i < listaProdutos.length; i++) {
                let tr = document.createElement('tr')
                tabelaProduto.appendChild(tr)
                let td = document.createElement('td')
                td.innerText = listaProdutos[i].id
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].nome
                tr.appendChild(td)
            }
            document.getElementById('lista-produtos').style.display = "flex"
        } else {
            alert("Requisição errada")
        }
    }
})
btnCadastrarProdutos.addEventListener('click', function (event) {
    event.preventDefault()
    limparTabelas()
    document.getElementById('cadastro-produto').style.display = "flex"
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
function limparTabelas() {
    tabelaCategoria.innerText = ""
    tabelaCategoria.innerHTML = '<tr>' +
    '<th>Id</th >' +
    '<th>Nome</th>' +
    '</tr> '
    tabelaProduto.innerText = ""
    tabelaProduto.innerHTML = '<tr>' +
    '<th>Id</th >' +
    '<th>Nome</th>' +
    '</tr> '
}
function esconderTabelas() {
    document.getElementById('cadastro-produto').style.display = "none"
    document.getElementById('lista-categoria').style.display = "none"
    document.getElementById('lista-produto').style.display = "none"
}
let form = document.getElementById('form')
let id = document.getElementById('id')
let codigo = document.getElementById('codigo')
let categoria = document.getElementById('categoria')
let nome = document.getElementById('nome')
let descriao = document.getElementById('descricao')
let preco = document.getElementById('preco')
let imagem = document.getElementById('imagem')
let peso = document.getElementById('peso')
