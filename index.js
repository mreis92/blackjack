const fs = require('fs').promises;

const CardDeck = require("./models/cardDeck");
const { Dealer, Player } = require("./models/player");

/**
 * Deals the first hand of the game to the players at the table
 * @param {*} deck - a deck of cards
 * @param {*} players - the player for whom the hand is dealt
 */
function dealFirstHand(deck, players) {
    players.forEach((player) => {
        player.hand = deck.dealCards(2);
        player.score = player.getHandValue();
        player.wins = player.isHandBlackjack();
        player.lost = player.hasPlayerLost(players);
    })
}

/**
 * Deals the remaining hands to the players at the table.
 * Returns the highest non-losing score of the game
 * @param {*} deck - a deck of cards
 * @param {*} players - the players for whom the hand is dealt
 */
function dealRemainingHands(deck, players) {
    let highestScore = 0;

    players.forEach((player) => {
        while (!player.shouldStopPlay(highestScore, players)) {
            player.hand = [...player.hand, ...deck.dealCards(1)];
            player.score = player.getHandValue();
        }

        if (!player.hasPlayerLost(players)) {
            highestScore = highestScore < player.score ? player.score : highestScore;
        } else {
            player.lost = true;
        }
    })

    return highestScore;
}

/**
 * Prints the winner of the game. The player in the array of @players with the @highestScore
 * gets output
 * @param {*} highestScore - the highest non-losing score of the game
 * @param {*} players - an array of players
 */
function printGameWinner(highestScore, players) {
    let winner = [];

    players.forEach((player) => {
        if (!player.lost && player.score === highestScore) {
            winner.push(player.name);
        }
    })

    console.log(winner.length === 0 ? "dealer" : winner.join(","));
}

/**
 * Prints the hand of each player
 * @param {*} players - an array of players
 */
function printPlayerHands(players) {
    players.forEach((player) => {
        console.log(player + "");
    })
}

/**
 * Plays a blackjack game between a player and a dealer
 * @param {*} fileDeck (optional) - a deck of cards for the game to be played with
 */
function playBlackjack(fileDeck) {
    const deck = new CardDeck(fileDeck);
    const players = [new Player("sam"), new Dealer()];

    dealFirstHand(deck, players);

    const highestScore = dealRemainingHands(deck, players);

    printGameWinner(highestScore, players);
    printPlayerHands(players);
}

/**
 * Launches the Blackjack program. Starts the game with a deck passed as a file,
 * or a random generated deck if one is not provided.
 */
async function startProgram() {
    if (process.argv[2]) {
        const data = await fs.readFile(process.argv[2], 'utf-8');
        playBlackjack(data);
    } else {
        playBlackjack();
    }
}

startProgram();

