require('dotenv').config()
const Permissao = require("../models/Permissao")

async function listar (req,res){
    try {
        const permissoes = await Permissao.find()
        return res.status(200).json(permissoes)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function listar_info (req,res){
    const { id } = req.params;
    try {
        const permissao = await Permissao.findById(id);
        if (permissao) {
            return res.status(200).json({permissao})
        }
        else{
            return res.status(404).json({message:"permissao não encontrada"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    try {
        const { nome, indice } = req.body
        
        //testar se os campos estão vindo corretamente
        if (!nome) {
            return res.status(422).json({message:"O campo nome é obrigatório!"})
        }
        
        if (!indice) {
            return res.status(422).json({message:"O campo ìndice é obrigatório!"})
        }

        const permissaoExiste = await Permissao.findOne( { $or:[ {'nome':nome},{'indice':indice} ] })
        console.log(permissaoExiste)
        //Verificar se a permissao existe
        if (permissaoExiste) {
            return res.status(422).json({message:"Permissão já cadastrada"})
        }

        //Criar a permissao no banco de dados
        const permissao = new Permissao({
            nome,
            indice
        })

        await permissao.save()
        return res.status(201).json({message:'Permissão criada com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {
    try {
        //Pegar informações do body
        const { id } = req.params;

        //Verificar se a permissão existe
        const permissaoExiste = await Permissao.findById(id)
        
        if (permissaoExiste) {
            let info = req.body;
            await Permissao.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Permissão editada com sucesso!"});
        }else{
            return res.status(422).json({message:"Permissão não encontrada"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function deletar(req,res){
    try {
        const { id } = req.params;
        let permissao = await Permissao.findById(id);
        if (permissao) {
            let permissao_deletada = await Permissao.findByIdAndDelete(id);
            res.status(200).json({
              message: 'Permissão deletada',
              data: permissao_deletada
            });
        }else{
            res.status(404).send({
                message:'Permissão não encontrada',
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