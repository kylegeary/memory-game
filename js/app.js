//CARD VARIABLES
const deck = document.querySelector(".deck");
const card = document.getElementsByClassName("card");
let cards = [...card];
let openedCards = [];
let matchedCard = document.getElementsByClassName("match");
let matchedCards = [...card];

//STAR VARIABLES
const star = document.querySelectorAll(".fa-star");
let stars = [...star];
let starScore = "";

//MOVE VARIABLES
let move = 0;
const counter = document.querySelector(".moves");
const modal = document.querySelector(".modal");

//CARD EVENT LISTENERS
for (let i = 0; i < cards.length; i++){
	cards[i].addEventListener("click", addToArray);
	cards[i].addEventListener("click", displayCard);
}

//GAME CLOCK FUNCTION
const clock = document.querySelector(".clock");
let second = 0, minute = 0; hour = 0;
let time;
function startTimer() {
	time = setInterval(function () {
		if (modal.classList.contains("modalShow") != true) {
			clock.innerHTML = minute + " mins " + second + " secs";
			second++;
			if (second == 60) {
				minute++;
				second = 0;
			}
			if (minute == 60) {
				hour++;
				minute = 0;
			}
		}
	}, 1000);
}

//GAME START FUNCTIONS (shuffle from http://stackoverflow.com/a/2450976)
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
function startGame() {
	modal.classList.remove("modalShow")
	openedCards = [];
	starScore = "";
	let shuffledCards = shuffle(cards);
	for (let i = 0; i < shuffledCards.length; i++) {
		[].forEach.call(shuffledCards, function (item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled", "noMatch");
	}
	move = 0;
	counter.innerHTML = move;
	for (let i = 0; i < stars.length; i++) {
		stars[i].style.visibility = "visible";
	}
	second = 1;
	minute = 0;
	hour = 0;
	let clock = document.querySelector(".clock");
	clock.innerHTML = "0 mins 0 secs";
	clearInterval(time);
}
window.onload = startGame();

//CARD FUNCTIONS
function displayCard() {
	this.classList.toggle("disabled");
	this.classList.toggle("open");
	this.classList.toggle("show");
	cardOpen();
}
function addToArray(){
	openedCards.push(this);
}
function cardOpen() {
	let length = openedCards.length;
	if (length === 2) {
		moveCounter();
		if (openedCards[0].type === openedCards[1].type) {
			cardMatched();
		} else {
			cardUnmatched();
		}
	}
}
function cardMatched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show");
	openedCards[1].classList.remove("show");
	openedCards = [];
	checkMatchedCards();
}
function cardUnmatched() {
	openedCards[0].classList.add("noMatch");
	openedCards[1].classList.add("noMatch");
	cardDisable();
	setTimeout(function () {
		openedCards[0].classList.remove("show", "open", "noMatch");
		openedCards[1].classList.remove("show", "open", "noMatch");
		cardEnable();
		openedCards = [];
	}, 1000);
}
function checkMatchedCards() {
	if (matchedCard.length == 16) {
		gameOver();
	}
}
function cardSetClass() {
	for (let i = 0; i < card.length; i++) {
		matchedCards[i].classList.add("open");
		matchedCards[i].classList.add("show");
		matchedCards[i].classList.add("match");
		matchedCards[i].classList.add("disabled");
	}
}
function cardDisable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.add('disabled');
	});
}
function cardEnable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

//MOVE FUNCTION
function moveCounter() {
	move++;
	counter.innerHTML = move;
	if (move > 8 && move < 12) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = "collapse";
				stars[i].classList.remove("active");
			}
		}
	}
	else if (move > 13) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = "collapse";
				stars[i].classList.remove("active");
			}
		}
	}
	if (move == 1) {
		second = 1;
		minute = 0;
		hour = 0;
		startTimer();
	}
}
//GAME END FUNCTIONS
function gameScore() {
	let starNode = document.querySelectorAll(".active");
	for (let i = 0; i < starNode.length; i++) {
		starScore += "<i class='fa fa-star'></i>";
	}
}
function toggleModal() {
	modal.classList.toggle("modalShow");
}
function gameOver() {
	let completionTime = document.querySelector(".completionTime");
	let finalMoves = document.querySelector(".finalMoves");
	let starRating = document.querySelector(".starRating");
	moveCounter();
	gameScore();
	starRating.innerHTML = "Score: " + starScore;
	finalMoves.innerHTML = "Moves: " + move;
	completionTime.innerHTML = "You finished in " + minute + " minutes " + (second - 1) + " seconds.";
	cardSetClass();
	toggleModal();
}
