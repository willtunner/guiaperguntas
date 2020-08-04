const express = require("express");
const app = express();
const bodyParser = require("body-parser");// Importa o body parser
const connection = require('./database/database');// Importa a conexão com o banco
const Pergunta = require('./database/Pergunta');// Model pergunta

// Database 
connection
    .authenticate()// Tenta se autenticar no banco
    .then(() => { // Caso consiga da a msg
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {// Caso de erro, exibe a msg de erro.
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

// Diz para o express onde está o arquivo statico 
// Diz que aceita arquivos staticos css, imagem, JavaScript etc...
app.use(express.static('public'));

// Diz: Envia os dados para o node em formato Json
app.use(bodyParser.urlencoded({extended: false}));
// Diz: Pegar o valor vindo do formulario e codifica para o JS
app.use(bodyParser.json());

// Renderiza a página index dentro de views
app.get("/", (req, res) =>{
    Pergunta.findAll({raw: true,order:[
        ['id','DESC']// ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas// Cria uma uma variavel perguntas com o perguntas vindo do banco
        });
    });
});

// Renderiza a página perguntar
app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
});

// Salva pergunta
app.post("/salvarpergunta", (req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //res.send("Formulário recebido! titulo " +titulo+ " " + " descrisao " + descricao);
    
    // create, modulo para inserir no banco
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

// Rota para pergunta
//pega o id para fazer o select e buscar a pergunta
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;// Pega o id da pergunta passada pela rota
    Pergunta.findOne({// Faz a busca de 1 registro no model pergunta
        where: {id: id}// Quando o id for igual o id passado
    }).then( pergunta => {// se der tudo certo
        if(pergunta != undefined){// Verifica se veio algo diferente de nulo, encontrada
            res.render("pergunta", {// Chama a página de pergunta
                pergunta: pergunta // passa a pergunta para a view
            }); 
        }else{// Não foi encontrada
            res.redirect("/");// Redireciona para a página inicial caso de erro ou não encontra
        }
    })
});

app.listen(4000,() => {console.log("App rodando!");});


/**
 * Body parser: Pega os dados do formulário e passa para o backend
 * Instalar: npm install body-parser --save
 * Importa: Linha 3
 * Chama como função linha 25, 27
 * Pega dados do formulário: 41, 42
 */

 /**
  * Nodemon: Utilizado para reiniciar o servidor criado a cada save do projeto sem precisar ficar restartando ele sempre 
  * Instalar: npm install -g nodemon
  * Site: https://www.npmjs.com/package/nodemon
  * Como user: nodemon index.js (no terminal)
  */

  /**
   * Sequelize dentro do database
   */

