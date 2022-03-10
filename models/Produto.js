const mongoose = require("mongoose")

const Produto = mongoose.model("Produto",{
    nome:           String,
    quantidade:     Number,
    valor:          Number,
    validade:       Date,
    estoque:        Boolean,
    image:          String,
    unidade:        {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:'Unidade',
                        required:true
                    },
    fornecedor:     {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:'Fornecedor',
                        required:true
                    },
    produto_caixa:  Boolean,
    codigo_produto: String,
    flags:          [
                        {
                            nome:String,
                            acao:Number
                        }
                    ]
})

module.exports = Produto