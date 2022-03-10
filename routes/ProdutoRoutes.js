const router = require('express').Router()
const produtoController = require('../controllers/ProdutoController')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, produtoController.cadastrar)
router.get("/", authMiddleware, produtoController.listar)
router.get("/:id", authMiddleware, produtoController.listar_info)
router.put("/:id", authMiddleware, produtoController.editar)
router.delete("/:id", authMiddleware, produtoController.deletar)

module.exports = router
