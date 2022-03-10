const mongoose = require("mongoose")

const Fornecedor = mongoose.model("Fornecedor",{
    nome:     String,
    numero:   String,
    endereco: String
})

module.exports = Fornecedor