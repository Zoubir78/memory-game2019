$(function () {
    if ($('#msg').length) {
        setTimeout(function () {
            $('#msg').fadeOut(800);
        }, 4000);
    };

	
    var checkArray = []; // vérifier si les deux champs cliqués ont le même fruit
    var idCheck = []; // tableau pour stocker les ID de champs cliqués afin que je puisse supprimer la classe "retournée" si elles sont différentes
    var counter = 0;
    var end = 0; // pour détecter si tous les champs sont complétés
    var fields = document.querySelectorAll(".back");
    var natureSound = new Audio("/src/mp3/nature.mp3");
    var spark = new Audio("/src/mp3/spark.mp3");
    var win = new Audio("/src/mp3/win.mp3");
    
    
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
        
    
    function restart() {
        $(".back").find("img").remove(); //remove all current images from the field
        $(".field .inner-wrap").removeClass("flipped"); // remove flipped class so they can flip back again at the starting position
        checkArray = []; // empty check array
        idCheck = []; // empty IDs check array
        counter = 0; // reset counter
        end = 0; // reset ending variable
        startGame();
    }
    
    function checkEnd() {
        if (end === 24) { //if all 24 fields are uncovered 
            win.play();
            alert("Game is over! Your score is " + counter);
            restart();
        }
    }
    
    function shuffleArray(array) { // shuffle array with images
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function startGame() {
    
        natureSound.play(); // play the background music
    
        var arr = shuffleArray(images); // stores the array of shuffled images
    
        for (var i = 0; i < fields.length; i++) { // appending those images to the div with class "back"
            var img = document.createElement("img");
            img.src = arr[i];
            fields[i].appendChild(img);
        }
    }
    
    function check() {
        if (checkArray.length === 2) { // if fields are clicked 2 times we are doing check
            $(".field").off("click", clicked); // disabling click event to prevet shit
            setTimeout(function(){
                if (checkArray[0] !== checkArray[1]) { // if there is  no match
                    $("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
                    $("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // second one flip back as well
                    counter++;
                    checkArray = []; //empty checking array for the next 2 clicks
                    idCheck = []; // same with this one
                    $(".field").on("click", clicked); // bind the click back again
                } else {
                    spark.play();
                    counter++;
                    end += 2; // if there is a match "end" is raised by 2 as 2 fields are uncovered
                    checkArray = []; // empty array for the next try
                    idCheck = []; // this one as well
                    checkEnd(); // check if game has eneded
                    $(".field").on("click", clicked); // bind click again
                }
                document.querySelector(".counter").innerHTML = counter;
            }, 800);	
        }
    }
    
    startGame();
});