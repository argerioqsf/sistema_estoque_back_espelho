const mongoose = require("mongoose")

const Permissao = mongoose.model("Permissao",{
    nome:   String,
    indice: Number
})

module.exports = Permissao