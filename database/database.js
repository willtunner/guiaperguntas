// Importar o sequelize
const Sequelize = require('sequelize');

// Cria a conexão s
const connection = new Sequelize('guiaperguntas', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

 /**
  * Sequelize: Para trabalhar com banco de dados Mysql, Postgres etc...
  * Instalar: npm intall --save sequelize
  * Mysql2: npm install --save mysql2 (necessario para trabalhar com mysql)
  * importa: linha 2
  * Cria conexão: linha 5
  * Exporta: linha 10
  */
