require('dotenv').config()
const Usuario = require("../models/Usuario")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

async function listar (req,res){
    const usuarios = await Usuario.find({},['-senha','-token_auth']).populate('permissoes.info_permissao')
    return res.status(200).json(usuarios)
}

async function listar_info (req,res){
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id,['-senha','-token_auth']).populate('permissao');
        if (usuario) {
            return res.status(200).json({usuario})
        }
        else{
            return res.status(404).json({message:"usuario nã oencontrado"})
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar (req,res){
    const { nome, email, senha, confirma_senha, permissoes } = req.body
    
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
    
    if (!permissoes && permissoes.lengt > 0) {
        return res.status(422).json({message:"O campo permissões é obrigatório!"})
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
        senha:senhaHash,
        permissoes
    })

    try {
        await usuario.save()
        return res.status(201).json({message:'Usuário criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function editar(req, res) {

    //Pegar informações do body
    const { id } = req.params;
    try {
        const {email} = req.body;
        if (email) {
            const emailExiste = await Usuario.findOne({email:email})
        
            //Verificar se o usuario existe
            if (emailExiste) {
                return res.status(422).json({message:"Email já utilizado"})
            }
        }

        //Verificar se o usuario existe
        const usuarioExiste = await Usuario.findById(id)
        
        if (usuarioExiste) {
            let info = req.body;
            let usuario_editado = await Usuario.findByIdAndUpdate(id,info);
            return res.status(201).json({message:"Usuário editado com sucesso!"});
        }else{
            return res.status(422).json({message:"Usuário não encontrado"});
        }
    
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

        //salvar token na cadastro do usuario
        usuario.token_auth = token;
        await usuario.save();

        return res.status(200).json({message:"Usuário autenticado com sucesso!",token})
        
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }

}

async function deletar(req,res){
    const { id } = req.params;
    try {
        let usuario = await Usuario.findById(id);
        if (usuario) {
            let usuario_deletado = await Usuario.findByIdAndDelete(id,['-senha','-token_auth']);
            res.status(200).json({
              message: 'Usuário deletado',
              data: usuario_deletado
            });
        }else{
            res.status(404).send({
                message:'Usuário não encontrado',
            });
        }
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

module.exports = {
    listar:      listar,
    cadastrar:   cadastrar,
    login:       login,
    editar:      editar,
    listar_info: listar_info,
    deletar:     deletar
}