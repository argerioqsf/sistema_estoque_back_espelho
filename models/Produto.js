const mongoose = require("mongoose")

const Produto = mongoose.model("Produto",{
    nome: String,
    quantidade: Number,
    valor: Number,
    validade: Date,
    estoque: Boolean,
    image: String,
    // fornecedor: {
	// 	type: mongoose.Schema.Types.ObjectId,
    //     ref:'Fornecedor',
    //     required:true
    // }
    produto_caixa: Boolean,
    codigo_produto: String,
    flags: [
        {
            nome:String
        }
    ]
})

module.exports = Produto