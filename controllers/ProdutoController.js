require('dotenv').config()
const Produto = require("../models/Produto")

async function listar (req,res){
    try {
        const produtos = await Produto.find().populate('fornecedor').populate('unidade')
        return res.status(200).json(produtos)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function listar_info (req,res){
    try {
        const { id } = req.params;
        const produto = await Produto.findById(id).populate('fornecedor').populate('unidade')
        if (produto) {
            return res.status(200).json({produto})
        }
        else{
            return res.status(404).json({message:"produto não encontrada"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    try {
        const {
            nome,
            quantidade,
            valor,
            validade,
            estoque,
            image,
            unidade,
            fornecedor,
            produto_caixa,
            codigo_produto,
            flags
        } = req.body
        
        //testar se os campos estão vindo corretamente
        if (!nome) {
            return res.status(422).json({message:"O campo nome é obrigatório!"})
        }
        
        if (!quantidade) {
            return res.status(422).json({message:"O campo quantidade é obrigatório!"})
        }
        
        if (!valor) {
            return res.status(422).json({message:"O campo valor é obrigatório!"})
        }
        
        if (!validade) {
            return res.status(422).json({message:"O campo validade é obrigatório!"})
        }
        
        if (!estoque && estoque != false) {
            return res.status(422).json({message:"O campo estoque é obrigatório!"})
        }
        
        if (!image) {
            return res.status(422).json({message:"O campo image é obrigatório!"})
        }
        
        if (!unidade) {
            return res.status(422).json({message:"O campo unidade é obrigatório!"})
        }
        
        if (!fornecedor) {
            return res.status(422).json({message:"O campo fornecedor é obrigatório!"})
        }
        
        if (!produto_caixa && produto_caixa != false) {
            return res.status(422).json({message:"O campo produto_caixa é obrigatório!"})
        }
        
        if (!codigo_produto) {
            return res.status(422).json({message:"O campo codigo_produto é obrigatório!"})
        }
        
        if (!flags && flags.length > 0) {
            return res.status(422).json({message:"O campo flags é obrigatório!"})
        }

        //Verificar se a produto existe
        const produtoExiste = await Produto.findOne( { $or:[ {'codigo_produto':codigo_produto} ] })
        console.log(produtoExiste)
        if (produtoExiste) {
            return res.status(422).json({message:"Produto já cadastrado"})
        }

        //Criar a produto no banco de dados
        const produto = new Produto({
            nome,
            quantidade,
            valor,
            validade,
            estoque,
            image,
            unidade,
            fornecedor,
            produto_caixa,
            codigo_produto,
            flags
        })

        await produto.save()
        return res.status(201).json({message:'Produto criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {
    try { 
        //Pegar informações do body
        const { id } = req.params;

        //Verificar se o produto existe
        const produtoExiste = await Produto.findById(id)
        
        if (produtoExiste) {
            let info = req.body;
            await Produto.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Produto editado com sucesso!"});
        }else{
            return res.status(422).json({message:"Produto não encontrado"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function deletar(req,res){
    try {
        const { id } = req.params;
        let produto = await Produto.findById(id);
        if (produto) {
            let produto_deletada = await Produto.findByIdAndDelete(id);
            res.status(200).json({
              message: 'Produto deletado',
              data: produto_deletada
            });
        }else{
            res.status(404).send({
                message:'Produto não encontrado',
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