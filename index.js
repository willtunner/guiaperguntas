const express = require("express");
const app = express();

//Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');


app.get("/:nome/:lang", (req, res) =>{
    /*Metodo classico de enviar msg para rota */
    //res.send("Bem vindo ao meu site");

    /*Metodo para chamar um arquivo html*/
    //manda desenhar o index.ejs de dentro da pasta views
    //res.render("index");

    /*Metodo para passar vareaveis para o HTML */
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "ps4", preco: 2000},
        {nome: "x-box one", preco: 1800},
        {nome: "pc gamer", preco: 4000},
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "GreenCode",
        inscritos: 8000,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(4000,() => {console.log("App rodando!");});