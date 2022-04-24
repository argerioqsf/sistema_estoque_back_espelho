const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')
const authMiddleware = require('../middlewares/auth')

router.post("/", usuarioController.cadastrar)
router.get("/", authMiddleware, usuarioController.listar)
// router.get("/:id", authMiddleware, usuarioController.listar_info)
router.get("/info", authMiddleware, usuarioController.listar_info_token)
router.put("/:id", usuarioController.editar)
router.post("/login", usuarioController.login)
router.delete("/:id", authMiddleware, usuarioController.deletar)

module.exports = router
