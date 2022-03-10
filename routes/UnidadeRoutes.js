const router = require('express').Router()
const unidadeController = require('../controllers/UnidadeController')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, unidadeController.cadastrar)
router.get("/", authMiddleware, unidadeController.listar)
router.get("/:id", authMiddleware, unidadeController.listar_info)
router.put("/:id", authMiddleware, unidadeController.editar)
router.delete("/:id", authMiddleware, unidadeController.deletar)

module.exports = router
