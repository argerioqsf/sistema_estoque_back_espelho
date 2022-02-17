const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')

router.get("/", usuarioController.listar)
router.post("/", usuarioController.cadastrar)
router.post("/login", usuarioController.login)

module.exports = router
