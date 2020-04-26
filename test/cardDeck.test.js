const expect = require("chai").expect;

const CardDeck = require("../models/cardDeck");

describe("test blackjack data structures", () => {
    it("test deck size", () => {
        const cardDeck = new CardDeck();
        const deck = cardDeck.createCardDeck();
        expect(deck.length).equal(52);
    })

    it("test shuffle", () => {
        const cardDeck = new CardDeck();
        const deck = cardDeck.createCardDeck();
        const shuffledDeck = cardDeck.shuffleDeck(deck, true);

        expect(deck.length).equal(52);
        expect(shuffledDeck.length).equal(52);

        expect(shuffledDeck).to.not.be.eql(deck);
    })

    it("test card dealing", () => {
        const NUMBER_OF_CARDS = 5;
        const cardDeck = new CardDeck();
        const originalDeckLength = cardDeck.deck.length;
        const dealtCards = cardDeck.dealCards(NUMBER_OF_CARDS);

        expect(dealtCards.length).to.be.equal(NUMBER_OF_CARDS);
        expect(cardDeck.deck.length).equal(originalDeckLength - NUMBER_OF_CARDS);
    })
})