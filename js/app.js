
//DECLARING VARIABLES	
const cardList = ["diamond","diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor","bolt", "bolt","cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb",];
const cardId = ["diamond1","diamond2", "paper-plane-o1", "paper-plane-o2", "anchor1", "anchor2","bolt1", "bolt2","cube1", "cube2", "leaf1", "leaf2", "bicycle1", "bicycle2", "bomb1", "bomb2"];
const matchFound = 0;
const gameStarted = false;
const closeCards=[];
const openCards=[];
let turn = $('.moves')

 	

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


//Codes for the main game

function playGame(){

$('.card').click(function(event) {
	let value = $(this).attr('id');
	let value1 = $(this).children('i').attr('id');
 	count +=1;


// check matched cards
	if ($(this).hasClass('match')&&count==1) {
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
 			$(this).addClass('open show')
	}
 	
 	else if (count<=2) {
 			openCards.push(value);
 			closeCards.push(value1);
 			$(this).addClass('open show');
 			

 		if ((openCards[0]===openCards[1])&&(closeCards[0]!==closeCards[1])) {
 				jQuery("#"+closeCards[0]).parent('li').addClass('match');
 				jQuery("#"+closeCards[1]).parent('li').addClass('match');
 				count=0;
 				
 		}	
		
		if(closeCards[0]===closeCards[1]) {
			$(this).addClass('open show')
 			count=1;
 			openCards.pop(value);
 			closeCards.pop(value);
 		}
 		
 		else if (count===2 && $(this).hasClass('match')) {
				count=1;
				openCards.pop(value);
				closeCards.pop(value);
		}	

		else{
 			
 			let counter=1;
				function timeOut(){
				counter--;
				if (counter<=0) {
						clearInterval(loop);
						jQuery("#"+closeCards[0]).parent('li').removeClass('open show');
 						jQuery("#"+closeCards[1]).parent('li').removeClass('open show');
					}
					}
				const loop = setInterval(timeOut,300);}

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
 		$(this).addClass('open show');
 		
    if ($(this).hasClass('match')&&count==1) {
 			while(openCards.length=0){
			openCards.pop(value);}
			while(closeCards.length=0){
			closeCards.pop(value1);}
			count=0;
 		}

 	}
 
//Rating players and ending the game

totalMoves+=1;
for (var k = 0; k <=cardList.length ; k++) {
if($(this).hasClass('match')){
moves+=1;}
}
console.log(moves);
if (totalMoves===1) {
	time();		
}

if (totalMoves/2!==0){

	if (totalMoves/2<=13) {
		if (moves===136) {
			modalBox.threeStar();
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
			moves -= 17;
			totalMoves--;
			$('.modal').addClass('show');
		} 
		else {
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
		}
	}

	else if ((totalMoves/2>13 && totalMoves/2<=18)) {
		if (moves===136) {
			modalBox.twoStar();		
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
			moves-=17;
			totalMoves--;				
		}
		if (timeCount===3) {
			$('.stars').html('');
		}		
		else if (timeCount===2) {
			$('.stars').html('<li><i class="fa fa-star"></i></li>');
		}
		else{
			$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
		}
	}	


	else if ((totalMoves/2>18 && totalMoves/2<=24)) {
		if (moves===136) {
			modalBox.oneStar();
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
			moves-=17
			totalMoves--;			
		}
			
		if (timeCount===3) {
			$('.stars').html('');
		}
		else{	
			$('.stars').html('<li><i class="fa fa-star"></i></li>');
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
		}
	}


	else if ((totalMoves/2>24)) {
		if (moves===136) {
			modalBox.noStar();
			let winTime=$('#timer').html();
			$('#timer').remove();
			$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">'+winTime+'</i>')
			$('.moves').html(' Moves-'+Math.floor(totalMoves/2));
			moves-=17
			totalMoves--;	
		}
		else{
			$('.moves').html('Moves-'+Math.floor(totalMoves/2));
			$('.stars').html('');
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
	$('.restart').html('<i class="fa fa-repeat"></i><i id="timer">00:00</id>');
	$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i>');
	$('.moves').html('Moves-0');
	$('.modal').removeClass('show');
	playGame();
});

$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i>');



//SET TIMER

function convertSeconds(s){
	let mins = Math.floor(s/60);
	let seconds = s%60;
	if (mins<10) {
		mins= '0'+mins; 
	}
	if (seconds<10) {
		seconds = '0'+seconds;
	}
	return mins+":"+seconds;
}


//Counting seconds and assigning star ratings.

function time(){

var timer = $('#timer');
timer.html(convertSeconds(0));

function timeUp(){
if (totalMoves===0&&moves===0) {
	clearInterval(loopA);
	secondsCount=0;
}
else{
	secondsCount++;
	timer.html(convertSeconds(secondsCount));
	
	let displays= $('#timer').html();
	
	if (displays==='00:22') {
		if (totalMoves/2>18&&totalMoves/2<=24) {
			$('.stars').html('<li><i class="fa fa-star"></i></li>');
		}
		else{
			$('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
			timeCount=1;		
		}
	}
	else if (displays==='00:34') {
			if (totalMoves/2>24) {
		$('.stars').html('');
		}
			else{
		$('.stars').html('<li><i class="fa fa-star"></i></li>');
		timeCount=2;	
			}
		}
	else if (displays==='00:42') {
		$('.stars').html('');
		timeCount=3
		}
}
}
const loopA = setInterval(timeUp,1000);
}

//Modal to diplay the final result

const modalBox={
threeStar : function(){
$('.modal').html('<p><h1>INVINCIBLE!!!</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Rating: 3 Stars</h2></p><p><h2>Time Taken--'+$('#timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
},
twoStar : function(){
$('.modal').html('<p><h1>SMOOTH!!</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Rating: 2 Stars</h2></p><p><h2>Time Taken--'+$('#timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
},
oneStar : function(){
$('.modal').html('<p><h1>SWEET!</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Rating: 1 Star</h2></p><p><h2>Time Taken--'+$('#timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
},
noStar : function(){
$('.modal').html('<p><h1>GREAT</h1></p><p><h2>'+$('.moves').html()+'</h2></p><p><h2>Time Taken--'+$('#timer').html()+'</h2></p><p><h3>Do you Want to play again..???<h3></p><i"clicked">Click here</i');
$('.modal').addClass('show');
}

}
