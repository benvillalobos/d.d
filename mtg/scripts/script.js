var allCards;
var keys;
var cardElement;

window.onload = function () {
    cardElement = $('#card');
    //testManaSymbols();
    loadJSON(displayRandomCard);
}

function loadJSON(callback) {
    $.getJSON('mtg/assets/AllCards-x.json', function (json) {
        allCards = json;
        keys = Object.keys(allCards);
        callback();
    });
}

function parseMana(mana) {
    return mana.replace(/[{}\/]/g, '').toLowerCase();
}

function manaToHTMLArray(mana) {
    var beginSpan = '<span class="mana small s';
    var endSpan = '"></span>';
    var eachManaAsHTML = [];
    for (var i = 0; i < mana.length; i++) {
        eachManaAsHTML.push(beginSpan + mana[i] + endSpan);
    }
    console.log(eachManaAsHTML);
    return eachManaAsHTML;
}

function manaToHTMLString(mana) {
    //doesn't work?
    //return mana.reduce((acc, val) => {return acc += val});

    var manaAsHTMLArray = manaToHTMLArray(mana);
    var builder = '';
    for(var i = 0; i < manaAsHTMLArray.length; i++) {
        builder += manaAsHTMLArray[i].toString();
    }
    console.log(builder);
    return builder;
}

function getRandomCard() {
    return allCards[keys[keys.length * Math.random() << 0]];
}

function displayRandomCard() {
    var randomCard = getRandomCard();

    var name = randomCard['name'];
    var cost = randomCard['manaCost'];
    var type = randomCard['type'];
    var mainType = randomCard['types'][0];
    var power = randomCard['power'];
    var toughness = randomCard['toughness'];
    var set = randomCard['printings'][0];
    var text = randomCard['text'];

    if (cost) {
        cardElement.append(manaToHTMLString(parseMana(cost)));
    }

    cardElement.append(`<div>
            <p>` + name + ' ' + cost + `</p>
            <p>` + type + ' ' + set + `</p>
            <p>` + text + `</p>
            <p>` + power + `</p>
            <p>` + toughness + `</p>
            </div>`);

    console.log(randomCard);
}

function reset() {
    cardElement.empty();
    while (cardElement.firstChild) {
        cardElement.removeChild(cardElement.firstChild);
    }
    displayRandomCard();
}

