
function botao() {
    const url = "http://loja.buiar.com/?key=rbqz3d&c=categoria&t=listar&f=json" 
    fetch(url).then(response => response.json()).then(listar => console.log(listar))
}
