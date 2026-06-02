async function carregarRelatorio() {

try {

const tabela = document.getElementById("tabelaRelatorio")

tabela.innerHTML = ""

let total = 0

const snapshot = await db.collection("produtos").get()

snapshot.forEach(doc => {

const p = doc.data()

total += Number(p.preco || 0)

tabela.innerHTML += `
<tr>
<td>${p.nome}</td>
<td>-</td>
<td>${p.qtd}</td>
<td>R$ ${Number(p.preco).toFixed(2)}</td>
</tr>
`
})

document.getElementById("totalGeral").innerHTML =
"Total Geral: R$ " + total.toFixed(2)

} catch (erro) {

console.error(erro)

document.getElementById("totalGeral").innerHTML =
"Erro ao carregar relatório"
}
}

carregarRelatorio()

function gerarPDF() {
window.print()
}
