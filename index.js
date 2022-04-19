//Importando o express
const express = require("express")

//Importando o body parser
const bodyParser = require("body-parser")

//Importando model do sequelize
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

//Atribuindo uma constante app à chamada do express -> express()
const app = express()

//Carregando conecção com o bd
const connection = require('./database/database')

//avisando ao express para usar ejs como view engine(renderizador html)
app.set('view engine','ejs')

//avisando ao express que quero usar arquivos estáticos
app.use(express.static('public'))

//Traduzindo o formulario em html para javascript
app.use(bodyParser.urlencoded({extended: false}))

//Permite ler dados de formulario via json
app.use(bodyParser.json())

//Estabelecendo a conecção com o bd
connection
    .authenticate()
    .then(() => {   //Quando a autenticacao for feita, executa o then
        console.log("Conecção feita com o banco de dados!")
    })
    .catch((msgErro) => {   //Se der erro na autenticacao executa o catch
        console.log("Erro")
    })


    
//Rota principal
app.get("/", (req, res)=>{
    Pergunta.findAll({ raw: true, oder:[
        ['id','ASC']
    ]}).then(perguntas => {
        res.render("home",{
            perguntas: perguntas
        })

    })
})


//Rota para fazer a pergunta
app.get("/perguntar", (req, res)=>{
    res.render("index")
})

//Rota para salvar formulario
app.post("/salvarpergunta", (req, res)=>{
    let descricao = req.body.descricao
    let titulo = req.body.titulo
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")
    })
})

//Rota para buscar pergunta
app.get("/pergunta/:id", (req, res)=>{
    let id = req.params.id
        Pergunta.findOne({
            where: {id: id}
        }).then(pergunta => {
            if(pergunta != undefined){
                res.render("pergunta",{
                    pergunta: pergunta
                })
            }else{
                res.redirect("/")
        }
    })
})


app.post("/responder", (req, res) => {
let corpo = req.body.params
let perguntaId = req.body.params
Resposta.create({
    corpo: corpo,
    perguntaId: perguntaID
    }).then(()=> {
        res.redirect("/pergunta/"+perguntaId)
    })
})













app.listen(1408, (erro)=> {
    if(erro){
        console.log("Ocorreu um erro")
    }else {
        console.log("Server iniciado com sucesso")
    }
})