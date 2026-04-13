import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"


if(!localStorage.getItem("usuarioLogado")){

window.location.href="login.html"

}


const firebaseConfig = {

apiKey: "AIzaSyAput2s06y-tekou5C9Kokw8t12ttLn9N0",

authDomain: "sistema-domestico.firebaseapp.com",

projectId: "sistema-domestico",

storageBucket: "sistema-domestico.appspot.com",

messagingSenderId: "468107360134",

appId: "1:468107360134:web:3c2183422d3dc44ed55e07"

}


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)


const lista = document.getElementById("listaProdutos")


async function carregarProdutos(){

lista.innerHTML=""

const querySnapshot = await getDocs(collection(db,"produtos"))

querySnapshot.forEach((docItem)=>{

const data = docItem.data()

const li = document.createElement("li")

li.innerHTML = data.nome + " - " + data.quantidade +

" <button onclick='removerProduto(\""+docItem.id+"\")'>Remover</button>"

lista.appendChild(li)

})

}


window.adicionarProduto = async function(){

const nome = document.getElementById("produtoNome").value

const qtd = parseInt(document.getElementById("produtoQtd").value)


await addDoc(collection(db,"produtos"),{

nome:nome,

quantidade:qtd

})


carregarProdutos()

}


window.removerProduto = async function(id){

await deleteDoc(doc(db,"produtos",id))

carregarProdutos()

}


window.logout = function(){

localStorage.removeItem("usuarioLogado")

window.location.href="login.html"

}


carregarProdutos()
