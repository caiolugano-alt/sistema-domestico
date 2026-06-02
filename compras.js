const express = require("express")
const router = express.Router()
const db = require("../database")

/* LISTAR COMPRAS */

router.get("/", (req, res) => {

db.all(`
SELECT compras.*, categorias.nome AS categoria
FROM compras
LEFT JOIN categorias
ON compras.categoria_id = categorias.id
`, [], (err, rows) => {

if(err){
return res.status(500).json(err)
}

res.json(rows)

})

})


/* ADICIONAR COMPRA */

router.post("/", (req, res) => {

const { produto, categoria_id, quantidade, preco } = req.body

db.run(
`INSERT INTO compras(produto,categoria_id,quantidade,preco)
VALUES(?,?,?,?)`,
[produto, categoria_id, quantidade, preco],

function(err){

if(err){
return res.status(500).json(err)
}

res.json({
id:this.lastID,
produto,
categoria_id,
quantidade,
preco
})

}

)

})


/* EXCLUIR COMPRA */

router.delete("/:id", (req, res) => {

const id = req.params.id

db.run("DELETE FROM compras WHERE id=?", [id], function(err){

if(err){
return res.status(500).json(err)
}

res.json({ mensagem:"Compra removida" })

})

})


/* ========================= */
/* IA DE PREVISÃO DE CONSUMO */
/* ========================= */

router.get("/previsao", (req, res) => {

db.all(`
SELECT produto, data
FROM compras
ORDER BY produto, data
`, [], (err, rows) => {

if(err){
return res.status(500).json(err)
}

const produtos = {}

rows.forEach(r => {

if(!produtos[r.produto]){
produtos[r.produto] = []
}

produtos[r.produto].push(new Date(r.data))

})

const previsao = []

for(const produto in produtos){

const datas = produtos[produto]

if(datas.length < 2){

previsao.push({
produto,
mensagem:`${produto} ainda não tem histórico suficiente`
})

continue

}

let soma = 0

for(let i = 1; i < datas.length; i++){

const diff = datas[i] - datas[i-1]

const dias = diff / (1000*60*60*24)

soma += dias

}

const media = soma / (datas.length - 1)

const ultimaCompra = datas[datas.length - 1]

const hoje = new Date()

const diasDesdeUltima = (hoje - ultimaCompra) / (1000*60*60*24)

const diasRestantes = Math.round(media - diasDesdeUltima)

previsao.push({

produto,
mensagem:`${produto} pode acabar em aproximadamente ${diasRestantes} dias`

})

}

res.json(previsao)

})

})
router.get("/relatorio", (req, res) => {

db.all(`
SELECT compras.*, categorias.nome AS categoria
FROM compras
LEFT JOIN categorias
ON compras.categoria_id = categorias.id
ORDER BY compras.id DESC
`, [], (err, rows) => {

if (err) {
return res.status(500).json(err)
}

let total = 0

rows.forEach(item => {
total += Number(item.preco || 0)
})

res.json({
compras: rows,
total: total
})

})

})


module.exports = router
