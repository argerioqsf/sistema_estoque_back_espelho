const router = require('express').Router()
const permissaoController = require('../controllers/PermissaoController')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, permissaoController.cadastrar)
router.get("/", authMiddleware, permissaoController.listar)
router.get("/:id", authMiddleware, permissaoController.listar_info)
router.put("/:id", authMiddleware, permissaoController.editar)
router.delete("/:id", authMiddleware, permissaoController.deletar)

module.exports = router
