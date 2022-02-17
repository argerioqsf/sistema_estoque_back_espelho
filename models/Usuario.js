const mongoose = require("mongoose")

const Usuario = mongoose.model("Usuario",{
    nome: String,
    email: String,
    // permissoes: [
    //     {
    //         info_permissao:{
    //             type: mongoose.Schema.Types.ObjectId,
	// 			ref:'Permissao',
	// 			required:true
    //         }
    //     }
    // ],
    senha: String,
    token_auth: String
})

module.exports = Usuario