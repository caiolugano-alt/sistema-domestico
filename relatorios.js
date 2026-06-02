async function carregarRelatorio() {

try {

const resposta = await fetch("/compras/relatorio")

const dados = await resposta.json()

const tabela = document.getElementById("tabelaRelatorio")

tabela.innerHTML = ""

dados.compras.forEach(compra => {

tabela.innerHTML += `
<tr>
<td>${compra.produto}</td>
<td>${compra.categoria || "-"}</td>
<td>${compra.quantidade}</td>
<td>R$ ${Number(compra.preco).toFixed(2)}</td>
</tr>
`
})

document.getElementById("totalGeral").innerHTML =
`TOTAL GERAL: R$ ${dados.total.toFixed(2)}`

} catch (erro) {

console.error(erro)

document.getElementById("totalGeral").innerHTML =
"Erro ao carregar relatório"

}

}

carregarRelatorio()
