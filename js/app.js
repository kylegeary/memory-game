
/** card and move variables **/
let card = document.getElementsByClassName("card");
let cards = [...card];
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let openedCards = [];
let move = 0;
const counter = document.querySelector(".moves");
const deck = document.querySelector(".deck");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");


/** card and modal event listeners **/
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
modal.addEventListener("click", toggleModal);
for (let i = 0; i < cards.length; i++){
	cards[i].addEventListener("click", addToArray);
	cards[i].addEventListener("click", displayCard);
}

/** game clock **/
let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".clock");
let interval;
function startTimer() {
	interval = setInterval(function () {
		timer.innerHTML = minute + " mins " + second + " secs";
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
		if (minute == 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}

/** Card display, array, and shuffle functions (shuffle from http://stackoverflow.com/a/2450976) **/
function displayCard() {
	this.classList.toggle("disabled");
	this.classList.toggle("open");
	this.classList.toggle("show");
	cardOpen();
}
function addToArray(){
	openedCards.push(this);
}
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

/** Game initiation functions **/
function startGame() {
	openedCards=[];
	let shuffledCards = shuffle(cards);
	for (let i = 0; i < shuffledCards.length; i++) {
		[].forEach.call(shuffledCards, function (item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled", "noMatch");
	}
	move = 0;
	counter.innerHTML = move;
	for (let i = 0; i < stars.length; i++){
		stars[i].style.visibility = "visible";
	}
	second = 0;
	minute = 0;
	hour = 0;
	let clock = document.querySelector(".clock");
	clock.innerHTML = "0 mins 0 secs";
	clearInterval(interval);

}
window.onload = startGame();



/** Modal toggle functions **/
function toggleModal() {
	modal.classList.toggle("show-modal");
}
function windowOnClick() {
	if (event.target === modal) {
		toggleModal();
	}
}

/** Matching functions **/
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
function matched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show");
	openedCards[1].classList.remove("show");
	openedCards = [];
	checkMatchedCards();
}
function unmatched() {
	openedCards[0].classList.add("noMatch");
	openedCards[1].classList.add("noMatch");
	disable();
	setTimeout(function () {
		openedCards[0].classList.remove("show", "open", "noMatch");
		openedCards[1].classList.remove("show", "open", "noMatch");
		enable();
		openedCards = [];
	}, 0750);
}
function checkMatchedCards() {
	if (matchedCard.length == 16) {
		toggleModal();
	}
}


/** Disabling/enabling cards **/
function disable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.add('disabled');
	});
}
function enable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

/** move count related functions **/
function moveCounter() {
	move++;
	counter.innerHTML = move;
	if (move > 8 && move < 12) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = "collapse";
			}
		}
	}
	else if (move > 13) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = "collapse";
			}
		}
	}
	if (move == 1) {
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
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
		EE. DONE - in the modal, the player should be asked if they want to play again.

3. DONE - When starting a game, a displayed timer should also start. Once the player wins the game, the timer stops.

4. DONE - The game should display a star rating (from 1 to 3) reflecting the player's performance. It should display at least 3 stars at the start and go down after some moves.

5.  - A restart button should allow the player to reset the game board, the timer, and the star rating.

6.  - All application components are usable across modern desktop, tablet, and phone browsers.
*/
