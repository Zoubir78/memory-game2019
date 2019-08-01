
/************** Côté serveur **************/

'use strict';

/**
 * Partie HTTP
 */

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use('/', express.static(path.normalize(`${__dirname}/public`)));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'pug');
app.use('/src', express.static(__dirname + '/src'));

app.use(session({
    secret: 'my secret text',
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./admin'));

app.use(function (req, res, next) {
    res.render('404', {
        titles: 'Erreur 404',
        session: req.session
    });
});

const port = 8000;
let httpServer = app.listen(port, function () {
    console.log(`Écoute sur le port: ${port}`);
});

/**
 * Partie Websocket
 */

const SocketIo = require('socket.io');

let ioServer = new SocketIo(httpServer);

/************* Déclaration des variables **************/

var checkArray = []; // vérifier si les deux champs cliqués ont le même fruit
var idCheck = []; // tableau pour stocker les ID de champs cliqués afin que je puisse supprimer la classe "retournée" si elles sont différentes
var counter = 0;
var end = 0; // pour détecter si tous les champs sont complétés
// var win = new Audio("/src/mp3/win.mp3");

var images = [
    "/src/img/ananas_uukegu.png",
    "/src/img/apple_khwnkz.png",
    "/src/img/apricot_bvge7o.png",
    "/src/img/banana_xks3tr.png",
    "/src/img/cake_pqvm0z.png",
    "/src/img/cherry_gtzbks.png",
    "/src/img/grapes_wshdtl.png",
    "/src/img/lemon_hfksjg.png",
    "/src/img/pear_vdpyqc.png",
    "/src/img/plum_rncxxc.png",
    "/src/img/strawberry_yr6sa1.png",
    "/src/img/watermelon_wfzuz8.png",
    "/src/img/ananas_uukegu.png",
    "/src/img/apple_khwnkz.png",
    "/src/img/apricot_bvge7o.png",
    "/src/img/banana_xks3tr.png",
    "/src/img/cake_pqvm0z.png",
    "/src/img/cherry_gtzbks.png",
    "/src/img/grapes_wshdtl.png",
    "/src/img/lemon_hfksjg.png",
    "/src/img/pear_vdpyqc.png",
    "/src/img/plum_rncxxc.png",
    "/src/img/strawberry_yr6sa1.png",
    "/src/img/watermelon_wfzuz8.png"
];

ioServer.on('connection', function(socket){

    function clicked() { // clicked function so i can unbind click event to prevet shit like clicking more then 2 fields at one try
        if ($(this).find(".inner-wrap").hasClass("flipped")) {
            return;
        }
        $(this).find(".inner-wrap").toggleClass("flipped");
        checkArray.push($(this).find("img").attr("src"));
        idCheck.push($(this).attr("id"));
        check();
    }
    
    $(".field").on("click", clicked);

    function check() {
        if (checkArray.length === 2) { // nous vérifions si les champs sont cliqués 2 fois
            $(".field").off("click", clicked); // désactivation de l'événement de clic
            setTimeout(function(){
                if (checkArray[0] !== checkArray[1]) { // s'il n'y a pas de correspondance
                    $("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // retourner le champ
                    $("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // deuxième retour aussi
                    counter++;
                    checkArray = []; //tableau de vérification vide pour les 2 prochains clics
                    idCheck = []; // idem avec celui-ci
                    $(".field").on("click", clicked); // relier le clic en arrière
                } else {
                    spark.play();
                    counter++;
                    end += 2; // s'il y a correspondance, "end" est augmenté de 2 alors que 2 champs sont découverts
                    checkArray = []; // tableau vide pour le prochain essai
                    idCheck = []; // celui-ci aussi
                    checkEnd(); // vérifier si le jeu est terminé
                    $(".field").on("click", clicked); // cliquez à nouveau
                }
                document.querySelector(".counter").innerHTML = counter;
            }, 800);	
        };
    };

    socket.emit('checkEnd', data);

    socket.on('shuffle', function(data){

        function shuffleArray(array) { // Tableau aléatoire avec des images
            
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    });
    
    socket.on('disconnect', function(){
        ioServer.emit('restart', images);
    });
    startGame();
});