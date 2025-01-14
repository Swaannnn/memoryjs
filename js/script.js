let cardsSelect = [];
let valueSelect = [];
let positionSelect = [];
let values = generateRandomArray();
let isCardClickable = new Array(24).fill(true);
let clickReady = true;
let errors = 0;

let startDiv = document.getElementById('start');
let endDiv = document.getElementById('end');

function startGame() {
    startDiv.style.display = 'none';
    fillCards();
}

function restartGame() {
    endDiv.style.display = 'none';
    cardsSelect = [];
    valueSelect = [];
    positionSelect = [];
    values = generateRandomArray();
    isCardClickable = new Array(24).fill(true);
    clickReady = true;
    errors = 0;
    fillCards();
    showErrors();
}

function generateRandomArray() {
    const values = Array.from({ length: 24 }, (_, i) => (i % 12) + 1);

    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    return values;
}


function fillCards() {
    let cards = document.getElementsByClassName("card");

    Array.from(cards).forEach((card, i) => {
        card.innerHTML = '';
        card.classList.remove('taked');
        card.classList.remove('selected');
        let p = document.createElement("p");
        p.textContent = values[i].toString();
        card.appendChild(p);
    })
}

function clickCard(numCard) {
    if (clickReady && isCardClickable[numCard]) {
        isCardClickable[numCard] = false;

        let card = document.getElementById(`card${numCard}`);

        cardsSelect.push(card);
        valueSelect.push(values[numCard]);
        positionSelect.push(numCard);
        card.classList.add('selected');

        if (cardsSelect.length === 2) {
            clickReady = false;
            if (valueSelect[0] === valueSelect[1]) {
                cardsSelect.forEach((card) => {
                    card.classList.add('taked');
                    card.classList.remove('selected');
                })
                resetChoice();
            } else {
                errors++;
                showErrors();
                setTimeout(() => {
                    positionSelect.forEach((pos) => {
                        isCardClickable[pos] = true;
                    })
                    resetChoice();
                }, 1000);
            }
        }
    }

    if (isCardClickable.every(card => card === false)) {
        endDiv.style.display = 'flex';

        let totalErrorsP = document.getElementById('total-errors');
        totalErrorsP.textContent = `you finish it with ${errors} errors`;
    }
}


function resetChoice() {
    cardsSelect.forEach((card) => {
        card.classList.remove('selected');
    })
    cardsSelect = []
    valueSelect = [];
    positionSelect = [];
    clickReady = true;
}


function showErrors() {
    let errorDiv = document.getElementById("error");
    errorDiv.textContent = `Error : ${errors}`
}
