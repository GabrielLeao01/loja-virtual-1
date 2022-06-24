var request = new XMLHttpRequest();

document.getElementById('listarCategorias').addEventListener('click', () => {
    event.preventDefault()
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            var listaCategoria = request.response.dados
            var tabelaCategorias = document.getElementById('tabelaCategorias')

            limparTabelas()
            esconderTabelas()

            let tr = document.createElement('tr')
            let th = document.createElement('th')

            tabelaCategorias.appendChild(tr)
            th.innerText = 'Id'
            tr.appendChild(th)
            th = document.createElement('th')
            th.innerText = 'Nome'
            tr.appendChild(th)

            listaCategoria.forEach(e => {
                tr = document.createElement('tr')
                tr.style.backgroundColor = '##E8F1F2;'
                tabelaCategorias.appendChild(tr)
                let td = document.createElement('td')
                td.innerText = e.id
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.nome
                tr.appendChild(td)
                let btn = document.createElement('button')
                btn.setAttribute("id", 'excluir')
                btn.setAttribute("class", 'btn-tabela')
                let img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/x-square-fill.svg")
                img.setAttribute("width", '15')
                btn.appendChild(img)
                tr.appendChild(btn)
                btn = document.createElement('button')
                btn.setAttribute("id", 'alterar')
                btn.setAttribute("class", 'btn-tabela')
                img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/pencil-fill.svg")
                img.setAttribute("width", '15')
                btn.appendChild(img)
                tr.appendChild(btn)
            });
            document.getElementById('lista-categoria').style.display = "flex"
        }
    }
})

document.getElementById('listarProdutos').addEventListener('click', () => {
    event.preventDefault()
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            var listaProdutos = request.response.dados
            var tabelaProdutos = document.getElementById('tabelaProdutos')

            limparTabelas()
            esconderTabelas()

            listaProdutos.forEach(e => {
                let tr = document.createElement('tr')
                tabelaProdutos.appendChild(tr)
                let td = document.createElement('td')
                td.innerText = e.id
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.codigo
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.categoria
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.nome
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.descricao
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = (e.preco * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.nome
                tr.appendChild(td)
                td = document.createElement('td')
                td.innerText = e.peso + 'g'
                tr.appendChild(td)
                let btn = document.createElement('button')
                btn.setAttribute("id", 'teste')
                btn.setAttribute("class", 'btn-tabela')
                let img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/x-square-fill.svg")
                img.setAttribute("width", '15')
                img.setAttribute("color", 'red')
                btn.appendChild(img)
                tr.appendChild(btn)
                btn = document.createElement('button')
                btn.setAttribute("id", 'alterar')
                btn.setAttribute("class", 'btn-tabela')
                btn.setAttribute("onclick", "teste(" +e.id+ ")")
                img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/pencil-fill.svg")
                img.setAttribute("width", '15')
                btn.appendChild(img)
                tr.appendChild(btn)
            })
            document.getElementById('lista-produto').style.display = "flex"
        }
    }
})

document.getElementById('btnCadastroCategoria').addEventListener('click', () => {
    event.preventDefault()
    let nome = document.getElementById('nomeCategoria')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=inserir"
    let params = ""

    if (nome.value != '') {
        params += '&nome=' + nome.value
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

    }
})

document.getElementById('btnCadastroProduto').addEventListener('click', () => {
    event.preventDefault()

    let codigo = document.getElementById('codigo')
    let cbCategoria = document.getElementById('cbCategoria')
    let nome = document.getElementById('nome')
    let descricao = document.getElementById('descricao')
    let preco = document.getElementById('preco')
    let imagem = document.getElementById('imagem')
    let peso = document.getElementById('peso')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=inserir"
    let params = ""

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

document.getElementById('cadastrarCategorias').addEventListener('click', () => {
    event.preventDefault()
    limparTabelas()
    esconderTabelas()
    document.getElementById('cadastro-categoria').style.display = 'flex'
})

document.getElementById('cadastrarProdutos').addEventListener('click', () => {
    event.preventDefault()
    carregarCbCategoria()
    limparTabelas()
    esconderTabelas()
    document.getElementById('cadastro-produto').style.display = 'flex'
})

function limparTabelas() {
    tabelaCategorias.innerText = ''
    tabelaProdutos.innerText = ''
}

function esconderTabelas() {
    document.getElementById('cadastro-produto').style.display = "none"
    document.getElementById('lista-categoria').style.display = "none"
    document.getElementById('lista-produto').style.display = "none"
    document.getElementById('cadastro-categoria').style.display = "none"
}

function carregarCbCategoria() {
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            let cbCategoria = document.getElementById('cbCategoria')
            listaCategorias.forEach(e => {
                let opt = document.createElement('option')
                opt.value = e.id
                opt.text = e.nome
                cbCategoria.appendChild(opt)
            })
        }
    }
}

function teste(a) {
    alert(a)
}