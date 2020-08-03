const Sequelize = require("sequelize");
const connection = require("./database");


// Define qual nome da tabela
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,//para texto curtos
        allowNull: false// não aceita nulo
    },
    descricao:{
        type: Sequelize.TEXT,// para textos longos
        allowNull: false// não aceita nulo
    }
});

// sincroniza com o banco 
// force, se não tiver essa tabela ele cria
Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela criada!");
});

//exporta o Pergunta
module.exports = Pergunta;