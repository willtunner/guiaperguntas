const express = require("express");
const app = express();

//Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

//Diz para o express onde está o arquivo statico 
//Diz que aceita arquivos staticos css, imagem, JavaScript etc...
app.use(express.static('public'));


app.get("/", (req, res) =>{
    res.render("index");
});

app.listen(4000,() => {console.log("App rodando!");});