const expect = require("chai").expect;

const CardDeck = require("../models/cardDeck");

const { Player } = require("../models/player");

const { dealFirstHand } = require("../index");

describe("test blackjack actions", () => {
    it("deals the first hand ", () => {
        const cardDeck = new CardDeck("HK,SA,DA,DK");
        const players = [new Player("sam"), new Player("dealer")];

        dealFirstHand(cardDeck, players);

        expect(cardDeck.deck.length).equal(0);

        players.forEach((player) => {
            expect(player.hand.length).equal(2);
            expect(player.score).greaterThan(0);
        })
    })
})

