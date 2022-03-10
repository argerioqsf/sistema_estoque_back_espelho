const router = require('express').Router()
const caixaController = require('../controllers/CaixaController')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, caixaController.cadastrar)
router.get("/", authMiddleware, caixaController.listar)
router.get("/:id", authMiddleware, caixaController.listar_info)
router.put("/:id", authMiddleware, caixaController.editar)
router.delete("/:id", authMiddleware, caixaController.deletar)

module.exports = router
