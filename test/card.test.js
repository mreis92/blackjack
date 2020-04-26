const expect = require("chai").expect;

const Card = require("../models/card");

describe("test card data structure", () => {
    it("test card score - ace", () => {
        const card = new Card("C", "A");

        expect(card.score).equal(11);
    })

    it("test card score - king", () => {
        const card = new Card("H", "K");

        expect(card.score).equal(10);
    })

    it("test card formatting - ten", () => {
        const card = new Card("S", "10");

        expect(card.label).equal("S10");
    })

    it("test card output - ten", () => {
        const card = new Card("S", "10");
        const result = card.toString();

        expect(result).equal("S10");
    })
})