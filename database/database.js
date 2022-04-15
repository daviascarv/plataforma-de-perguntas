const Sequelize = require("sequelize")

const connection = new Sequelize('guiapergunta','root','@Vprdavi20',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection