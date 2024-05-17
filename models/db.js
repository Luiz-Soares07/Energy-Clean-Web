require("dotenv").config({path: "./config.env"})
const Sequelize = require("sequelize")

let sequelize
//conexao com o banco de dados usuarios
    if (process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL);
    } else{
       sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
           host: process.env.DB_HOST,
          dialect: process.env.DB_DIALECT
       })
    }    

// Exportando os mudulos de banco de dados
    module.exports = {
        Sequelize : Sequelize,
        sequelize: sequelize
    }