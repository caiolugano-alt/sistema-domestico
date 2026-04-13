// ===============================
// VERSÃO DO SISTEMA
// ===============================

document.getElementById("versaoSistema").innerText =
`${SISTEMA.nome} - Versão ${SISTEMA.versao} | ${SISTEMA.autor}`


// ===============================
// FIREBASE
// ===============================

const db = firebase.firestore()

const tabela = document.getElementById("tabelaProdutos")


// ===============================
// CARREGAR PRODUTOS
// ===============================

function carregarProdutos(){

tabela.innerHTML = ""

db.collection("produtos").onSnapshot(snapshot => {

let totalProdutos = 0
let totalEstoque = 0

tabela.innerHTML = ""

snapshot.forEach(doc => {

const produto = doc.data()
const id = doc.id

totalProdutos++

let alerta = "OK"

if(produto.quantidade <= 3){

alerta = "⚠ Estoque baixo"

}

let linha = `
<tr>

<td>${produto.nome}</td>

<td>${produto.quantidade}</td>

<td>${produto.preco}</td>

<td>estoque</td>

<td>${alerta}</td>

<td>
<button onclick="removerProduto('${id}')">
Remover
</button>
</td>

</tr>
`

tabela.innerHTML += linha

})

document.getElementById("totalProdutos").innerText = totalProdutos

})

}

carregarProdutos()


// ===============================
// ADICIONAR PRODUTO
// ===============================

function abrirAdicionar(){

let nome = prompt("Nome do produto")
let quantidade = prompt("Quantidade")
let preco = prompt("Preço")

if(!nome) return

db.collection("produtos").add({

nome: nome,
quantidade: Number(quantidade),
preco: Number(preco)

})

}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerProduto(id){

db.collection("produtos").doc(id).delete()

}


// ===============================
// EXPORTAR EXCEL
// ===============================

function exportarExcel(){

alert("Exportação Excel em desenvolvimento")

}


// ===============================
// BOTÃO SAIR
// ===============================

function sairSistema(){

localStorage.removeItem("logado")

window.location.href = "login.html"

}
