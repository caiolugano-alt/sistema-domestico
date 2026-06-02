async function carregarRelatorio() {

try {

const tabela = document.getElementById("tabelaRelatorio")
tabela.innerHTML = ""

let total = 0

const mesSelecionado =
document.getElementById("filtroMes").value

const anoSelecionado =
document.getElementById("filtroAno").value

const snapshot =
await db.collection("produtos").get()

snapshot.forEach(doc => {

const p = doc.data()

if (!p.data) return

const data = new Date(p.data)

const mes = String(data.getMonth() + 1)
.padStart(2, "0")

const ano = String(data.getFullYear())

if (
(mesSelecionado === "" || mes === mesSelecionado) &&
(anoSelecionado === "" || ano === anoSelecionado)
) {

total += Number(p.preco || 0)

tabela.innerHTML += `
<tr>
<td>${p.nome || ""}</td>
<td>-</td>
<td>${p.qtd || p.quantidade || 0}</td>
<td>R$ ${Number(p.preco || 0).toFixed(2)}</td>
</tr>
`
}

})

document.getElementById("totalGeral").innerHTML =
"TOTAL GERAL: R$ " + total.toFixed(2)

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
