if(!localStorage.getItem("logado")){
window.location.href = "login.html"
}

document.getElementById("infoSistema").innerText =
SISTEMA.nome + " - Versão " + SISTEMA.versao + " | " + SISTEMA.autor

let produtos = JSON.parse(localStorage.getItem("produtos")) || []

let mesAtualSistema = new Date().getMonth()
let mesSalvo = localStorage.getItem("mesAtual")

if(mesSalvo == null){

localStorage.setItem("mesAtual",mesAtualSistema)

}else if(Number(mesSalvo) !== mesAtualSistema){

gerarRelatorioMensal()

localStorage.setItem("mesAtual",mesAtualSistema)

}

function adicionarProduto(){

let produto = {

nome:"Novo Produto",
quantidade:1,
preco:0,
situacao:"estoque",
data: new Date().toISOString()


}

produtos.push(produto)

salvar()

renderizar()

}

function renderizar(){

let tabela = document.getElementById("listaProdutos")

tabela.innerHTML=""

produtos.forEach((produto,index)=>{

let alerta="OK"

if(produto.quantidade <=2){

alerta="⚠ Estoque baixo"

}

let classe = alerta.includes("⚠") ? "alerta" : ""

let linha = `

<tr>

<td contenteditable="true" oninput="editar(${index},'nome',this.innerText)">
${produto.nome}
</td>

<td contenteditable="true" oninput="editar(${index},'quantidade',this.innerText)">
${produto.quantidade}
</td>

<td contenteditable="true" oninput="editar(${index},'preco',this.innerText)">
${produto.preco}
</td>

<td contenteditable="true" oninput="editar(${index},'situacao',this.innerText)">
${produto.situacao}
</td>

<td class="${classe}">
${alerta}
</td>

<td>
<button onclick="remover(${index})">Remover</button>
</td>

</tr>

`

tabela.innerHTML += linha

})

atualizarDashboard()

}

function editar(index,campo,valor){

produtos[index][campo] = valor

salvar()

}

function remover(index){

produtos.splice(index,1)

salvar()

renderizar()

}

function salvar(){

localStorage.setItem("produtos",JSON.stringify(produtos))

}

function atualizarDashboard(){

let totalEstoque = 0
let totalGastos = 0

produtos.forEach(p=>{

if(p.situacao === "estoque"){
totalEstoque += Number(p.preco)
}

if(p.situacao === "gasto"){
totalGastos += Number(p.preco)
}

})

document.getElementById("totalEstoque").innerText = "R$ "+totalEstoque
document.getElementById("totalGastos").innerText = "R$ "+totalGastos
document.getElementById("totalProdutos").innerText = produtos.length

}

function exportarExcel(){

let dados = "Produto,Quantidade,Preço,Situação\n"

produtos.forEach(p=>{

dados += `${p.nome},${p.quantidade},${p.preco},${p.situacao}\n`

})

let blob = new Blob([dados],{type:"text/csv"})

let link = document.createElement("a")

link.href = URL.createObjectURL(blob)

link.download = "relatorio.csv"

link.click()

}

function gerarRelatorioMensal(){

let relatorios = JSON.parse(localStorage.getItem("relatorios")) || []

let totalGastos = 0

produtos.forEach(p=>{

if(p.situacao === "gasto"){
totalGastos += Number(p.preco)
}

})

let data = new Date()

let relatorio = {

mes:data.getMonth()+1,
ano:data.getFullYear(),
totalGastos,
produtos

}

relatorios.push(relatorio)

localStorage.setItem("relatorios",JSON.stringify(relatorios))

alert("Relatório mensal gerado!")

}

renderizar()
