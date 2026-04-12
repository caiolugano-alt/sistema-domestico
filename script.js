async function adicionarCompra(){

const produto = document.getElementById("produto").value
const quantidade = document.getElementById("quantidade").value
const preco = document.getElementById("preco").value

await fetch("http://localhost:3000/compras",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
produto,
quantidade,
preco
})
})

document.getElementById("produto").value = ""
document.getElementById("quantidade").value = ""
document.getElementById("preco").value = ""

carregarCompras()

}

async function carregarCompras(){

const resposta = await fetch("http://localhost:3000/compras")
const compras = await resposta.json()

const lista = document.getElementById("lista")
lista.innerHTML = ""

let total = 0

compras.forEach(compra => {

const item = document.createElement("li")

item.innerHTML =
`${compra.produto} - Quantidade: ${compra.quantidade} - R$ ${compra.preco}
<button onclick="removerCompra(${compra.id})">❌</button>`

lista.appendChild(item)

total += parseFloat(compra.preco) * parseInt(compra.quantidade)

})

document.getElementById("total").innerText =
"Total: R$ " + total.toFixed(2)

}

async function removerCompra(id){

await fetch("http://localhost:3000/compras/" + id,{
method:"DELETE"
})

carregarCompras()

}

carregarCompras()