const cardWraps = document.querySelectorAll(".card_wrap");
const cards = document.querySelectorAll(".card");


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;




// Function to flip a card
function flipCard() {
    if (lockBoard || this === firstCard) return;
  
    this.classList.add("open");
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
    } else {
      secondCard = this;
      checkForMatch();
    }
}
  



// Function to check if cards match
 function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}





// Function to disable matched cards
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
  
    resetBoard();
}





// Function to unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  firstCard.classList.add("unmatched");
  secondCard.classList.add("unmatched");

  setTimeout(() => {
    firstCard.classList.remove("open");
    secondCard.classList.remove("open");
    firstCard.classList.remove("unmatched");
    secondCard.classList.remove("unmatched");
    resetBoard();
  }, 1000);
}




// Function to reset the board after checking for matches
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}





// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const cardWrapArray = Array.from(cardWraps);
  shuffle(cardWrapArray);
  
  cardWrapArray.forEach((cardWrap, index) => {
    cardWrap.style.order = index;
});
  



cards.forEach((card) => card.addEventListener("click", flipCard));


// Reveal cards at the beginning
setTimeout(() => {
  cards.forEach((card) => {
    card.classList.add("open");
  });
}, 100);


// Close cards at the beginning
setTimeout(() => {
  cards.forEach((card) => {
    card.classList.remove("open");
  });
}, 2000);



  
