const mongoose = require("mongoose")

const Ordem = mongoose.model("Ordem",{
    status:             String,
    valor_total: Number,
    produtos:       [
                        {
                            produto:    {
                                            type: mongoose.Schema.Types.ObjectId,
                                            ref:'Produto',
                                            required:true
                                        },
                            quantidade: Number,
                            flags:      [
                                            {
                                                nome:String,
                                                acao:Number
                                            }
                                        ]
                    }
                    ],
    caixas:         [
                        {
                            caixa:      {
                                            type: mongoose.Schema.Types.ObjectId,
                                            ref:'Caixa',
                                            required:true
                                        },
                            quantidade: Number,
                            flags:      [
                                            {
                                                nome:String,
                                                acao:Number
                                            }
                                        ]
                        }
                    ],
    data_pagamento: Date,
    desconto:       Number
})

module.exports = Ordem