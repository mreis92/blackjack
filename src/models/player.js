const BLACKJACK = 21;

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    /**
     * Returns the value of the player's hand
     */
    getHandValue() {
        let sum = 0;

        this.hand.forEach((card) => {
            sum += card.score;
        });

        return sum;
    }

    /**
     * Tests if the player should stop play (value >17 )
     */
    shouldStopPlay() {
        const STOP_PLAY = 17;

        return this.score >= STOP_PLAY;
    }

    /**
     * Tests if the player's hand is blackjack (value=21)
     */
    isHandBlackjack() {
        return this.score === BLACKJACK;
    }

    /**
    * Tests if the player's has lost (value > 21)
    */
    hasPlayerLost() {
        return this.score > BLACKJACK;
    }

    toString() {
        return `${this.name}: ${this.hand.join(", ")}`;
    }
}

class Dealer extends Player {
    constructor() {
        super("dealer");
        this.dealer = true;
    }

    /**
     * Tests if the dealer should stop play, under the following conditions:
     * 
     * - If the dealer has a score bigger than the highest score at the table
     * - If the dealer has busted
     * - If the table has won or lost in the first dealt hand
     */
    shouldStopPlay(scoreToBeat, players) {
        const hasTableWinOrBust = players.filter((player1) => !player1.dealer).every((player2) => player2.wins || player2.lost);

        return this.score > scoreToBeat || this.score > BLACKJACK || hasTableWinOrBust;
    }

    /**
    * Tests if the dealer has lost (value > 21 or player won on first hand)
    */
    hasPlayerLost(players) {
        const hasTableWin = players.filter((player1) => !player1.dealer).every((player2) => player2.wins);

        return this.score > BLACKJACK || hasTableWin;
    }
}

module.exports = {
    Dealer,
    Player,
}