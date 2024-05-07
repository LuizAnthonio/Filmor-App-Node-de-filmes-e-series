//const dados = require("./Dados/banco.json");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Series = require("./models/Series");

//Transformando ejs em html
app.engine('html',require('ejs').renderFile);
app.set('views engine','html');

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'))

//usando BodyParser
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));

const db = "Filmor"

const url = `mongodb://127.0.0.1:27017/${db}`;

mongoose.connect(url).then((e) => console.table({0:{'Banco de Dados':db,teste:e}})).catch(err => console.error(err))


app.get("/",(req,res) => {
    

    res.render("home.html")

})



app.get("/serie/:id/:index",async (req,res) => {

    let {id, index} = req.params;

    const serie = await Series.find({_id:id})

    let url = serie[0].dir


    console.log(serie)

    let novaUrl;

    if(!serie[0].episodios[index].ep.includes(".mp4")){
        novaUrl = `${url}eps/${serie[0].episodios[index].ep}.mp4`
        
    }else{
        novaUrl = `${url}eps/${serie[0].episodios[index].ep}`

    }

    

    console.log(url)
    url = novaUrl
    console.log(url)

    
    let obj = {}
    obj.ver = url;
    obj.episodios = serie[0].episodios
    obj.id = serie[0]._id;
    obj.ep = parseInt(index)+1;
    obj.antes = parseInt(index)-1;
    obj.titulo = serie[0].nome
    obj.temp = serie[0].temporada
    obj.abertura = serie[0].abertura
    obj.tempo = serie[0].episodios[index].abe
    console.log(obj.tempo)
    console.log(obj.abertura)


    function existe(path){
        if(fs.existsSync(path)){
            return path
        }else{
            
            return serie[0].dir+"imgs/imgCapa.png"
        }

    }

    obj.imgCapa = existe(serie[0].dir+"imgs/imgCapa.jpg");
    obj.imgBg = serie[0].dir+"imgs/imgBG.jpg";
    
   // obj.sinopse;
   let i = 0
   obj.link = `/serie/${serie[0]._id}/`
   obj.qtd = serie[0].episodios.length

   fs.existsSync(obj.imgCapa) ? console.log("existe") : console.log("não tem")

   console.log(obj.imgCapa)
   console.log('url',obj.url)
    






    console.log(" s ",url)

    res.render("home.html",obj)

})


app.get("/series/listar", async (req,res) => {

    const serie = await Series.find({})

    let infos = []

    
    for(let i = 0; i < serie.length; i++){
        let obj = {};
        obj = serie[i];

        obj.link = `/serie/${serie[i]._id}/`
    
        obj.imgCapa = serie[i].dir+"imgs/imgCapa.jpg";
        obj.imgBg = serie[i].dir+"imgs/imgBG.jpg";

        infos.push(obj)



    }


    res.render("listar.html",{dados:infos})




})



app.get("/serie/:id", async (req,res) => {

    let id = req.params.id;

    let obj = {}
    const serie = await Series.find({_id:id});
    obj = serie[0];

    obj.imgCapa = serie[0].dir+"imgs/imgCapa.jpg";
    obj.imgBg = serie[0].dir+"imgs/imgBG.jpg";
    obj.epsQtd = serie[0].episodios.length;
    obj.link = `/serie/${serie[0]._id}/`

    res.render("mostrar.html",obj)





})


app.listen(8080,() => {
    console.log("rodando porta 8080")
})


