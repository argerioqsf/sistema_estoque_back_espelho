require('dotenv').config()
const Usuario = require("../models/Usuario")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

async function listar (req,res){
    const usuarios = await Usuario.find();
    return res.status(200).json(usuarios)
}

async function cadastrar (req,res){
    const { nome, email, senha, confirma_senha } = req.body
    
    //testar se os campos estão vindo corretamente
    if (!nome) {
        return res.status(422).json({message:"O campo nome é obrigatório!"})
    }
    
    if (!email) {
        return res.status(422).json({message:"O campo email é obrigatório!"})
    }
    
    if (!senha) {
        return res.status(422).json({message:"O campo senha é obrigatório!"})
    }
    
    if (confirma_senha != senha) {
        return res.status(422).json({message:"As senhas não conferem!"})
    }

    const usuarioExiste = await Usuario.findOne({email:email})

    //Verificar se o usuario existe
    if (usuarioExiste) {
        return res.status(422).json({message:"Email já utilizado"})
    }

    //Criptografar a senha
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)
    
    //Criar o usuario no banco de dados
    const usuario = new Usuario({
        nome,
        email,
        senha:senhaHash
    })

    try {
        await usuario.save()
        return res.status(201).json({message:'Usuário criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function login (req,res){
    const { email, senha } = req.body

    //testar se os campos estão vindo corretamente
    if (!email) {
        return res.status(422).json({message:"O campo email é obrigatório!"})
    }
    
    if (!senha) {
        return res.status(422).json({message:"O campo senha é obrigatório!"})
    }

    const usuario = await Usuario.findOne({email:email})

    //Verificar se o usuario existe
    if (!usuario) {
        return res.status(404).json({message:"Usuário não cadastrado"})
    }

    //Verificar a senha
    const checarSenha = await bcrypt.compare(senha, usuario.senha)

    if (!checarSenha) {
        return res.status(422).json({message:"Senha inválida!",senha})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: usuario._id
            },
            secret
        )

        return res.status(200).json({message:"Usuário autenticado com sucesso!",token})
        
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

module.exports = {
    listar:    listar,
    cadastrar: cadastrar,
    login:     login
}