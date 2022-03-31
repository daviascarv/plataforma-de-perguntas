const express = require("express")
const app = express()
app.set('view engine','ejs')    //avisando ao express p usar ejs como view engine(renderizador html)

//rota principal
app.get("/", (req, res)=> res.render("html"))

//second routes
app.get("/blog", (req, res)=>{
    let canal = req.query["canal"]  //query params -> busca o parametro opcional colocado na url do navegador
    res.send(canal)
})

app.get("/youtube/:nome/:empresa", (req, res)=>{
    let empresa = req.params.empresa
    let nome = req.params.nome
    res.send("Olá" +nome+ " que trabalha na" +empresa)
})















app.listen(1408, (erro)=> {
    if(erro){
        console.log("Ocorreu um erro")
    }else {
        console.log("Server iniciado com sucesso")
    }
})