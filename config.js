const SISTEMA = {

nome: "Sistema Doméstico",

versao: "1.1.0",

autor: "Caio Almeida",

ano: "2026"
}    
const firebaseConfig = {

apiKey: "AIzaSyAput2s06y-tekou5C9Kokw8t12ttLn9N0",
  authDomain: "sistema-domestico.firebaseapp.com",
  projectId: "sistema-domestico",
  storageBucket: "sistema-domestico.firebasestorage.app",
  messagingSenderId: "468107360134",
  appId: "1:468107360134:web:3c2183422d3dc44ed55e07",
  measurementId: "G-XEDS2JJX6J"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
