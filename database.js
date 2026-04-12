const sqlite3 = require("sqlite3").verbose()

// conexão com banco
const db = new sqlite3.Database("./compras.db", (err)=>{

if(err){
console.log("Erro ao conectar banco:",err)
}else{
console.log("Banco conectado com sucesso")
}

})

// tabela categorias
db.run(`
CREATE TABLE IF NOT EXISTS categorias(

id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL

)
`)

// tabela compras com histórico
db.run(`
CREATE TABLE IF NOT EXISTS compras(

id INTEGER PRIMARY KEY AUTOINCREMENT,
produto TEXT NOT NULL,
categoria_id INTEGER,
quantidade INTEGER,
preco REAL,
data DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(categoria_id) REFERENCES categorias(id)

)
`)

// categorias padrão
db.run(`
INSERT OR IGNORE INTO categorias(id,nome) VALUES
(1,'Alimentos'),
(2,'Limpeza'),
(3,'Higiene'),
(4,'Bebidas'),
(5,'Outros')
`)

module.exports = db
