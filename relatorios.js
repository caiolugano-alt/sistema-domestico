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
console.log(p)

const mes = p.mes || ""
const ano = String(p.ano || "")


const mapaMeses = {
"01": "Janeiro",
"02": "Fevereiro",
"03": "Março",
"04": "Abril",
"05": "Maio",
"06": "Junho",
"07": "Julho",
"08": "Agosto",
"09": "Setembro",
"10": "Outubro",
"11": "Novembro",
"12": "Dezembro"
}

if (
(mesSelecionado === "" || mes === mapaMeses[mesSelecionado]) &&
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
