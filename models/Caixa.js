const mongoose = require("mongoose")

const Caixa = mongoose.model("Caixa",{
    nome:             String,
    quantidade_caixa: Number,
    quantidade_item: Number,
    id_produto: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'Produto',
        required:true
    },
    estoque: Boolean,
    codigo_caixa: String,
    imagem_caixa: String,
    valor_caixa: Number
})

module.exports = Caixa