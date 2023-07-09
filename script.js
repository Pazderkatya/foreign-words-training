const currentWord = document.querySelector('#current-word');
const totalWord = document.querySelector('#total-word');
const wordsProgress = document.querySelector('#words-progress');
const shuffleWords = document.querySelector('#shuffle-words');
const examProgress = document.querySelector('#exam-progress');
const slider = document.querySelector('.slider');
const flipCard = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front');
const frontTitle = document.querySelector('.front-title');
const cardBack = document.querySelector('#card-back');
const backTitle = document.querySelector('.back-title');
const example = cardBack.querySelector('span');
const back = document.querySelector('#back');
const testing = document.querySelector('#exam');
const next = document.querySelector('#next');
const studying = document.querySelector('.study-cards');
const examination = document.querySelector('#exam-cards');


function randomInteger(max) {
    let rand = Math.random() * (max + 1);
    return Math.floor(rand);
}


class Items {
    constructor(title, translation, example) {
        this.title = title;
        this.translation = translation;
        this.example = example;
    }
}

const items1 = new Items("apple", "яблоко", "Apples tone the body no worse than coffee.");
const items2 = new Items("coffee", "кофе", "Coffee is rich in antioxidants that protect our cells from toxins, chemicals, and inflammation.");
const items3 = new Items("spinach", "шпинат", "Spinach has a good effect on vision, helps to maintain youthfulness and skin tone, strengthens the immune system and nervous system.");
const items4 = new Items("cucumber", "огурец", "Over 95% of a cucumber is made up of water.");
const items5 = new Items("linen", "лен", "In addition to the valuable spinning fiber from this plant, mature seeds are also used - for food, as a dietary supplement or a component of baking (flour, sprinkling), smoothies, halva.");

const arr = [items1, items2, items3, items4, items5];

slider.addEventListener("click", function() {
    if (flipCard.classList.contains("active")) {
        flipCard.classList.remove("active");
    } else {
        flipCard.classList.add("active");
    }
});

let currentIndex = 0;

function prepareCard(content) {
    currentWord.textContent = currentIndex + 1;
    frontTitle.textContent = content.title;
    backTitle.textContent = content.translation;
    example.textContent = content.example;
    wordsProgress.value = (currentIndex + 1) / arr.length * 100;
}

prepareCard(arr[currentIndex]);


next.addEventListener('click', function() {
    currentIndex++;
    prepareCard(arr[currentIndex]);
    back.removeAttribute('disabled');
    if (currentIndex == arr.length - 1) {
        next.disabled = true;
    }
})

back.addEventListener('click', function() {
    currentIndex--;
    prepareCard(arr[currentIndex]);
    next.removeAttribute('disabled');
    if (currentIndex == 0) {
        back.disabled = true;
    }
})

shuffleWords.addEventListener('click', function() {
    arr.sort(() => Math.random() - 0.5);
    prepareCard(arr[currentIndex]);

})


totalWord.textContent = arr.length;

let selectedCard;

function createTestCard(object) {
    const divElement = document.createElement('div');
    divElement.classList.add('card');
    const pElement = document.createElement('p');
    pElement.textContent = object;
    divElement.append(pElement);
    divElement.onclick = () => checkTranslationsHandler(divElement);
    return divElement;
}

function addCard() {
    const fragment = new DocumentFragment();
    const newArray = [];
    arr.forEach((array) => {
        newArray.push(createTestCard(array.translation));
        newArray.push(createTestCard(array.title));
    });
    fragment.append(...newArray.sort(() => Math.random() - 0.5));
    examination.innerHTML = "";
    examination.append(fragment);
}


testing.addEventListener('click', function() {
    studying.classList.add('hidden');
    addCard()
})

function checkTranslationsHandler(currentCard) {
    if (!selectedCard) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('correct');
            card.classList.remove('wrong');
        });
        currentCard.style.pointerEvents = "none";
        currentCard.classList.add('correct');
        selectedCard = currentCard;
    } else {
        const wordObject = arr.find(word => word.translation === selectedCard.textContent || word.title === selectedCard.textContent);
        if (wordObject.translation === currentCard.textContent || wordObject.title === currentCard.textContent) {
            currentCard.style.pointerEvents = "none";
            currentCard.classList.add('correct');
            currentCard.classList.add('fade-out');
            selectedCard.classList.add('fade-out');
            const cards = document.querySelectorAll('.card');
            let cardsFaded = true;
            cards.forEach(card => {
                if (!card.classList.contains('fade-out')) {
                    cardsFaded = false;
                }
            });
            if (cardsFaded) {
                setTimeout(() => {
                    alert('Проверка знаний успешно завершена!');
                }, 1000);
            }
        } else {
            selectedCard.classList.add('correct');
            currentCard.classList.add('wrong');
            setTimeout(() => {
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.classList.remove('correct');
                    card.classList.remove('wrong');
                });
            }, 500);
            currentCard.style.pointerEvents = "all";
            selectedCard.style.pointerEvents = "all";
        }
        selectedCard = null;
    }
}