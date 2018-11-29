$(document).ready(function() {
   
    var target = 0;
    var wins = 0;
    var losses = 0;
    var crystals = [0,0,0,0];
    var total = 0;
    var duplicate = true;

    function randomNumber(min,max) {
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    function makeCrystals() {
        for ( i=0; i < crystals.length; i++) {
            crystals[i] = randomNumber(1,12);
        }
    }

    function checkDuplicate (array) {
        for (i=0; i <= array.length; i++) {
            for (j=0; j <= array.length; j++) {
                if ( i !== j && array[i] === array[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function reset () {
        target = randomNumber(19,120);
        duplicate = true;
        while (duplicate === true) {
            makeCrystals();
            duplicate = checkDuplicate(crystals);
        }
        total = 0;
        console.log(crystals);
    }

    function blink (id) {
        $(id).animate({
            opacity: "0.5"
        });
        $(id).animate({
            opacity: "1"
        });
    }

    target = randomNumber(19,120);
    console.log(target)

    while (duplicate === true) {
        makeCrystals();
        duplicate = checkDuplicate(crystals);
    }

    console.log(crystals);

    alert("Click on a crystal to start the game!")

    $(".crystals").on("click", function(){

        $("#randomNumberText").html(target);

        if ( total === target) {
            wins++;
            reset();
            alert("You win! Click on a crystal to play again!");
        }
        else if ( total > target) {
            losses++;
            reset();
            alert("You lose! Click on a crystal to play again!");
        }
        else {
            if ($(this).is("#crystalOne")) {
                total += crystals[0];  
                blink("#crystalOne");
            }
            else if ($(this).is("#crystalTwo")) {
                total += crystals[1];
                blink("#crystalTwo");
            }
            else if ($(this).is("#crystalThree")) {
                total += crystals[2];
                blink("#crystalThree");
            }
            else {
                total += crystals[3];
                blink("#crystalFour");
            }
            console.log(total);
        }
        $("#totalScoreText").html(total);
        $("#winText").html(wins);
        $("#loseText").html(losses);
    })
})