const router = require('express').Router()
const fornecedorController = require('../controllers/FornecedorController')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, fornecedorController.cadastrar)
router.get("/", authMiddleware, fornecedorController.listar)
router.get("/:id", authMiddleware, fornecedorController.listar_info)
router.put("/:id", authMiddleware, fornecedorController.editar)
router.delete("/:id", authMiddleware, fornecedorController.deletar)

module.exports = router
