const express = require("express")
const app = express()


//first routes
app.get("/", function(req, res){
    res.send("Bem vindo, programador")
    
})
//second routes
app.get("/blog", function(req, res){
    let canal = req.query["canal"]  //query params -> busca o parametro opcional colocado na url do navegador
    res.send(canal)
})

app.get("/youtube/:nome/:empresa", function(req, res){
    let empresa = req.params.empresa
    let nome = req.params.nome
    res.send("Olá" +nome+ " que trabalha na" +empresa)
})















app.listen(1408, function(erro) {
    if(erro){
        console.log("Ocorreu um erro")
    }else {
        console.log("Server iniciado com sucesso")
    }
})