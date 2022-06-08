
var listarCategorias = document.getElementById("listarCategorias")
var listarProdutos = document.getElementById("listarProdutos")
var alterarCategorias = document.getElementById("alterarCategorias")
var alterarProdutos = document.getElementById("alterarProdutos")
var excluirCategorias = document.getElementById("excluirCategorias")
var excluirProdutos = document.getElementById("excluirProdutos")
var cadastrarCategorias = document.getElementById("cadastrarCategorias")
var cadastrarProdutos = document.getElementById("cadastrarProdutos")
var btnCadastroCategoria = document.getElementById("btnCadastroCategoria")
var btnAlteraCategoria = document.getElementById("btnAlterarCategoria")
var btnAlteraProduto = document.getElementById("btnAlteraProduto")
var btnExcluirCategoria = document.getElementById("btnExcluirCategoria")
var request = new XMLHttpRequest();

cadastrarProdutos.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas()
    carregarCbCategoria();
    document.getElementById('cadastro-produto').style.display = "flex"
})

cadastrarCategorias.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas()
    document.getElementById('cadastro-categoria').style.display = "flex"
})
alterarCategorias.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas()
    carregarCbCategoriaAlteracao()
    document.getElementById('altera-categoria').style.display = "flex"
})
alterarProdutos.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas()
    carregarCbProdutoAlteracao()
    carregarCbCategoriaProdutoAlteracao()
    document.getElementById('altera-produto').style.display = "flex"
})
excluirCategorias.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas()
    carregarCbCategoriaExclusao()
    document.getElementById('excluir-categoria').style.display = "flex"
})
excluirProdutos.addEventListener('click', function (event) {
    event.preventDefault()
    esconderTabelas();
    limparTabelas()
    carregarCbProdutoExclusao()
    document.getElementById('excluir-produto').style.display = "flex"
})

listarCategorias.addEventListener('click', function (event) {
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
                tr.style.backgroundColor = '##E8F1F2;'
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

listarProdutos.addEventListener('click', function (event) {
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

btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault()
    let id = document.getElementById('id')
    let codigo = document.getElementById('codigo')
    let cbCategoria = document.getElementById('categoria')
    let nome = document.getElementById('nome')
    let descricao = document.getElementById('descricao')
    let preco = document.getElementById('preco')
    let imagem = document.getElementById('imagem')
    let peso = document.getElementById('peso')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=inserir"
    let params = ""
    if(id.value != '') {
        params += '&id='+ id.value
    }
    if(nome.value != '') {
        params += '&nome='+ nome.value
    }
    if(codigo.value != '') {
        params += '&codigo='+ codigo.value
    }
    if(cbCategoria.value != '') {
        params += '&categoria='+ cbCategoria.value
    }
    if(descricao.value != '') {
        params += '&descricao='+ descricao.value
    }
    if(preco.value != '') {
        params += '&preco='+ preco.value
    }
    if(imagem.value != '') {
        params += '&imagem='+ imagem.value
    }
    if(peso.value != '') {
        params += '&peso='+ peso.value
    }
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Produto adicionado com sucesso!")
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
})

btnCadastroCategoria.addEventListener('click', function (event) {
    event.preventDefault()
    let id = document.getElementById('idCategoria')
    let nome = document.getElementById('nomeCategoria')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=inserir"
    let params = ""
    if(id.value != '') {
        params += '&id='+ id.value
    }
    if(nome.value != '') {
        params += '&nome='+ nome.value
    }
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Categoria adicionado com sucesso!")
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
})
btnAlteraCategoria.addEventListener('click', function (event) {
    event.preventDefault()
    let id = document.getElementById('cbCategoriaAlteracao')
    let nome = document.getElementById('nomeAlteraCategoria')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=alterar"
    let params = ""
    if(id.value != '') {
        params += '&id='+ id.value
    }
    if(nome.value != '') {
        params += '&nome='+ nome.value
    }
    console.log(params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Categoria alterada com sucesso!")
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
})
btnExcluirCategoria.addEventListener('click', function (event) {
    event.preventDefault()
    let id = document.getElementById('cbCategoriaExclusao')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=remover"
    let params = ""
    if(id.value != '') {
        params += '&id='+ id.value
    }
    console.log(params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Categoria removida com sucesso!")
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
})
btnExcluirProduto.addEventListener('click', function (event) {
    event.preventDefault()
    let id = document.getElementById('cbProdutoExclusao')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=remover"
    let params = ""
    if(id.value != '') {
        params += '&id='+ id.value
    }
    console.log(params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Produto removido com sucesso!")
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
})

btnAlteraProduto.addEventListener('click', function (event) {
    event.preventDefault()
    let id = document.getElementById('cbIdAlteracao')
    let codigo = document.getElementById('codigoAlteracao')
    let cbCategoria = document.getElementById('cbCategoriaAlteracao')
    let nome = document.getElementById('nomeAlteracao')
    let descricao = document.getElementById('descricaoAlteracao')
    let preco = document.getElementById('precoAlteracao')
    let imagem = document.getElementById('imagemAlteracao')
    let peso = document.getElementById('pesoAlteracao')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=alterar"
    let params = ""
    if(id.value != '') {
        params += '&id='+ id.value
    }
    if(nome.value != '') {
        params += '&nome='+ nome.value
    }
    if(codigo.value != '') {
        params += '&codigo='+ codigo.value
    }
    if(cbCategoria.value != '') {
        params += '&categoria='+ cbCategoria.value
    }
    if(descricao.value != '') {
        params += '&descricao='+ descricao.value
    }
    if(preco.value != '') {
        params += '&preco='+ preco.value
    }
    if(imagem.value != '') {
        params += '&imagem='+ imagem.value
    }
    if(peso.value != '') {
        params += '&peso='+ peso.value
    }
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Produto alterado com sucesso!")
        }
        else {
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
    document.getElementById('cadastro-categoria').style.display = "none"
    document.getElementById('altera-categoria').style.display = "none"
    document.getElementById('altera-produto').style.display = "none"
    document.getElementById('excluir-categoria').style.display = "none"
    document.getElementById('excluir-produto').style.display = "none"
}

function carregarCbCategoria() {
    document.getElementById('cbCategoria').innerHTML = "<select id='cbCategoria'></select>"
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
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
function carregarCbCategoriaAlteracao() {
    document.getElementById('cbCategoria').innerHTML = "<select id='cbCategoriaAlteracao'></select>"
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            let cbCategoriaAlteracao = document.getElementById('cbCategoriaAlteracao')
            for (let k = 0; k < listaCategorias.length; k++) {
                let opt = document.createElement('option')
                opt.value = listaCategorias[k].id
                opt.text = listaCategorias[k].nome
                cbCategoriaAlteracao.appendChild(opt)
            }
        }
    }
}
function carregarCbProdutoAlteracao() {
    document.getElementById('cbCategoria').innerHTML = "<select id='cbIdAlteracao'></select>"
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaProdutos = request.response.dados
            let cbIdAlteracao = document.getElementById('cbIdAlteracao')
            for (let k = 0; k < listaProdutos.length; k++) {
                let opt = document.createElement('option')
                opt.value = listaProdutos[k].id
                opt.text = listaProdutos[k].nome
                cbIdAlteracao.appendChild(opt)
            }
        }
    }
}
function carregarCbCategoriaProdutoAlteracao() {
    document.getElementById('cbCategoria').innerHTML = "<select id='cbIdAlteracao'></select>"
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaProdutos = request.response.dados
            let cbIdAlteracao = document.getElementById('cbIdAlteracao')
            for (let k = 0; k < listaProdutos.length; k++) {
                let opt = document.createElement('option')
                opt.value = listaProdutos[k].id
                opt.text = listaProdutos[k].nome
                cbIdAlteracao.appendChild(opt)
            }
        }
    }
}
function carregarCbCategoriaExclusao() {
    document.getElementById('cbCategoria').innerHTML = "<select id='cbCategoriaExclusao'></select>"
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            let cbCategoriaExclusao = document.getElementById('cbCategoriaExclusao')
            for (let k = 0; k < listaCategorias.length; k++) {
                let opt = document.createElement('option')
                opt.value = listaCategorias[k].id
                opt.text = listaCategorias[k].nome
                cbCategoriaExclusao.appendChild(opt)
            }
        }
    }
}
function carregarCbProdutoExclusao() {
    document.getElementById('cbCategoria').innerHTML = "<select id='cbProdutoExclusao'></select>"
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            listaProdutos = request.response.dados
            let cbProdutoExclusao = document.getElementById('cbProdutoExclusao')
            for (let k = 0; k < listaProdutos.length; k++) {
                let opt = document.createElement('option')
                opt.value = listaProdutos[k].id
                opt.text = listaProdutos[k].nome
                cbProdutoExclusao.appendChild(opt)
            }
        }
    }
}