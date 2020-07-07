const card = document.querySelectorAll('.card');

let flipped = false;
let cardOne, cardTwo;
let pause = false;

function flipCard() {
	if(pause) return;
	if (this === cardOne) return;

	this.classList.toggle('flip');
	if (!flipped) {
		// click one
		flipped = true;
		cardOne = this;
	} else {
		// click two
		flipped = false;
		cardTwo = this;

		matchCheck();
	}
}

function matchCheck() {
	// match
		if (cardOne.dataset.card === cardTwo.dataset.card) {
			cardOne.removeEventListener('click', flipCard);
			cardTwo.removeEventListener('click', flipCard);
			setTimeout(() => {
				cardOne.classList.add('correct');
				cardTwo.classList.add('correct');
				resetTurns();
			}, 800);
		} else {
			// no match
			pause = true;
			setTimeout(() => {
				cardOne.classList.remove('flip');
				cardTwo.classList.remove('flip');
				resetTurns();
			}, 1800);
		}
}

function resetTurns() {
	[flipped, pause] = [false, false];
	[cardOne, cardTwo] = [null, null];
}

(function shuffle() {
	card.forEach(card => {
		let random = Math.floor(Math.random() * 15);
		card.style.order = random;
	});
})();

card.forEach(flip => flip.addEventListener('click', flipCard));