const mongoose = require("mongoose")

const Unidade = mongoose.model("Unidade",{
    nome:          String,
    responsavel:   {
		type: mongoose.Schema.Types.ObjectId,
		ref:'Usuario',
		required:true
	},
    endereco:      String
})

module.exports = Unidade