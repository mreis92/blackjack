const expect = require("chai").expect;

const Card = require("../models/card");

const { Dealer, Player } = require("../models/player");

describe("test player", () => {
    it("test hand score", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "Q"), new Card("C", "A")];
    })

    it("test hand score - figures", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "Q"), new Card("C", "A")];
        const score = player.getHandValue();

        expect(score).equal(21);
    })

    it("test hand score - numbers", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "9"), new Card("C", "10")];
        const score = player.getHandValue();

        expect(score).equal(19);
    })

    it("test if player should stop play", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "9"), new Card("C", "10")];
        player.score = player.getHandValue();
        const result = player.shouldStopPlay();

        expect(result).equal(true);
    })

    it("test if player should not stop play", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "2"), new Card("C", "A")];
        player.score = player.getHandValue();
        const result = player.shouldStopPlay();

        expect(result).equal(false);
    })

    it("test if hand is blackjack", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "Q"), new Card("C", "A")];
        player.score = player.getHandValue();

        const result = player.isHandBlackjack();

        expect(result).equal(true);
    })

    it("test if hand is not blackjack", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "2"), new Card("C", "A"), new Card("S", "A")];
        player.score = player.getHandValue();

        const result = player.isHandBlackjack();

        expect(result).equal(false);
    })

    it("test if player lost", () => {
        const player = new Player("sam");
        player.hand = [new Card("H", "8"), new Card("C", "6"), new Card("S", "2"), new Card("H", "A")];
        player.score = player.getHandValue();

        const result = player.hasPlayerLost();

        expect(result).equal(true);
    })

    it("test player's hand output", () => {
        const name = "sam";
        const player = new Player(name);
        player.hand = [new Card("H", "2"), new Card("C", "A"), new Card("S", "10")];
        const result = player.toString();

        expect(result).equal(`${name}: H2, CA, S10`);
    })
})

describe("test dealer", () => {
    let player;
    let dealer;

    beforeEach(() => {
        dealer = new Dealer();
        player = new Player("sam");
    })

    it("test if dealer should stop play - first round", () => {
        player.wins = true;
        dealer.hand = [new Card("H", "Q"), new Card("C", "A")];
        dealer.score = dealer.getHandValue();
        const result = dealer.shouldStopPlay(21, [player]);

        expect(result).equal(true);
    })

    it("test if dealer should stop play - subsequent rounds - player bust", () => {
        player.lost = true;
        dealer.hand = [new Card("H", "Q"), new Card("C", "A")];
        dealer.score = dealer.getHandValue();
        const result = dealer.shouldStopPlay(21, [player]);

        expect(result).equal(true);
    })

    it("test if dealer should not stop play", () => {
        dealer.hand = [new Card("H", "2"), new Card("C", "A")];
        dealer.score = dealer.getHandValue();
        const result = dealer.shouldStopPlay(16, [player]);

        expect(result).equal(false);
    })

    it("test if dealer has lost - table win first round", () => {
        player.wins = true;
        dealer.hand = [new Card("H", "K"), new Card("C", "A")];
        dealer.score = dealer.getHandValue();
        const result = dealer.hasPlayerLost([player]);

        expect(result).equal(true);
    })

    it("test if dealer has lost - dealer bust", () => {
        dealer.hand = [new Card("H", "K"), new Card("C", "6"), new Card("H", "7")];
        dealer.score = dealer.getHandValue();
        const result = dealer.hasPlayerLost([player]);

        expect(result).equal(true);
    })
})
