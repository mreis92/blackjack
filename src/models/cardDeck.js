const Card = require("./card");

module.exports = class CardDeck {
    constructor(deck) {
        if (deck) {
            this.deck = deck.trim().split(",").map((el) => new Card(el[0], el.substr(1)));
        } else {
            this.deck = this.createShuffledCardDeck();
        }
    }

    /**
     * Creates a standard deck of 52 cards, where each card consists of two characters pair (value-suit)
     */
    createCardDeck() {
        const SUITS = ["C", "D", "H", "S"];
        const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        const deck = [];

        SUITS.forEach((suit) => {
            VALUES.forEach((value) => {
                deck.push(new Card(suit, value));
            });
        });

        return deck;
    }

    /**
     * Creates and shuffle a deck of cards
     */
    createShuffledCardDeck() {
        const deck = this.createCardDeck();

        return this.shuffleDeck(deck);
    }

    /**
     * Receives a deck of cards and outputs a new shuffled deck of cards
     * @param {*} deck - a deck of cards to be shuffled
     * @param {*} forceDifferent - forces the shuffled deck to be different than the original one
     */
    shuffleDeck(deck, forceDifferent = false) {
        const shuffledDeck = [...deck];

        for (let cardIndex = shuffledDeck.length - 1; cardIndex > 0; cardIndex--) {
            const newPosition = Math.floor(Math.random() * (cardIndex + 1));

            [shuffledDeck[cardIndex], shuffledDeck[newPosition]] = [shuffledDeck[newPosition], shuffledDeck[cardIndex]];
        }

        if (forceDifferent && (JSON.stringify(deck) === JSON.stringify(shuffledDeck))) {
            return this.shuffleDeck(deck);
        } else {
            return shuffledDeck;
        }
    }

    /**
     * Deals a number of cards by removing them from the top of the deck
     * @param {*} numberOfCards  - the number of cards to be removed
     */
    dealCards(numberOfCards) {
        const cards = [];

        while (numberOfCards--) {
            cards.push(this.deck.pop());
        }

        return cards;
    }
}
