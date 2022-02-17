const router = require('express').Router()
const produtoControler = require('../controllers/ProdutoController')

router.get("/", produtoControler.listar)

router.post("/", produtoControler.cadastrar)

router.get("/:id", produtoControler.listar_um)

module.exports = router
