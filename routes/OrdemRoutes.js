const router = require('express').Router()
const ordemController = require('../controllers/OrdemController')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, ordemController.cadastrar)
router.get("/", authMiddleware, ordemController.listar)
router.get("/:id", authMiddleware, ordemController.listar_info)
// router.put("/:id", authMiddleware, ordemController.editar)
// router.delete("/:id", authMiddleware, ordemController.deletar)

module.exports = router
