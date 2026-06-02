// =============================
// CONFIGURAÇÃO FIREBASE
// =============================

const firebaseConfig = {

apiKey: "AIzaSyAput2s06y-tekou5C9Kokw8t12ttLn9N0",
  authDomain: "sistema-domestico.firebaseapp.com",
  projectId: "sistema-domestico",
  storageBucket: "sistema-domestico.firebasestorage.app",
  messagingSenderId: "468107360134",
  appId: "1:468107360134:web:3c2183422d3dc44ed55e07",
  measurementId: "G-XEDS2JJX6J"

}

// iniciar firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

// =============================
// VERSÃO DO SISTEMA
// =============================

const VERSAO_SISTEMA = "1.2.1"

document.getElementById("versao").innerText = VERSAO_SISTEMA

// =============================
// MESES AUTOMÁTICOS
// =============================

const meses = [

"Janeiro","Fevereiro","Março","Abril","Maio","Junho",

"Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"

]

const hoje = new Date()

const mesAtual = meses[hoje.getMonth()]

const anoAtual = hoje.getFullYear()

document.getElementById("mesAtual").innerText = mesAtual + " " + anoAtual

// =============================
// LOGIN
// =============================

if(localStorage.getItem("logado")!="sim"){

window.location="login.html"

}

// =============================
// BOTÃO SAIR
// =============================

function sair(){

localStorage.removeItem("logado")

window.location="login.html"

}

// =============================
// IA DE ESTOQUE
// =============================

function IA(qtd){

if(qtd <= 2){

return "⚠️ Vai acabar"

}

if(qtd <= 5){

return "⚠️ Estoque baixo"

}

return "Estoque OK"

}

// =============================
// ADICIONAR PRODUTO
// =============================

function addProduto(){

const nome = prompt("Produto")

const qtd = Number(prompt("Quantidade"))

const preco = Number(prompt("Preço"))

db.collection("produtos").add({

nome,
qtd,
preco,
mes: mesAtual,
ano: anoAtual

})

}

// =============================
// LISTAR PRODUTOS
// =============================

db.collection("produtos")

.where("mes","==",mesAtual)

.onSnapshot(snapshot => {

const tabela = document.getElementById("tabela")

tabela.innerHTML = ""

let total = 0
let contador = 0

snapshot.forEach(doc => {

const p = doc.data()

contador++

total += p.preco

tabela.innerHTML += `

<tr>

<td>${p.nome}</td>
<td>${p.qtd}</td>
<td>R$ ${p.preco}</td>
<td>${p.qtd <= 2 ? "Baixo" : "Normal"}</td>
<td>${IA(p.qtd)}</td>

<td>

<button onclick="remover('${doc.id}')">Remover</button>

</td>

</tr>

`

})

document.getElementById("totalProdutos").innerText = contador

document.getElementById("gastos").innerText = "R$ " + total

document.getElementById("estoque").innerText = "R$ " + total

})

// =============================
// REMOVER PRODUTO
// =============================

function remover(id){

db.collection("produtos").doc(id).delete()

}

// =============================
// GERAR PDF
// =============================

function gerarPDF(){

const { jsPDF } = window.jspdf

const doc = new jsPDF()

doc.text("Relatório Sistema Doméstico",20,20)

doc.text("Mês: " + mesAtual + " " + anoAtual,20,30)

doc.save("relatorio_domestico.pdf")

}

// =============================
// EXPORTAR EXCEL
// =============================

function exportarExcel(){

let csv = "Produto,Quantidade,Preço\n"

document.querySelectorAll("#tabela tr").forEach(tr => {

const col = tr.querySelectorAll("td")

if(col.length){

csv += `${col[0].innerText},${col[1].innerText},${col[2].innerText}\n`

}

})

const blob = new Blob([csv])

const a = document.createElement("a")

a.href = URL.createObjectURL(blob)

a.download = "relatorio_produtos.csv"

a.click()

}
