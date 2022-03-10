require('dotenv').config()
const Ordem = require('../models/Ordem')

async function listar (req,res){
    try {
        const ordem = await Ordem.find().populate('produtos.produto').populate('caixas.caixa')
        return res.status(200).json(ordem)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function listar_info (req,res){
    const { id } = req.params;
    try {
        const ordem = await Ordem.findById(id).populate('produtos.produto').populate('caixas.caixa')
        if (ordem) {
            return res.status(200).json({ordem})
        }
        else{
            return res.status(404).json({message:"ordem não encontrada"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    const {
        status,
        valor_total,
        caixas,
        produtos,
        data_pagamento,
        desconto
    } = req.body
    
    //testar se os campos estão vindo corretamente
    if (!status) {
        return res.status(422).json({message:"O campo status é obrigatório!"})
    }

    if (!valor_total) {
        return res.status(422).json({message:"O campo valor_total é obrigatório!"})
    }
    
    if (!caixas) {
        return res.status(422).json({message:"O campo caixas é obrigatório!"})
    }
    
    if (!produtos) {
        return res.status(422).json({message:"O campo produtos é obrigatório!"})
    }
    
    if (!data_pagamento) {
        return res.status(422).json({message:"O campo data_pagamento é obrigatório!"})
    }
    
    if (!desconto && desconto != 0) {
        return res.status(422).json({message:"O campo desconto é obrigatório!"})
    }


    try {
        //Criar o ordem no banco de dados
        const ordem = new Ordem({
            status,
            valor_total,
            caixas,
            produtos,
            data_pagamento,
            desconto
        })
        await ordem.save()
        return res.status(201).json({message:'ordem criada com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {

    //Pegar informações do body
    const { id } = req.params;
    try {

        //Verificar se a ordem existe
        const ordemExiste = await Ordem.findById(id)
        
        if (ordemExiste) {
            let info = req.body;
            await Ordem.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Ordem editado com sucesso!"});
        }else{
            return res.status(422).json({message:"Ordem não encontrado"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function deletar(req,res){
    const { id } = req.params;
    try {
        let ordem = await Ordem.findById(id);
        if (ordem) {
            let ordem_deletado = await Ordem.findByIdAndDelete(id);
            res.status(200).json({
              message: 'Ordem deletado',
              data: ordem_deletado
            });
        }else{
            res.status(404).send({
                message:'Ordem não encontrada',
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