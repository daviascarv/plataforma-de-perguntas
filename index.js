//Importando o express
const express = require("express")

//Importando o body parser
const bodyParser = require("body-parser")

//Importando model do sequelize
const perguntaModel1 = require("./database/Pergunta")

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
    .then(() => {
        console.log("Conecção feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log("Erro")
    })


    
//rota principal
app.get("/", (req, res)=>{
    res.render("home")
})

//second routes
app.get("/perguntar", (req, res)=>{
    res.render("index")
})

app.post("/salvarpergunta", (req, res)=>{
    let descricao = req.body.descricao
    let titulo = req.body.titulo
    res.send("Tudo certo " + titulo + "e" + descricao)
})















app.listen(1408, (erro)=> {
    if(erro){
        console.log("Ocorreu um erro")
    }else {
        console.log("Server iniciado com sucesso")
    }
})