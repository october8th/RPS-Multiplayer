// Initialize Firebase
var config = {
apiKey: "AIzaSyBqjmOWsVdyoBRMNuMAls1OMwyCVnp328U",
authDomain: "multiplayer-rps-e0905.firebaseapp.com",
databaseURL: "https://multiplayer-rps-e0905.firebaseio.com",
projectId: "multiplayer-rps-e0905",
storageBucket: "multiplayer-rps-e0905.appspot.com",
messagingSenderId: "286020919373"
};
firebase.initializeApp(config);
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

var myChoice=null;
var yourChoice=null;
var player=0;
var opponent;
var myWins = 0;
var myLosses = 0;
var yourWins;
var yourLosses;
var evaluated = 0;
var chatset = 0;
var chatline;

var choices = ["monkey","pirate","robot","ninja","zombie"]

// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();

function initializeGame()//let's start another game
{
	//check on the database and find out where the game stands currently
	//Am I player 1 or player 2?
	database.ref("Game").child("Player" + player + "Choice").remove();
	myChoice = null;
	evaluated = 0;
	renderButtons();
}

function renderButtons() 
{
    // Delete the content inside the buttons-view div prior to adding new catsand buttons
    // (this is necessary otherwise you will have repeat buttons)
    $(".warrior").empty();
    // Loop through the array of terms, then generate buttons for each term in the array
    $(choices).each(function(index,listItem)
    {
        var buttonToAdd = $("<button>");
        buttonToAdd.addClass("warriorButton col-12");
        buttonToAdd.attr("data-name", listItem);
        buttonToAdd.html(listItem);
        $(".warrior").append(buttonToAdd);
    });
 };

$(document).on("click", ".warriorButton" , function(event)//you pick your warrior
{//choose an answer
  	// Prevent form from submitting
  	event.preventDefault();
  	myChoice = $(this).data("name");
  	if(player == 1)//i'm player 1
  	{
  		database.ref("Game").child("Player1Choice").set(myChoice);
  	}
  	else if(player ==2)//i'm player2
  	{
  		database.ref("Game").child("Player2Choice").set(myChoice);
  	}
  	else
  	{
  		alert("something isn't properly initialized")
  	}
  	$(".warrior").empty();//delete the buttons and show your choice
  	var imageToAdd = $("<img>");
    imageToAdd.addClass("warriorPic rounded mx-auto d-block img-fluid col-12");
    imageToAdd.attr("src","assets/images/" + myChoice + ".png");
    $(".warrior").append(imageToAdd);
    $("#gamePlayText1").text("You have chosen " + myChoice + "!");
    setTimeout(function(){ evaluateChoices(); }, 4000);//is the game over?
});

function evaluateChoices()//who has won?
{
	if(myChoice == null) 
	{
		//do nothing
	}
	else if(yourChoice == null)
	{
		//do nothing
	}
	else if(evaluated == 1)
	{
		//do nothing
	}
	else
	{
		evaluated = 1;
		//console.log(player + "mychoice: " + myChoice + " yourchoice: " + yourChoice );
		$(".otherPic").attr("src","assets/images/" + yourChoice + ".png");
	    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
	    $("#gamePlayText2").text("They chose " + yourChoice + "!");
	    //reveal the choice of the other player
	    setTimeout(function(){ initializeGame(); }, 5000);//is the game over?
	    if(myChoice == yourChoice)//it was a tie!
	    {
	    	var theme =  new Audio('assets/audio/' + yourChoice + '.mp3');
  			theme.play();
  			$("#gamePlayText1").text("We have a tie! We chose " + yourChoice + "s!");
	    }
		if(myChoice == "monkey")
		{
			if(yourChoice == "ninja")//I win
			{
  				var theme =  new Audio('assets/audio/monkey.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Win! Monkey fools Ninja!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);

			}
			else if(yourChoice == "robot")//I win
			{
				var theme =  new Audio('assets/audio/monkey.mp3');
  				theme.play();
  				$("#gamePlayText1").text("You Win! Monkey unplugs Robot!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "pirate")//You win
			{
				var theme =  new Audio('assets/audio/pirate.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Pirate skewers Monkey!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
			else if(yourChoice == "zombie")//You win
			{
				var theme =  new Audio('assets/audio/zombie.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Zombie savages Monkey!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
		}
		else if(myChoice == "robot")
		{
			if(yourChoice == "ninja")//I win
			{
  				var theme =  new Audio('assets/audio/robot.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Win! Robot Chokes Ninja!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "zombie")//I win
			{
				var theme =  new Audio('assets/audio/robot.mp3');
  				theme.play();
  				$("#gamePlayText1").text("You Win! Robot crushes Zombie!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "pirate")//You win
			{
				var theme =  new Audio('assets/audio/pirate.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Pirate drowns Robot!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
			else if(yourChoice == "monkey")//You win
			{
				var theme =  new Audio('assets/audio/monkey.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Monkey unplugs Robot!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
		}
		else if(myChoice == "pirate")
		{
			if(yourChoice == "robot")//I win
			{
  				var theme =  new Audio('assets/audio/pirate.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Win! Pirate drowns Robot!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "monkey")//I win
			{
				var theme =  new Audio('assets/audio/pirate.mp3');
  				theme.play();
  				$("#gamePlayText1").text("You Win! Pirate skewers Monkey!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "zombie")//You win
			{
				var theme =  new Audio('assets/audio/zombie.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Zombie eats Pirate!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
			else if(yourChoice == "ninja")//You win
			{
				var theme =  new Audio('assets/audio/ninja.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Ninja chops Pirate!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
		}
		else if(myChoice == "ninja")
		{
			if(yourChoice == "pirate")//I win
			{
  				var theme =  new Audio('assets/audio/ninja.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Win! Ninja chops Pirate!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "zombie")//I win
			{
				var theme =  new Audio('assets/audio/ninja.mp3');
  				theme.play();
  				$("#gamePlayText1").text("You Win! Ninja decapitates Zombie!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "robot")//You win
			{
				var theme =  new Audio('assets/audio/robot.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Robot chokes Ninja!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
			else if(yourChoice == "monkey")//You win
			{
				var theme =  new Audio('assets/audio/monkey.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Monkey fools Ninja!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
		}
		else if(myChoice == "zombie")
		{
			if(yourChoice == "pirate")//I win
			{
  				var theme =  new Audio('assets/audio/zombie.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Win! Zombie eats Pirate!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "monkey")//I win
			{
				var theme =  new Audio('assets/audio/zombie.mp3');
  				theme.play();
  				$("#gamePlayText1").text("You Win! Zombie savages Monkey!");
  				database.ref("Game").child("Player"+ player + "Wins").set(myWins + 1);
			}
			else if(yourChoice == "ninja")//You win
			{
				var theme =  new Audio('assets/audio/ninja.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Ninja decapitates Zombie!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
			else if(yourChoice == "robot")//You win
			{
				var theme =  new Audio('assets/audio/robot.mp3');
  				theme.play();
  				$("#gamePlayText1").text(" You Lose! Robot crushes Zombie!");
  				database.ref("Game").child("Player"+ player + "Losses").set(myLosses + 1);
			}
		}
	}


}

//listen for a change in Losses
database.ref("Game/Player1Losses").on("value", function(snapshot) 
{
	//my opponent has chosen
  	if(player==1)
  	{
  		myLosses	= snapshot.val();
  		$(".myScore").text("W:" + myWins + " L:" + myLosses + " Trash talkin begins:");
  	}
});

//listen for a change in Losses
database.ref("Game/Player2Losses").on("value", function(snapshot) 
{
	//my opponent has chosen
  	if(player==2)
  	{
  		myLosses	= snapshot.val();
  		$(".myScore").text("W:" + myWins + " L:" + myLosses + " Trash talkin begins:");
  	}
});

//listen for a change in wins
database.ref("Game/Player1Wins").on("value", function(snapshot) 
{
	//my opponent has chosen
  	if(player==1)
  	{
  		myWins	= snapshot.val();
  		$(".myScore").text("W:" + myWins + " L:" + myLosses + " Trash talkin begins:");
  	}
});

//listen for a change in wins
database.ref("Game/Player2Wins").on("value", function(snapshot) 
{
	//my opponent has chosen
  	if(player==2)
  	{
  		myWins	= snapshot.val();
  		$(".myScore").text("W:" + myWins + " L:" + myLosses + " Trash talkin begins:");
  	}
});

//listen for your opponent's move
database.ref("Game/Player1Choice").on("value", function(snapshot) 
{
	//my opponent has chosen
  	if(player==2)
  	{
  		yourChoice	= snapshot.val();
  		if(snapshot.val() == null)
  		{
  			$(".otherPic").attr("src","assets/images/mprnz-game.png");
		    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
  		}
  		else
  		{
	  		$("#gamePlayText2").text("Your opponent has chosen!");
	  		setTimeout(function(){ evaluateChoices(); }, 4000);//is the game over?
		    $(".otherPic").attr("src","assets/images/what.png");
		    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
		}
  	}
});

//listen for your opponent's move
database.ref("Game/Player2Choice").on("value", function(snapshot) 
{
	//my opponent has chosen
  	if(player==1)
  	{
  		yourChoice	= snapshot.val();
  		if(snapshot.val() == null)
  		{
  			$(".otherPic").attr("src","assets/images/mprnz-game.png");
		    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
  		}
  		else
  		{
	  		$("#gamePlayText2").text("Your opponent has chosen!");
	  		setTimeout(function(){ evaluateChoices(); }, 4000);//is the game over?
		    $(".otherPic").attr("src","assets/images/what.png");
		    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
		}
  	}
});

//listen for your oponent's arrival 
database.ref("Game/Player1Here").on("value", function(snapshot) 
{
	//my opponent has arrived
  	if(player==2)
  	{
  		if(snapshot.val() == null)
  		{
  			$("#gamePlayText2").text("Your opponent Left!");
  		}
  		else
  		{
  			$("#gamePlayText2").text("Your opponent has arrived!");	
  		}
  	}
});

//listen for your oponent's arrival 
database.ref("Game/Player2Here").on("value", function(snapshot) 
{
	//my opponent has arrived
  	if(player==1)
  	{
  		if(snapshot.val() == null)
  		{
  			$("#gamePlayText2").text("Your opponent Left!");
  		}
  		else
  		{
  			$("#gamePlayText2").text("Your opponent has arrived!");	
  		}
  	}
});



 // The page has loaded for the first time
$( document ).ready(function() {
    renderButtons();
    //initializeGame();
});


database.ref().on("value", function(snapshot) 
{
	//listen for changes to the database
	if(player == 0)//this is our first look at the database
	{
		//Can I be player 1?
  		if(snapshot.child("Game").child("Player1Here").val() == null)
  		{
  			//I can be player1
 			player = 1;
  			database.ref("Game").child("Player1Here").set("yes");
  			if(snapshot.child("Game").child("Player2Here").val() == null)
  			{//i'm waiting for my opponent
  				$("#gamePlayText2").text("Waiting for an opponent!");
  			}
  			else
  			{
  				$("#gamePlayText2").text("Your opponent is here!");
  				if(snapshot.child("Game").child("Player2Choice").exists())
  				{//my opponent has already chosen!
  					yourChoice	= snapshot.child("Game").child("Player2Choice").val();
			  		$("#gamePlayText2").text("Your opponent has chosen!");
				    $(".otherPic").attr("src","assets/images/what.png");
				    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
  				}
  			}
  		}
  		else if(snapshot.child("Game").child("Player2Here").val() == null)
  		{
  			//I must be player1
  			player = 2;
  			database.ref("Game").child("Player2Here").set("yes");
  			if(snapshot.child("Game").child("Player1Here").val() == null)
  			{//i'm waiting for my opponent
  				$("#gamePlayText2").text("Waiting for an opponent!");
  			}
  			else
  			{
  				$("#gamePlayText2").text("Your opponent is here!");
  				if(snapshot.child("Game").child("Player1Choice").exists())
  				{//my opponent has already chosen!
  					yourChoice	= snapshot.child("Game").child("Player1Choice").val();
			  		$("#gamePlayText2").text("Your opponent has chosen!");
				    $(".otherPic").attr("src","assets/images/what.png");
				    $(".otherPic").addClass("warriorPic2 rounded mx-auto d-block img-fluid col-12");
  				}
  			}
  		}
  		else
  		{
  			alert("The game is full - come back later")
  		}
  	}
 //console.log(snapshot.child("Game").child("Player1Choice").val());
 //console.log(snapshot.child("Game").child("Player1Here").val());
 //console.log(snapshot.child("Game").child("Player2Choice").val());
 //console.log(snapshot.child("Game").child("Player2Here").val());
		// If any errors are experienced, log them to console.
// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  if(player == 1)//remove player 1
  {
  	database.ref("Game").child("Player1Here").remove();
  	database.ref("Game").child("Player1Choice").remove();
  	database.ref("Game").child("Player1Wins").remove();
  	database.ref("Game").child("Player1Losses").remove();
  }
  else if(player == 2)//remove player 2
  {
  	database.ref("Game").child("Player2Here").remove();
  	database.ref("Game").child("Player2Choice").remove();
  	database.ref("Game").child("Player2Wins").remove();
  	database.ref("Game").child("Player2Losses").remove();
  }
  return confirmationMessage;   //Webkit, Safari, Chrome
});
    
$(document).on("click", "#submitmsg" , function(event)//you pick your warrior
{//add a line of chat
  	// Prevent form from submitting
  	event.preventDefault();
  // Get the input values
  var chatLine = $("#usermsg").val().trim();
  database.ref("Chat").set("Player" + player + ":  " +chatLine);
  $('#usermsg').val('');
});

database.ref("Chat").on("value", function(snapshot) 
{
	if(chatset == 1)
	{
		$("#chatLine1").text($("#chatLine2").text());
		$("#chatLine2").text($("#chatLine3").text());
		$("#chatLine3").text(snapshot.val());
	}
	chatset = 1;	
});