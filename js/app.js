
//Declare card and move variables

let matchedCard = document.getElementsByClassName("match");
let openedCards = [];
let moves = 0;
const card = document.getElementsByClassName("card");
let cards = [...card];
const counter = document.querySelector(".moves");
const deck = document.querySelector(".deck");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");


//Card event listener
for (let i = 0; i < cards.length; i++){
	cards[i].addEventListener("click", addToArray);
	cards[i].addEventListener("click", displayCard);
}

//Display card function
function displayCard() {
	this.classList.toggle("disabled");
	this.classList.toggle("open");
	this.classList.toggle("show");
	cardOpen();
}
//Push cards to array
function addToArray(){
	openedCards.push(this);
}

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}


//Load shuffled deck at start of game
function startGame() {
	openedCards=[];

	let shuffledCards = shuffle(cards);
	for (let i = 0; i < shuffledCards.length; i++) {
		[].forEach.call(shuffledCards, function (item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled", "noMatch");
	}
	moves = 0;
	counter.innerHTML = moves;
}
window.onload = startGame();

//Modal toggle functions
function toggleModal() {
	modal.classList.toggle("show-modal");
}
function windowOnClick() {
	if (event.target === modal) {
		toggleModal();
	}
}
//Modal event listeners
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
modal.addEventListener("click", toggleModal);

//check if opened cards match
function cardOpen() {
	let length = openedCards.length;
	if (length === 2) {
		moveCounter();
		if (openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
};

//function when selections do match
function matched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show");
	openedCards[1].classList.remove("show");
	openedCards = [];
	checkMatchedCards();
}

//function when selections do not match
function unmatched() {
	openedCards[0].classList.add("noMatch");
	openedCards[1].classList.add("noMatch");
	disable();
	setTimeout(function () {
		openedCards[0].classList.remove("show", "open", "noMatch");
		openedCards[1].classList.remove("show", "open", "noMatch");
		enable();
		openedCards = [];
	}, 1100);
}


//disable cards
function disable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.add('disabled');
	});
}

//enable cards
function enable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

//Moves counter
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
}

//Checks if all cards have been matched
function checkMatchedCards(){
	if (matchedCard.length == 16) {
		toggleModal();
	}
}

/*

1. Display the cards on the page
	A. DONE - shuffle the list of cards using the provided "shuffle" method.
	B. DONE - loop through each card and create its HTML.
	C. DONE - add each card's HTML to the page.

2. Set up the event listener for a card. If a card is clicked:
	A. DONE - display the card's symbol (put this functionality in another function that you call from this one)
	B. DONE - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	C. DONE - if the list already has another card, check to see if the two cards match
		AA. DONE - if the cards match, lock them in the open position (put this functionality in another function that you call from this one)
		BB. DONE - if the cards don't match, remove them from the list and hide the card's symbol (put this functionality in another function)
		CC. DONE - increment the move counter and display it on the page (put this functionality in another function)
		DD.  - if all cards match, display a modal with a message, final rating, and time to win (put this functionality in another function)
		EE.  - i n the modal, the player should be asked if they want to play again.

3.  - When starting a game, a displayed timer should also start. Once the player wins the game, the timer stops.

4.  - The game should display a star rating (from 1 to 3) reflecting the player's performance. It should display at least 3 stars at the start and go down after some moves.

5.  - A restart button should allow the player to reset the game board, the timer, and the star rating.

6.  - All application components are usable across modern desktop, tablet, and phone browsers.
*/
