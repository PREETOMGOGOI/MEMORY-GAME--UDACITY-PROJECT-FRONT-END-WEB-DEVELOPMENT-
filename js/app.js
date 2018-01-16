
//DECLARING VARIABLES	
const cardList = ["diamond","diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor","bolt", "bolt","cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb",];
const cardId = ["diamond1","diamond2", "paper-plane-o1", "paper-plane-o2", "anchor1", "anchor2","bolt1", "bolt2","cube1", "cube2", "leaf1", "leaf2", "bicycle1", "bicycle2", "bomb1", "bomb2"];
const matchFound = 0;
const gameStarted = false;
const closeCards=[];
const openCards=[];

 	

/*diplay cards on screen*/
function display(){  
for (let j = 0; j < cardList.length; j++) {   
jQuery('.deck').append('<li class="card" id="'+cardList[j]+'"><i class="fa fa-' + cardList[j] + '" id="'+cardId[j]+'""></i></li>');   
}
}   

/*shuffle cards*/

function shuffle(){
    let currentIndex=cardList.length-1,temporaryValue1,temporaryValue2,randomIndex;
    for (let j=cardList.length; j>=0; j--){
        randomIndex = Math.floor(Math.random()*j);
        temporaryValue1=cardList[currentIndex];
        temporaryValue2=cardId[currentIndex];
        cardList[currentIndex]=cardList[randomIndex];
        cardId[currentIndex]=cardId[randomIndex];
        cardList[randomIndex] = temporaryValue1;
        cardId[randomIndex]=temporaryValue2;
        }
        
display();
}
shuffle();
playGame();

//variables to count the number of mouse click events,check the number of matched cards and time elasped
let count = 0;
let moves = 0;
let totalMoves = 0;
let secondsCount = 0;
let timeCount=0;
let timeStart =0;

//Codes for the main game

function playGame(){

$('.card').click(function(event) {
	let value = $(this).attr('id');
	let value1 = $(this).children('i').attr('id');
 	count +=1;
 	timeStart+=1;
 
 //Initiate Timer	
	if (timeStart===1){
 		time();
	}
    
		
	if ($(this).hasClass('match')&&count===1) {
 			while(openCards.length=0){
			openCards.pop(value);}
			while(closeCards.length=0){
			closeCards.pop(value1);}
			count=0;
			
 		}
 	
	if (count===1) {
		    while(openCards.length=0){
			openCards.pop(value);}
			while(closeCards.length=0){
			closeCards.pop(value1);}
 			openCards.push(value);
 			closeCards.push(value1);
 			$(this).addClass('open')
	}
 	
 	else if (count<=2) {
 			openCards.push(value);
 			closeCards.push(value1);
 			$(this).addClass('open');
 			
//Checking for matched cards
 		if ((openCards[0]===openCards[1])&&(closeCards[0]!==closeCards[1])) {
 				jQuery("#"+closeCards[0]).parent('li').addClass('match show');
 				jQuery("#"+closeCards[1]).parent('li').addClass('match show');
 				totalMoves+=1;
 				count=0;
 				moves+=1;
 		}	
		
		if(closeCards[0]===closeCards[1]) {
			$(this).addClass('open')
 			count=1;
 			openCards.pop(value);
 			closeCards.pop(value);
 		}	
 		else if (count===2) {
 			if ($(this).hasClass('match')) {
				count=1;
				openCards.pop(value);
				closeCards.pop(value);
			}	
	
		else{
 			totalMoves+=1;
 			let counter=1;
 	
// Flipping cards back to hidden position if two cards are not similar	
				function timeOut(){
				counter--;
				if (counter<=0) {
						clearInterval(loop);
						jQuery("#"+closeCards[0]).parent('li').removeClass('open');
 						jQuery("#"+closeCards[1]).parent('li').removeClass('open');
					}
					}
				const loop = setInterval(timeOut,300);}
 		}
 }

 	else if (count>2) {
 		count=1;
 		while(openCards.length=0){
	       openCards.pop(value);
		}
		while(closeCards.length=0){
           closeCards.pop(value1);
		}
 		openCards.push(value);
 		closeCards.push(value1);
 		$(this).addClass('open');
 		
    if ($(this).hasClass('match')&&count==1) {
 			while(openCards.length=0){
			openCards.pop(value);}
			while(closeCards.length=0){
			closeCards.pop(value1);}
			count=0;
 		}

 	}
 

//Rating players and ending the game

if (totalMoves!==0){

	if (totalMoves<=13) {
		if (moves===8) {
			modalBox.threeStar();
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+(totalMoves));
			moves =0;
			totalMoves=0;
		} 
		else {
			$('.moves').html(' Moves-'+(totalMoves));
		}
	}

	else if ((totalMoves>13 && totalMoves<=20)) {
		if (moves===8) {
			modalBox.twoStar();		
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+(totalMoves));
			moves=0
			totalMoves=0;				
		}
		if (timeCount===2) {
			$('.stars').html('<li><i class="fa fa-star"></i></li>');
		}
		else{
			$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
			$('.moves').html(' Moves-'+(totalMoves));
		}
	}	


	else if (totalMoves>20) {
		if (moves===8) {
			modalBox.oneStar();
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+(totalMoves));
			moves=0
			totalMoves=0;			
		}
		else{	
			$('.stars').html('<li><i class="fa fa-star"></i></li>');
			$('.moves').html(' Moves-'+Math.floor(totalMoves));
		}
	}

}
})
}
 

 /*Restart the game*/
  $('.restart, .modal').click(function(event) {
  	$('.card').remove();
  	shuffle();
	totalMoves=0;
	moves=0;
	timeCount=0;
	timeStart=0;
	$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">00:00</id>');
	$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i>');
	$('.moves').html('Moves-0');
	$('.modal').removeClass('show');
	playGame();
});

$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i>');



/*SET TIMER*/

//Timer to be displayed
function convertSeconds(s){
	let mins = Math.floor(s/60);
	let seconds = s%60;
	let minsDisplay= mins;
	let secondsDisplay =seconds;
	if (mins<10) {
		mins= '0'+mins; 
	}
	if (seconds<10) {
		seconds = '0'+seconds;
	}
	return mins+":"+seconds;
}

//Display the time taken to win the game
function winTime(t){
	let mins = Math.floor(t/60);
	let seconds = t%60;
	if (mins=0) {
		return seconds+'sec';
	}
	else {
		return mins+'min '+seconds+'sec'
	}
}

//Counting seconds and assigning star ratings.

function time(){

var timer = $('#timer');
let dummyTimer = $('#dummy_timer')
timer.html(convertSeconds(0));
dummyTimer.html(winTime(0));


function timeUp(){
if (timeStart==0) {
	clearInterval(loopA);
	secondsCount=0;
}
else{
	secondsCount++;
	timer.html(convertSeconds(secondsCount));
	dummyTimer.html(winTime(secondsCount));
	let displays= $('#timer').html();
	
	if (displays==='00:22') {
		if (totalMoves>20) {
			$('.stars').html('<li><i class="fa fa-star"></i></li>');
		}
		else{
			$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
			timeCount=1;		
		}
	}
	else if (displays==='00:34') {	
		$('.stars').html('<li><i class="fa fa-star"></i></li>');		
		}
	}
}
const loopA = setInterval(timeUp,1000);
}

//Modal to diplay the final result

const modalBox={
threeStar : function(){	
$('.modal').html('<p><h1>INVINCIBLE!!!</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Rating: 3 Stars</h2></p><p><h2>Time Taken--'+$('#dummy_timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
},
twoStar : function(){
$('.modal').html('<p><h1>SMOOTH!!</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Rating: 2 Stars</h2></p><p><h2>Time Taken--'+$('#dummy_timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
},
oneStar : function(){
$('.modal').html('<p><h1>SWEET!</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Rating: 1 Star</h2></p><p><h2>Time Taken--'+$('#dummy_timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
}
}
