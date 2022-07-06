var request = new XMLHttpRequest()
carregarDropDown()

function carregarDropDown() {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=pedido&t=listar"

    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            let listaPedidos = request.response.dados
            console.log(listaPedidos)
            let cbCategoria = document.getElementById('combo-id-pedido')
            let opt = document.createElement('option')
            opt.value = '0'
            opt.text = 'Todos os Pedidos'
            cbCategoria.appendChild(opt)

            listaPedidos.forEach(e => {
                opt = document.createElement('option')
                opt.value = e.id
                opt.text = e.id + ' - ' + e.nome
                cbCategoria.appendChild(opt)
            })
        }
    }
}
function listarPedido(id) {
    document.getElementById('card-pedidos').style.display = 'grid'
    document.getElementById('card-detalhes').style.display = 'none'
    document.getElementById('card-pedidos').innerText = ''
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=pedido&t=listar"
    let params = ''
    if (id != 0) {
        params = '&id=' + id
    }
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            let resultado = request.response.dados
            console.log(resultado)
            let card = document.getElementById('card-pedidos')
            card.innerText = ''

            resultado.forEach(e => {

                let divCol = document.createElement('div')
                divCol.setAttribute('class', 'col-12')
                card.appendChild(divCol)

                let divConteudo = document.createElement('div')
                divConteudo.setAttribute('class', 'card-pedido-conteudo')
                divCol.appendChild(divConteudo)

                let span = document.createElement('span')
                span.innerText = 'ID: ' + e.id
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Nome: ' + e.nome
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Cep: ' + e.cep
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Rua: ' + e.rua
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Número: ' + e.numero
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Complemento: ' + e.complemento
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Cidade: ' + e.complemento
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Uf: ' + e.uf
                divConteudo.appendChild(span)

                let button = document.createElement('button')
                button.setAttribute('onclick', 'gerarBoleto(' + e.id + ')')
                button.setAttribute('class', 'btn btn-secondary')
                button.innerText = 'Gerar Boleto'
                divConteudo.appendChild(button)

                button = document.createElement('button')
                button.setAttribute('class', 'btn btn-secondary')
                button.setAttribute('onclick', 'exibirDetalhesPedido(' + e.id + ')')
                button.innerText = 'Exibir Detalhes do pedido'
                divConteudo.appendChild(button)

                card.appendChild(divCol)

            });
        }
    }
}

function gerarBoleto(id) {
    window.open("http://loja.buiar.com/?key=aula&c=boleto&t=listar&id=" + id)
}

function exibirDetalhesPedido(id) {
    document.getElementById('card-pedidos').style.display = 'none'
    document.getElementById('card-detalhes').style.display = 'grid'

    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=item&t=listar"
    let params = ''
    params = '&id=' + id
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            let resultado = request.response.dados
            console.log(resultado)
            let card = document.getElementById('card-detalhes')
            card.innerText = ''
            let i = 0;
            listarDetalhes()
            function listarDetalhes() {
                if (i >= resultado.lenght) {
                    return;
                }
                else {
                    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
                    let params = ''
                    params = '&id=' + resultado[i].produto
                    console.log(url + params)
                    request.open('POST', url);
                    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                    request.responseType = 'json';
                    request.send(params)
                    request.onload = () => {

                        let produto = request.response.dados
                        console.log(produto)

                        let divCol = document.createElement('div')
                        divCol.setAttribute('class', 'col-12')
                        card.appendChild(divCol)

                        let divConteudo = document.createElement('div')
                        divConteudo.setAttribute('class', 'card-pedido-conteudo')
                        divCol.appendChild(divConteudo)

                        let span = document.createElement('span')
                        span.innerText = 'ID: ' + resultado[i].id
                        divConteudo.appendChild(span)

                        span = document.createElement('span')
                        span.innerText = 'Pedido: ' + resultado[i].pedido
                        divConteudo.appendChild(span)

                        span = document.createElement('span')
                        span.innerText = 'Produto: ' + produto[0].nome
                        divConteudo.appendChild(span)

                        span = document.createElement('span')
                        span.innerText = 'Preço: ' + (produto[0].preco * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                        divConteudo.appendChild(span)

                        span = document.createElement('span')
                        span.innerText = 'Quantidade: ' + resultado[i].qtd * 1
                        divConteudo.appendChild(span)

                        card.appendChild(divCol)
                        i++
                        listarDetalhes()
                    }
                }
            };
        }
    }
}
