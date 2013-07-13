//http://tehsis.com.ar/2013/06/corto-tener-un-server-para-archivos-estaticos-en-1-minuto/

var express = require("express");
var app = new express();
 
app.get("/*", express.static(__dirname));

app.listen("3000");

console.log("Sirviendo archivos estáticos en localhost:3000");