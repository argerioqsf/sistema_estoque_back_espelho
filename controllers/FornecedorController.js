require('dotenv').config()
const Fornecedor = require("../models/Fornecedor")

async function listar (req,res){
    try {
        const fornecedores = await Fornecedor.find()
        return res.status(200).json(fornecedores)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function listar_info (req,res){
    try {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findById(id);
        if (fornecedor) {
            return res.status(200).json({fornecedor})
        }
        else{
            return res.status(404).json({message:"fornecedor não encontrado"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    try {
        const { nome, numero, endereco } = req.body
        
        //testar se os campos estão vindo corretamente
        if (!nome) {
            return res.status(422).json({message:"O campo nome é obrigatório!"})
        }
        
        if (!numero) {
            return res.status(422).json({message:"O campo numero é obrigatório!"})
        }
        
        if (!endereco) {
            return res.status(422).json({message:"O campo endereço é obrigatório!"})
        }
        const fornecedorExiste = await Fornecedor.findOne( { $or:[ {'nome':nome} ] })
        console.log(fornecedorExiste)
        //Verificar se o fornecedor existe
        if (fornecedorExiste) {
            return res.status(422).json({message:"Fornecedor já cadastrado"})
        }

        //Criar o fornecedor no banco de dados
        const fornecedor = new Fornecedor({
            nome,
            numero,
            endereco
        })

        await fornecedor.save()
        return res.status(201).json({message:'fornecedor criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {
    try {
        //Pegar informações do body
        const { id } = req.params;

        //Verificar se a fornecedor existe
        const fornecedorExiste = await Fornecedor.findById(id)
        
        if (fornecedorExiste) {
            let info = req.body;
            await Fornecedor.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Fornecedor editado com sucesso!"});
        }else{
            return res.status(422).json({message:"Fornecedor não encontrado"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function deletar(req,res){
    try {
        const { id } = req.params;
        let fornecedor = await Fornecedor.findById(id);
        if (fornecedor) {
            let fornecedor_deletado = await Fornecedor.findByIdAndDelete(id);
            res.status(200).json({
              message: 'Fornecedor deletado',
              data: fornecedor_deletado
            });
        }else{
            res.status(404).send({
                message:'Fornecedor não encontrado',
            });
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

module.exports = {
    listar:      listar,
    cadastrar:   cadastrar,
    editar:      editar,
    listar_info: listar_info,
    deletar:     deletar
}