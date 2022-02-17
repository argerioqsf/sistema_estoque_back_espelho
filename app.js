const express = require("express")
const mongoose = require("mongoose")
const app = express()
const produtoRoutes = require("./routes/ProdutoRoutes")
const usuarioRoutes = require("./routes/UsuarioRoutes")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/produto', produtoRoutes)
app.use('/usuario', usuarioRoutes)

mongoose.connect('mongodb://mongo:27017/sistema_estoque', {useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
  console.log('MongoDB Conectado')
  app.listen('3333')
})
.catch(error => {
  console.log('Erro de connexão com MongoDB:',error)
});