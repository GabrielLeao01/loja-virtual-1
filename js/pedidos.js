var request = new XMLHttpRequest()
carregarDropDown()

function carregarDropDown() {
    let url = "http://loja.buiar.com/?key=rbqz3d&f=json&c=pedido&t=listar"
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
    request.onload = () => {
        if (request.readyState == 4 && request.status == 200) {
            listaCategorias = request.response.dados
            let cbCategoria = document.getElementById('combo-categoria')
            let opt = document.createElement('option')
            opt.value = ''
            opt.text = 'Todos os Pedidos'
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