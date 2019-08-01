
/***************** Côté client *******************/

'use strict';

(function(window, io){

    window.document.addEventListener('DOMContentLoaded', function () {

        var socket = io();
        var fields = document.querySelectorAll(".back");
        var natureSound = new Audio("/src/mp3/nature.mp3");
        var spark = new Audio("/src/mp3/spark.mp3");
        
        socket.on('connect', function(){
            function startGame() {

                natureSound.play(); // jouer de la musique

                var arr = shuffleArray(images); // stocke le tableau d'images mélangées

                for (var i = 0; i < fields.length; i++) { // ajouter ces images à la div avec la classe "back"
                    var img = document.createElement("img");
                    img.src = arr[i];
                    fields[i].appendChild(img);
                }
            }

            socket.on('checkEnd', function() {
                function checkEnd() {
                    if (end === 24) { //si les 24 champs sont découverts
                        win.play();
                        alert("Game is over! Your score is " + counter);
                        restart();
                    }
                }
            });

            socket.emit('shuffle', data);

            socket.on('restart', function(){
                $(".back").find("img").remove(); //supprimer toutes les images actuelles du champ
                $(".field .inner-wrap").removeClass("flipped"); // supprimer la classe retournée afin qu'ils puissent retourner à la position de départ
                checkArray = []; // empty check array
                idCheck = []; // empty IDs check array
                counter = 0; // reset counter
                end = 0; // reset ending variable
                startGame();
            });
        });
    });
    
})(window, io);    