const Sequelize = require("sequelize")
const connection = require("./database")

const Resposta = connection.define("respostas",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
//Criando tabela e sincronizando sem forçar a criação caso ja exista 
Resposta.sync({force: false})

module.exports = Resposta