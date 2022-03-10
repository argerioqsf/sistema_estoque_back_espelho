require('dotenv').config()
const Caixa = require("../models/Caixa")
const Produto = require('../models/Produto')

async function listar (req,res){
    try {
        const caixas = await Caixa.find().populate('id_produto')
        return res.status(200).json(caixas)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function listar_info (req,res){
    const { id } = req.params;
    try {
        const caixa = await Caixa.findById(id).populate('id_produto');
        if (caixa) {
            return res.status(200).json({caixa})
        }
        else{
            return res.status(404).json({message:"caixa não encontrada"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    try {
        const {
            nome,
            quantidade_caixa,
            quantidade_item,
            id_produto,
            estoque,
            codigo_caixa,
            imagem_caixa,
            valor_caixa
        } = req.body
        
        //testar se os campos estão vindo corretamente
        if (!nome) {
            return res.status(422).json({message:"O campo nome é obrigatório!"})
        }

        if (!quantidade_caixa) {
            return res.status(422).json({message:"O campo quantidade_caixa é obrigatório!"})
        }
        
        if (!quantidade_item) {
            return res.status(422).json({message:"O campo quantidade_item é obrigatório!"})
        }
        
        if (!id_produto) {
            return res.status(422).json({message:"O campo id_produto é obrigatório!"})
        }
        
        if (!estoque && estoque != false) {
            return res.status(422).json({message:"O campo estoque é obrigatório!"})
        }
        
        if (!codigo_caixa) {
            return res.status(422).json({message:"O campo codigo_caixa é obrigatório!"})
        }
        
        if (!imagem_caixa) {
            return res.status(422).json({message:"O campo imagem_caixa é obrigatório!"})
        }
        
        if (!valor_caixa) {
            return res.status(422).json({message:"O campo valor_caixa é obrigatório!"})
        }

        //Verificar se o caixa existe
        const caixaExiste = await Caixa.findOne( { $or:[ {'nome':nome}, {'codigo_caixa':codigo_caixa} ] })
        if (caixaExiste) {
            return res.status(422).json({message:"Caixa já cadastrado"})
        }
        
        //Verificar se o produto existe
        const produtoExiste = await Produto.findById(id_produto)
        if (!produtoExiste) {
            return res.status(404).json({message:"Produto não existe"})
        }

        //Criar o caixa no banco de dados
        const caixa = new Caixa({
            nome,
            quantidade_caixa,
            quantidade_item,
            id_produto,
            estoque,
            codigo_caixa,
            imagem_caixa,
            valor_caixa
        })

        await caixa.save()
        return res.status(201).json({message:'caixa criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {

    //Pegar informações do body
    const { id } = req.params;
    try {

        //Verificar se a caixa existe
        const caixaExiste = await Caixa.findById(id)
        
        if (caixaExiste) {
            let info = req.body;
            await Caixa.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Caixa editado com sucesso!"});
        }else{
            return res.status(422).json({message:"Caixa não encontrado"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function deletar(req,res){
    const { id } = req.params;
    try {
        let caixa = await Caixa.findById(id);
        if (caixa) {
            let caixa_deletado = await Caixa.findByIdAndDelete(id);
            res.status(200).json({
              message: 'Caixa deletado',
              data: caixa_deletado
            });
        }else{
            res.status(404).send({
                message:'Caixa não encontrado',
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