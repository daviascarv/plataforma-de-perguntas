//Importando o express
const express = require("express")

//Importando o body parser
const bodyParser = require("body-parser")

//Importando model do sequelize
const Pergunta = require("./database/Pergunta")

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


    
//rota principal
app.get("/", (req, res)=>{
    Pergunta.findAll({ raw: true, oder:[
        ['id','ASC']
    ]}).then(perguntas => {
        res.render("home",{
            perguntas: perguntas
        })

    })
})


//second routes
app.get("/perguntar", (req, res)=>{
    res.render("index")
})

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

//Third rote
app.get("/pergunta/:id", (req, res)=>{
    let id = req.params.id
        Pergunta.findOne({
            where: {id: id}
        }).then(pergunta => {
            if(pergunta != undefined){
                res.render("pergunta")
            }else{
                res.redirect("/")
            }
        })
    })














app.listen(1408, (erro)=> {
    if(erro){
        console.log("Ocorreu um erro")
    }else {
        console.log("Server iniciado com sucesso")
    }
})