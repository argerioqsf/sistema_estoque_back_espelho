const express          = require("express")
const mongoose         = require("mongoose")
const app              = express()
const cors             = require('cors')
const produtoRoutes    = require("./routes/ProdutoRoutes")
const usuarioRoutes    = require("./routes/UsuarioRoutes")
const permissaoRoutes  = require("./routes/PermissaoRoutes")
const fornecedorRoutes = require("./routes/FornecedorRoutes")
const unidadeRoutes    = require("./routes/UnidadeRoutes")
const caixaRoutes      = require("./routes/CaixaRoutes")
const ordemRoutes      = require("./routes/OrdemRoutes")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

app.use('/produto',    produtoRoutes)
app.use('/usuario',    usuarioRoutes)
app.use('/permissao',  permissaoRoutes)
app.use('/fornecedor', fornecedorRoutes)
app.use('/unidade',    unidadeRoutes)
app.use('/caixa',      caixaRoutes)
app.use('/ordem',      ordemRoutes)

mongoose.connect('mongodb://mongo:27017/sistema_estoque', {useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
  console.log('MongoDB Conectado')
  app.listen('3333')
})
.catch(error => {
  console.log('Erro de connexão com MongoDB:',error)
});