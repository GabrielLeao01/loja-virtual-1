var request = new XMLHttpRequest()
var carrinho = []
var qtd = 0;
var precoFinal = 0;
carregarDropDown()

function carregarDropDown() {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=categoria&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            let cbCategoria = document.getElementById('combo-categoria')
            let opt = document.createElement('option')
            opt.value = ''
            opt.text = 'Categorias'
            cbCategoria.appendChild(opt)

            listaCategorias.forEach(e => {
                opt = document.createElement('option')
                opt.value = e.id
                opt.text = e.nome
                cbCategoria.appendChild(opt)
            })
        }
    }
}
function listarProdutos(id) {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    let params = '&categoria=' + id
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            let resultado = request.response.dados
            console.log(resultado)
            let card = document.getElementById('card-produtos')
            card.innerText = ''
            let i = 0

            resultado.forEach(e => {
                i++
                let div = document.createElement('div')
                div.setAttribute('class', 'cartprod')
                card.appendChild(div)

                let img = document.createElement('img')
                img.setAttribute('src', e.imagem)
                img.setAttribute("width", "150")
                img.setAttribute('id', e.id)
                img.setAttribute('draggable', 'true')
                img.setAttribute('ondragstart', 'drag(event)')
                img.setAttribute('ondblclick', 'adicionarCarrinho(' + e.id + ')')
                console.log(img)
                div.appendChild(img)

                let divConteudo = document.createElement('div')
                divConteudo.setAttribute('class', 'cartprod-conteudo')
                div.appendChild(divConteudo)

                let span = document.createElement('span')
                span.innerText = 'Nome: ' + e.nome
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Preço: ' + (e.preco * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Peso: ' + e.peso + 'g'
                divConteudo.appendChild(span)

                span = document.createElement('span')
                span.innerText = 'Descrição: ' + e.descricao
                divConteudo.appendChild(span)
            });
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    adicionarCarrinho(data)
}

function adicionarCarrinho(id) {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=produto&t=listar"
    let params = '&id=' + id
    console.log(url + params)
    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.responseType = 'json';
    request.send(params)
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            resultado = request.response.dados[0]

            let key = carrinho.findIndex(item => item.id == resultado.id)
            if (key > -1) {
                carrinho[key].quantidade++
            }
            else {
                let produto = {
                    categoria: resultado.categoria,
                    codigo: resultado.codigo,
                    descricao: resultado.descricao,
                    id: resultado.id,
                    imagem: resultado.imagem,
                    nome: resultado.nome,
                    peso: resultado.peso,
                    preco: resultado.preco,
                    quantidade: 1
                }
                carrinho.push(produto)
            }

            atualizarCarrinho();

            let span = document.getElementById('quantidade-produtos')
            span.innerText = qtd
        }
    }

}
function mostrarCarrinho() {
    document.getElementById('card-finalizar-compra').innerText = ''
    document.getElementById('menu-produtos').style.display = 'none'
    document.getElementById('tituloPagina').innerText = 'Carrinho'
    document.getElementById('quantidade-produtos').innerText = ''
    document.getElementById('menu-carrinho').style.display = 'flex'

    let img = document.getElementById('imagemm')

    img.setAttribute('src', "/bootstrap-icons-1.8.3/shop.svg")
    img.setAttribute('onclick', 'mostrarProdutos()')

    let cardCarrinho = document.getElementById('card-carrinho')
    cardCarrinho.innerText = ''
    console.log(carrinho)
    carrinho.forEach(e => {
        let div = document.createElement('div')
        div.setAttribute('class', 'cartprod')
        cardCarrinho.appendChild(div)

        let img = document.createElement('img')
        img.setAttribute('src', e.imagem)
        img.setAttribute("width", "150")
        img.setAttribute('id', e.id)
        img.setAttribute('draggable', 'true')
        div.appendChild(img)

        let divConteudo = document.createElement('div')
        divConteudo.setAttribute('class', 'cartprod-conteudo')
        div.appendChild(divConteudo)

        let span = document.createElement('span')
        span.innerText = 'Nome: ' + e.nome
        divConteudo.appendChild(span)

        span = document.createElement('span')
        span.innerText = 'Preço: ' + (e.preco * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        divConteudo.appendChild(span)

        span = document.createElement('span')
        span.innerText = 'Peso: ' + e.peso + 'g'
        divConteudo.appendChild(span)
 
        span = document.createElement('span')
        span.innerText = 'Descrição: ' + e.descricao
        divConteudo.appendChild(span)

        span = document.createElement('span')
        let input = document.createElement('input')
        input.setAttribute('class', 'input-quantidade')
        input.setAttribute('type', 'number')
        input.setAttribute('id', 'qtd-carrinho')
        input.setAttribute('value', '' + e.quantidade)
        input.setAttribute('onblur', 'atualizarQuantidade(' + JSON.stringify(e) + ')')

        let label = document.createElement('label')
        label.setAttribute('for', 'qtd-carrinho')
        label.innerText = "Quantidade: "
        
        span.appendChild(label)
        span.appendChild(input)
        divConteudo.appendChild(span)
    });

    let cardFinalizarCompra = document.getElementById('card-finalizar-compra')
    let h2 = document.createElement('h2')
    h2.innerText = 'SubTotal'
    cardFinalizarCompra.appendChild(h2)

    let span = document.createElement('span')
    span.setAttribute('id', 'quantidade-total')
    span.innerText = 'Quantidade de itens: ' + qtd
    cardFinalizarCompra.appendChild(span)

    span = document.createElement('span')
    span.setAttribute('id', 'preco-total')
    span.innerText = 'Preço total: ' + (precoFinal * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    cardFinalizarCompra.appendChild(span)

}

function mostrarProdutos() {
    document.getElementById('menu-produtos').style.display = 'block'
    document.getElementById('tituloPagina').innerText = 'Produtos'
    document.getElementById('quantidade-produtos').innerText = qtd
    document.getElementById('menu-carrinho').style.display = 'none'
    atualizarCarrinho()
    document.getElementById('quantidade-produtos').innerText = qtd
    let img = document.getElementById('imagemm')
    img.setAttribute('src', "/bootstrap-icons-1.8.3/cart4.svg")
    img.setAttribute('onclick', 'mostrarCarrinho()')

}

function atualizarQuantidade(e) {
    let key = carrinho.findIndex(item => item.id == e.id)
    if (key > -1) {
        carrinho[key].quantidade = document.getElementById('qtd-carrinho').value
    }
    atualizarCarrinho()
    document.getElementById('quantidade-total').innerText = 'Quantidade de itens: ' + qtd
    document.getElementById('preco-total').innerText = 'Preço Total: ' + (precoFinal * 1).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

function atualizarCarrinho() {
    qtd = 0
    precoFinal = 0;
    for (let i = 0; i < carrinho.length; i++) {
        qtd += (carrinho[i].quantidade * 1)
        precoFinal += (carrinho[i].quantidade * carrinho[i].preco)
    }

}