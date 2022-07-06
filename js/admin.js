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
                btn.setAttribute('onclick', 'excluirCategorias(' + e.id + ')')

                let img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/x-square-fill.svg")
                img.setAttribute("width", '15')

                btn.appendChild(img)
                tr.appendChild(btn)

                btn = document.createElement('button')
                btn.setAttribute("id", 'alterar')
                btn.setAttribute("class", 'btn-tabela')
                btn.setAttribute('onclick', 'alterarCategorias(' + JSON.stringify(e) + ')')

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

            let tr = document.createElement('tr')
            let th = document.createElement('th')

            tabelaProdutos.appendChild(tr)
            th.innerText = 'Id'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Código'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Categoria'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Nome'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Descrição'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Preço'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Imagem'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Peso'
            tr.appendChild(th)

            listaProdutos.forEach(e => {
                console.log(JSON.stringify(e.imagem))
                tr = document.createElement('tr')
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
                let img = document.createElement('img')
                img.setAttribute('src', e.imagem)
                img.setAttribute('width', "100")
                td.appendChild(img)
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.peso + 'g'
                tr.appendChild(td)

                let btn = document.createElement('button')
                btn.setAttribute("id", 'teste')
                btn.setAttribute("class", 'btn-tabela')
                btn.setAttribute('onclick', "excluirProdutos(" + e.id + ')')

                img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/x-square-fill.svg")
                img.setAttribute("width", '15')
                img.setAttribute("color", 'red')

                btn.appendChild(img)
                tr.appendChild(btn)

                btn = document.createElement('button')
                btn.setAttribute("id", 'alterar')
                btn.setAttribute("class", 'btn-tabela')
                btn.setAttribute("onclick", "alterarProdutos(" + JSON.stringify(e) + ")")

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

    if (nome.value != '') {
        params += '&nome=' + nome.value
    }
    if (codigo.value != '') {
        params += '&codigo=' + codigo.value
    }
    if (cbCategoria.value != '') {
        params += '&categoria=' + cbCategoria.value
    }
    if (descricao.value != '') {
        params += '&descricao=' + descricao.value
    }
    if (preco.value != '') {
        params += '&preco=' + preco.value.replace(".", "").replace(",", ".")
    }
    if (imagem.value != '') {
        params += '&imagem=' + imagem.value
    }
    if (peso.value != '') {
        params += '&peso=' + peso.value
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

document.getElementById('btnAlteraProduto').addEventListener('click', () => {
    event.preventDefault()
    let id = document.getElementById('idAlteracao')
    let codigo = document.getElementById('codigoAlteracao')
    let nome = document.getElementById('nomeAlteracao')
    let descricao = document.getElementById('descricaoAlteracao')
    let preco = document.getElementById('precoAlteracao')
    let imagem = document.getElementById('imagemAlteracao')
    let peso = document.getElementById('pesoAlteracao')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=alterar"
    let params = ""

    if (id.value != '') {
        params += '&id=' + id.value
    }
    if (nome.value != '') {
        params += '&nome=' + nome.value
    }
    if (codigo.value != '') {
        params += '&codigo=' + codigo.value
    }
    if (descricao.value != '') {
        params += '&descricao=' + descricao.value
    }
    if (preco.value != '') {
        params += '&preco=' + preco.value.replace(".", "").replace(",", ".")
    }
    if (imagem.value != '') {
        params += '&imagem=' + imagem.value
    }
    if (peso.value != '') {
        params += '&peso=' + peso.value
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
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
})

document.getElementById('btnAlterarCategoria').addEventListener('click', () => {
    event.preventDefault()

    let id = document.getElementById('idAlteraCategoria')
    let nome = document.getElementById('nomeAlteraCategoria')
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=alterar"
    let params = ""
    if (id.value != '') {
        params += '&id=' + id.value
    }
    if (nome.value != '') {
        params += '&nome=' + nome.value
    }
    console.log(params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
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

document.getElementById('cadastrarCategorias').addEventListener('click', () => {
    event.preventDefault()
    limparTabelas()
    esconderTabelas()
    document.getElementById('cadastro-categoria').style.display = 'flex'
})

document.getElementById('cadastrarProdutos').addEventListener('click', () => {
    event.preventDefault()
    document.getElementById('cbCategoria').innerText = ''
    carregarCbCategoria('cbCategoria')
    limparTabelas()
    esconderTabelas()
    document.getElementById('cadastro-produto').style.display = 'flex'
})

function alterarProdutos(e) {
    esconderTabelas()
    document.getElementById('altera-produto').style.display = 'flex'
    document.getElementById('idAlteracao').value = e.id
    document.getElementById('codigoAlteracao').value = e.codigo
    document.getElementById('nomeAlteracao').value = e.nome
    document.getElementById('descricaoAlteracao').value = e.descricao
    document.getElementById('precoAlteracao').value = e.preco
    document.getElementById('imagemAlteracao').value = e.imagem
    document.getElementById('pesoAlteracao').value = e.peso
}

function alterarCategorias(e) {
    esconderTabelas()
    document.getElementById('altera-categoria').style.display = 'flex'
    document.getElementById('idAlteraCategoria').value = e.id
    document.getElementById('nomeAlteraCategoria').value = e.nome
}

function excluirProdutos(id) {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=remover"
    let params = ""
    if (id.value != '') {
        params += '&id=' + id
    }
    console.log(params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            alert("Produto removido com sucesso!")
            location.reload()
        }
        else {
            alert("Requisição errada")
        }
    }
}

function excluirCategorias(id) {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    let params = ""
    if (id != '') {
        params += '&categoria=' + id
    }
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado)
            if (resultado.length == 0) {
                url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=remover"
                params += '&id=' + id
                console.log(url + params)
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

                    }
                }
            }
            else {
                alert("Só é possivel remover categorias quando não há produtos!")
            }
        }
        else {
            alert("Requisição errada")
        }
    }
}

document.getElementById('listarPedidos').addEventListener('click', () => {
    event.preventDefault()
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=pedido&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            var listaPedidos = request.response.dados
            var tabelaPedidos = document.getElementById('tabelaPedidos')

            limparTabelas()
            esconderTabelas()

            let tr = document.createElement('tr')
            let th = document.createElement('th')

            tabelaPedidos.appendChild(tr)
            th.innerText = 'Id'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Data'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Nome'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Cpf'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Cep'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Rua'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Numero'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Complemento'
            tr.appendChild(th)
            th = document.createElement('th')
            th.innerText = 'Bairro'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Cidade'
            tr.appendChild(th)

            th = document.createElement('th')
            th.innerText = 'Uf'
            tr.appendChild(th)

            listaPedidos.forEach(e => {
                console.log(JSON.stringify(e.imagem))
                tr = document.createElement('tr')
                tabelaPedidos.appendChild(tr)
                let td = document.createElement('td')
                td.innerText = e.id
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.time
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.nome
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.cpf
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.cep
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.rua
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.numero
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.complemento
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.bairro
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.cidade
                tr.appendChild(td)

                td = document.createElement('td')
                td.innerText = e.uf
                tr.appendChild(td)


                let btn = document.createElement('button')
                btn.setAttribute("id", 'teste')
                btn.setAttribute("class", 'btn-tabela')
                btn.setAttribute('onclick', "excluirPedido(" + e.id + ')')

                img = document.createElement('img')
                img.setAttribute("src", "/bootstrap-icons-1.8.3/x-square-fill.svg")
                img.setAttribute("width", '15')
                img.setAttribute("color", 'red')

                btn.appendChild(img)
                tr.appendChild(btn)
            })
            document.getElementById('lista-pedido').style.display = "flex"
        }
    }
})

function excluirPedido(id) {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=item&t=listar"
    let params = ""
    if (id != '') {
        params += '&id=' + id
    }
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados
            console.log(resultado)
            removerItem()
            function removerItem() {
                if (resultado.length == 0) {
                    removerPedido()
                    return
                }
                url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=item&t=remover"
                params += '&id=' + resultado[0].id
                console.log(url + params)
                request.open('POST', url);
                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                request.responseType = 'json';
                request.send(params)
                request.onload = function () {
                    if (request.readyState == 4 && request.status == 200) {
                    console.log('removeuitem')
                    console.log(resultado.length)
                    excluirPedido()
                    }
                }
            }

            function removerPedido() {
                url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=pedido&t=remover"
                params += '&id=' + id
                console.log(url + params)
                request.open('POST', url);
                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                request.responseType = 'json';
                request.send(params)
                request.onload = function () {
                    alert('Pedido removido com sucesso!')
                    location.reload()
                }
            }
        }
    }
}
function carregarCbCategoria(id) {
    url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            let cbCategoria = document.getElementById(id)
            listaCategorias.forEach(e => {
                let opt = document.createElement('option')
                opt.value = e.id
                opt.text = e.nome
                cbCategoria.appendChild(opt)
            })
        }
    }
}

function limparTabelas() {
    tabelaCategorias.innerText = ''
    tabelaProdutos.innerText = ''
    tabelaPedidos.innerText = ''
}

function esconderTabelas() {
    document.getElementById('cadastro-produto').style.display = "none"
    document.getElementById('lista-categoria').style.display = "none"
    document.getElementById('lista-produto').style.display = "none"
    document.getElementById('cadastro-categoria').style.display = "none"
    document.getElementById('altera-produto').style.display = 'none'
    document.getElementById('altera-categoria').style.display = 'none'
    document.getElementById('lista-pedido').style.display = 'none'
}