const { toDefaultValue } = require("sequelize/lib/utils")
const db = require("./db")

const Post = db.sequelize.define("Post",{
    userName: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    conteudo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: db.Sequelize.DATE,
        allowNull: false,
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP")
    }
} )

Post.sync({force:true})

module.exports =  Post