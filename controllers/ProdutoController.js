
function listar (req,res){
    return res.json([
        {
            id:1,
            nome:"Argerio"
        },
        {
            id:2,
            nome:"Joao"
        }
    ])
}

function cadastrar (req,res){
    return res.json({message:"Produto cadastrado com sucesso!"})
}

function listar_um (req,res){
    return res.json(
        {
            id:1,
            nome:"Argerio"
        }
    )
}

module.exports = {
    listar: listar,
    cadastrar:cadastrar,
    listar_um:listar_um
}