require('dotenv').config()
const Unidade = require("../models/Unidade")

async function listar (req,res){
    try {
        const unidades = await Unidade.find().populate('responsavel')
        return res.status(200).json(unidades)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function listar_info (req,res){
    try {
        const { id } = req.params;
        const unidade = await Unidade.findById(id).populate('responsavel')
        if (unidade) {
            return res.status(200).json({unidade})
        }
        else{
            return res.status(404).json({message:"unidade não encontrada"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    try {
        const { nome, responsavel, endereco } = req.body
        
        //testar se os campos estão vindo corretamente
        if (!nome) {
            return res.status(422).json({message:"O campo nome é obrigatório!"})
        }
        
        if (!responsavel) {
            return res.status(422).json({message:"O campo responsável é obrigatório!"})
        }
        
        if (!endereco) {
            return res.status(422).json({message:"O campo endereço é obrigatório!"})
        }
        const unidadeExiste = await Unidade.findOne( { $or:[ {'nome':nome} ] })
        console.log(unidadeExiste)
        //Verificar se o unidade existe
        if (unidadeExiste) {
            return res.status(422).json({message:"unidade já cadastrada"})
        }

        //Criar o unidade no banco de dados
        const unidade = new Unidade({
            nome,
            responsavel,
            endereco
        })

        await unidade.save()
        return res.status(201).json({message:'unidade criada com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {
    try {
        //Pegar informações do body
        const { id } = req.params;

        //Verificar se a unidade existe
        const unidadeExiste = await Unidade.findById(id)
        
        if (unidadeExiste) {
            let info = req.body;
            await Unidade.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Unidade editada com sucesso!"});
        }else{
            return res.status(422).json({message:"Unidade não encontrada"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function deletar(req,res){
    try {
        const { id } = req.params;
        let unidade = await Unidade.findById(id);
        if (unidade) {
            let unidade_deletado = await Unidade.findByIdAndDelete(id);
            res.status(200).json({
              message: 'Unidade deletada',
              data: unidade_deletado
            });
        }else{
            res.status(404).send({
                message:'Unidade não encontrada',
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