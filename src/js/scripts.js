$(function () {
    if ($('#msg').length) {
        setTimeout(function () {
            $('#msg').fadeOut(800);
        }, 4000);
    };

	
    // var checkArray = []; // vérifier si les deux champs cliqués ont le même fruit
    // var idCheck = []; // tableau pour stocker les ID de champs cliqués afin que je puisse supprimer la classe "retournée" si elles sont différentes
    // var counter = 0;
    // var end = 0; // pour détecter si tous les champs sont complétés
    // var fields = document.querySelectorAll(".back");
    // var natureSound = new Audio("/src/mp3/nature.mp3");
    // var spark = new Audio("/src/mp3/spark.mp3");
    // var win = new Audio("/src/mp3/win.mp3");
    
    
    // var images = [
    //     "/src/img/ananas_uukegu.png",
    //     "/src/img/apple_khwnkz.png",
    //     "/src/img/apricot_bvge7o.png",
    //     "/src/img/banana_xks3tr.png",
    //     "/src/img/cake_pqvm0z.png",
    //     "/src/img/cherry_gtzbks.png",
    //     "/src/img/grapes_wshdtl.png",
    //     "/src/img/lemon_hfksjg.png",
    //     "/src/img/pear_vdpyqc.png",
    //     "/src/img/plum_rncxxc.png",
    //     "/src/img/strawberry_yr6sa1.png",
    //     "/src/img/watermelon_wfzuz8.png",
    //     "/src/img/ananas_uukegu.png",
    //     "/src/img/apple_khwnkz.png",
    //     "/src/img/apricot_bvge7o.png",
    //     "/src/img/banana_xks3tr.png",
    //     "/src/img/cake_pqvm0z.png",
    //     "/src/img/cherry_gtzbks.png",
    //     "/src/img/grapes_wshdtl.png",
    //     "/src/img/lemon_hfksjg.png",
    //     "/src/img/pear_vdpyqc.png",
    //     "/src/img/plum_rncxxc.png",
    //     "/src/img/strawberry_yr6sa1.png",
    //     "/src/img/watermelon_wfzuz8.png"
    // ];
    
    // function clicked() { // clicked function so i can unbind click event to prevet shit like clicking more then 2 fields at one try
    //     if ($(this).find(".inner-wrap").hasClass("flipped")) {
    //         return;
    //     }
    //     $(this).find(".inner-wrap").toggleClass("flipped");
    //     checkArray.push($(this).find("img").attr("src"));
    //     idCheck.push($(this).attr("id"));
    //     check();
    // }
    
    // $(".field").on("click", clicked);
        
    
    // function restart() {
    //     $(".back").find("img").remove(); //supprimer toutes les images actuelles du champ
    //     $(".field .inner-wrap").removeClass("flipped"); // supprimer la classe retournée afin qu'ils puissent retourner à la position de départ
    //     checkArray = []; // empty check array
    //     idCheck = []; // empty IDs check array
    //     counter = 0; // reset counter
    //     end = 0; // reset ending variable
    //     startGame();
    // }
    
    // function checkEnd() {
    //     if (end === 24) { //si les 24 champs sont découverts
    //         win.play();
    //         alert("Game is over! Your score is " + counter);
    //         restart();
    //     }
    // }
    
    // function shuffleArray(array) { // tableau aléatoire avec des images
    //     for (var i = array.length - 1; i > 0; i--) {
    //         var j = Math.floor(Math.random() * (i + 1));
    //         var temp = array[i];
    //         array[i] = array[j];
    //         array[j] = temp;
    //     }
    //     return array;
    // }
    
    // function startGame() {
    
    //     natureSound.play(); // jouer de la musique
    
    //     var arr = shuffleArray(images); // stocke le tableau d'images mélangées
    
    //     for (var i = 0; i < fields.length; i++) { // ajouter ces images à la div avec la classe "back"
    //         var img = document.createElement("img");
    //         img.src = arr[i];
    //         fields[i].appendChild(img);
    //     }
    // }
    
    // function check() {
    //     if (checkArray.length === 2) { // nous vérifions si les champs sont cliqués 2 fois
    //         $(".field").off("click", clicked); // désactivation de l'événement de clic
    //         setTimeout(function(){
    //             if (checkArray[0] !== checkArray[1]) { // s'il n'y a pas de correspondance
    //                 $("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // retourner le champ
    //                 $("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // deuxième retour aussi
    //                 counter++;
    //                 checkArray = []; //tableau de vérification vide pour les 2 prochains clics
    //                 idCheck = []; // idem avec celui-ci
    //                 $(".field").on("click", clicked); // relier le clic en arrière
    //             } else {
    //                 spark.play();
    //                 counter++;
    //                 end += 2; // s'il y a correspondance, "end" est augmenté de 2 alors que 2 champs sont découverts
    //                 checkArray = []; // tableau vide pour le prochain essai
    //                 idCheck = []; // celui-ci aussi
    //                 checkEnd(); // vérifier si le jeu est terminé
    //                 $(".field").on("click", clicked); // cliquez à nouveau
    //             }
    //             document.querySelector(".counter").innerHTML = counter;
    //         }, 800);	
    //     }
    // }
    
    // startGame();
});