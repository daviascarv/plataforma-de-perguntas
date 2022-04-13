const express = require("express")
const bodyParser = require("body-parser")
const app = express()

//avisando ao express p usar ejs como view engine(renderizador html)
app.set('view engine','ejs')

//avisando ao express que quero usar arquivos estáticos
app.use(express.static('public'))

//Traduzindo o formulario em html para javascript
app.use(bodyParser.urlencoded({extended: false}))

//Permite ler dados de formulario via json
app.use(bodyParser.json())

//rota principal
app.get("/", (req, res)=>{
    let name = "Davi"
    let linguagem = "JavaScript"
    let produtos = [
        {nome: "Iphone", preço: 1500},
        {nome: "Macbook", preço: 7000},
        {nome: "Ipad", preço: 5000}
    ]
    res.render("home",{
        name: name,
        linguagem: linguagem,
        empresa: "Tecon",
        produtos: produtos
    })
})

//second routes
app.get("/perguntar", (req, res)=>{
    let canal = req.query["canal"]  //query params -> busca o parametro opcional colocado na url do navegador
    res.render("index")
})

app.post("/salvarpergunta", (req, res)=>{
    res.send("Formulario Recebido!")
})















app.listen(1408, (erro)=> {
    if(erro){
        console.log("Ocorreu um erro")
    }else {
        console.log("Server iniciado com sucesso")
    }
})