
var btnListarCategorias = document.getElementById("btnListarCategorias")
var btnListarProdutos = document.getElementById("btnListarProdutos")
var btnAlterarCategorias = document.getElementById("btnAlterarCategorias")
var btnAlterarProdutos = document.getElementById("btnAlterarProdutos")
var btnExcluirCategorias = document.getElementById("btnExcluirCategorias")
var btnExcluirProdutos = document.getElementById("btnExcluirProdutos")
var btnCadastrarCategorias = document.getElementById("btnCadastrarCategorias")
var btnCadastrarProdutos = document.getElementById("btnCadastrarProdutos")
var request = new XMLHttpRequest();

btnListarCategorias.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas();
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            var listaCategorias = request.response.dados
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
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            var listaProdutos = request.response.dados
            var tabelaProduto = document.getElementById('tabelaProduto')
            for (let i = 0; i < listaProdutos.length; i++) {
                let tr = document.createElement('tr')
                tabelaProduto.appendChild(tr)
                let td = document.createElement('td')
                td.innerText = listaProdutos[i].id
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].codigo
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].categoria
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].nome
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].descricao
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = (listaProdutos[i].preco * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].nome
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = listaProdutos[i].peso + 'g'
                tr.appendChild(td)
            }
            document.getElementById('lista-produto').style.display = "flex"
        } else {
            alert("Requisição errada")
        }
    }
})

btnCadastrarProdutos.addEventListener('click', function (event) {
    event.preventDefault()
    limparTabelas()
    carregarCbCategoria()
    document.getElementById('cadastro-produto').style.display = "flex"
})

btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault()
    let form = document.getElementById('form')
    let id = document.getElementById('id')
    let codigo = document.getElementById('codigo')
    let categoria = document.getElementById('categoria')
    let nome = document.getElementById('nome')
    let descricao = document.getElementById('descricao')
    let preco = document.getElementById('preco')
    let imagem = document.getElementById('imagem')
    let peso = document.getElementById('peso')
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=inserir"
    if(id.value != '') {
        url += '&id='+ id.value
    }
    if(nome.value != '') {
        url += '&nome='+ nome.value
    }
    if(codigo.value != '') {
        url += '&codigo='+ codigo.value
    }
    if(categoria.value != '') {
        url += '&categoria='+ id.value
    }
    if(descricao.value != '') {
        url += '&descricao='+ descricao.value
    }
    if(preco.value != '') {
        url += '&preco='+ preco.value
    }
    if(imagem.value != '') {
        url += '&imagem='+ imagem.value
    }
    if(peso.value != '') {
        url += '&peso='+ peso.value
    }
    console.log
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
    tabelaProduto.innerHTML =
        '<tr>' +
        '<th>Id</th>' +
        '<th>Código</th>' +
        '<th>Categoria</th>' +
        '<th>Nome</th>' +
        '<th>Descrição</th>' +
        '<th>Preço</th>' +
        '<th>Imagem</th>' +
        '<th>Peso</th>' +
        '</tr>'
}

function esconderTabelas() {
    document.getElementById('cadastro-produto').style.display = "none"
    document.getElementById('lista-categoria').style.display = "none"
    document.getElementById('lista-produto').style.display = "none"
}

function carregarCbCategoria() {
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            var listaCategorias = request.response.dados
            let cbCategoria = document.getElementById('cbCategoria')
            for (let k = 0; k < listaCategorias.length; k++) {
                let opt = document.createElement('option')
                opt.value = listaCategorias[k].id
                opt.text = listaCategorias[k].nome
                cbCategoria.appendChild(opt)
            }
        }
    }
}