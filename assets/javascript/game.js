$(document).ready(function() {
   
    var target = 0;
    var wins = 0;
    var losses = 0;
    var crystals = [0,0,0,0];
    var total = 0;
    var duplicate = true;

    // this function creates a random number between min and max
    function randomNumber(min,max) {
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    // this function gives each of the 4 crystals a random value between 1 and 12
    function makeCrystals() {
        for ( i=0; i < crystals.length; i++) {
            crystals[i] = randomNumber(1,12);
        }
    }

    // this function compares the array crystals to itself to check for duplicates, and return true or false depending on what it finds
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

    // This function resets the game and generates new numbers for the target and the crystals
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

    // this function makes the crystals appear to blink by reducing opacity then returning it to normal opacity
    function blink (id) {
        $(id).animate({
            opacity: "0.5"
        });
        $(id).animate({
            opacity: "1"
        });
    }

    // target is set to a random nmber between 19 and 120
    target = randomNumber(19,120);
    console.log(target)

    // this runs a while loop that will remake the numbers in the crystals array until there are no duplicates
    while (duplicate === true) {
        makeCrystals();
        duplicate = checkDuplicate(crystals);
    }

    console.log(crystals);

    alert("Click on a crystal to start the game!")
    
    // When a crystal is clocked on...
    $(".crystals").on("click", function(){

        // The target number is displayed
        $("#randomNumberText").html(target);

        // This if statement runs if the user matches their total score to the target number, which increases their win count runs the reset function
        if ( total === target) {
            wins++;
            reset();
            alert("You win! Click on a crystal to play again!");
        }
        // If the user's score is greater than the target, the number of losses increases and the reset function is run
        else if ( total > target) {
            losses++;
            reset();
            alert("You lose! Click on a crystal to play again!");
        }
        // otherwise the program figures out which crystal was clicked on and runs the appropriate lines of code, which increase the total score by the vale assigned to the crystal clicked from the array crystals, and runs the blink function on the clicked crystal.
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