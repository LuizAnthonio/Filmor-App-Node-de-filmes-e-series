const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const colle = "fluxo-de-caixa";

const series = new Schema({

    
    temporada: Number,
    dir: String,
    nome: String,
    episodios:Array,
    abertura: Number


},{collection:'series'});

const Series = mongoose.model('series',series);

module.exports = Series;