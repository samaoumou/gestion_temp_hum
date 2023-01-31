var http = require('http');
var fs = require('fs');
/* var index = fs.readFileSync( 'index.html'); */
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var binary = mongodb.Binary;

/* code pour affichage au niveau du terminal */
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
/* parser.on('data', console.log) */


/* création serveur */

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
   /*  res.end(index); */
});


var Url = "mongodb://127.0.0.1:27017/test"; 
app.listen(4001, function() {
    console.log('Demarrage du serveur Mongo au port', 4001);})
/* initialisation du socket pour l'affichage au niveau de la page html */


var io = require('socket.io')(app, { cors:
{
    origin:"*",
    methods: ["PUT","GET","POST","DELETE","OPTIONS"],
    credentials:false
}});

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    socket.on("fan",(donne)=> {
        console.log(donne)
    })
    
});

/* parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
}); */
/* parser.on('data', function(data) {
    console.log(data);
    io.emit('temp', data);
    console.log(data); */
    parser.on('data', function(data) {
        console.log('Températures et Humidités:');
        let temp = data.split('/');
        console.log(temp);
       io.emit('data', {"temperature": temp[0], "humidite": temp[1]});  // envoi de la température avec emit
     
//decoupe des donnees venant de la carte Arduino
/* var temperature = data.slice(0, 2); */ //decoupe de la temperature
/* var humidite = data.slice(5, 7); */ //decoupe de l'humidite
//calcul de la date et l'heure 
var datHeure = new Date();
var min = datHeure.getMinutes();
var heur = datHeure.getHours(); //heure
var sec = datHeure.getSeconds(); //secondes
var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
var numMois = datHeure.getMonth() + 1; //le mois en chiffre
var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
if (numMois < 10) { numMois = '0' + numMois; }
if (mois < 10) { mois = '0' + mois; }
if (sec < 10) { sec = '0' + sec; }
if (min < 10) { min = '0' + min; }
var heureInsertion = heur + ':' + min + ':' + sec;
var heureEtDate = mois + '/' + numMois + '/' + laDate;
/* var tempe = parseInt(temperature);
var humi = parseInt(humidite); */
 //fin test
/*  if ((heur == 17 && min == 50 && sec == 00) || (heur == 12 && min == 00 && sec == 00) || (heur == 19 && min == 00 && sec == 00)) { */
    /* var tempe = parseInt(temperature);
    var humi = parseInt(humidite);
    console.log("En number" + tempe);
    console.log("En chaine de caractere" + temperature); */
    //l'objet qui contient la temperature, humidite et la date
   /*   var tempEtHum = {
    'Temperature': tempe,
     'Humidity': humi, 
     'Date': heureEtDate, 
     'Heure': heureInsertion }; */
    /*  var tempEtHum  =([{Température:"tempe",Humidity:"tempe"}]); */
    var tempe = parseInt(temp[0]); 
    var humi = parseInt(temp[1]);
    console.log("Données" + tempe);
    
    //l'objet qui contient la temperature, humidite et la date
    var tempEtHum = { 'Temperature': temp[0], 'Humidité': temp[1], 'Date': heureEtDate, 'Heure': heureInsertion };
    //Connexion a mongodb et insertion Temperature et humidite
    MongoClient.connect(Url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dhtTemp");
        console.log("connecte");
        dbo.collection("tempHum").insertOne(tempEtHum, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

/* }  *///Fin if
});