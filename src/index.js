const baseUrl = 'http://localhost:3000/'
const gamesUrl = baseUrl + 'games/'

const gameListNav = document.getElementById('game-list')

let gameImg = document.getElementById('detail-image')
let gameName = document.getElementById('detail-title')
let gameScore = document.getElementById('detail-high-score')
let highScoreForm = document.getElementById('high-score-form')
let currentGame


function fetchPinballScores() {
    fetch(gamesUrl)
    .then(r => r.json())
    .then(gamesList => addGames(gamesList))
}
fetchPinballScores()

function addGames(scoresList) {
    scoresList.forEach(game => renderGame(game))
    displayFirstGame(scoresList)
}

function renderGame(game) {
    const h5 = document.createElement('h5')
    h5.innerText = game.name + " (" + game.manufacturer_name + ")"
    gameListNav.appendChild(h5)

    h5.addEventListener('click', () => {
        gameImg.src = game.image
        gameName.innerText = game.name
        gameScore.innerText = game.high_score
        currentGame = game
    })
}

function displayFirstGame(gameList) {
    gameImg.src = gameList[0].image
    gameName.innerText = gameList[0].name
    gameScore.innerText = gameList[0].high_score
}

highScoreForm.addEventListener('submit', (e) => {
    e.preventDefault()
    gameScore.innerText = e.target['score-input'].value
    setGameHighScore(e.target['score-input'].value)
})

function setGameHighScore(score) {
    currentGame.high_score = score
}
