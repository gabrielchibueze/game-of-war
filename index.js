let deckId
let gabbyScore = 0
let PlayerScore = 0
const newDeck = document.getElementById('new-deck')
const remainingCards = document.getElementById('remaining')
const heading = document.getElementById('heading')
const card1Slot = document.getElementById('card1-slot')
const card2Slot = document.getElementById('card2-slot')
const yourScore = document.getElementById('your-score')
const gabbyScoreEl = document.getElementById('gabby-score')
const drawCard = document.getElementById('draw-card')

newDeck.addEventListener('click', getNewDeckFromAPI)
drawCard.addEventListener('click', displayDrawnCards)

function getNewDeckFromAPI(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(response => response.json())
    .then(data => {
        deckId = data.deck_id
        remainingCards.textContent = `Card Remaining: ${data.remaining}`

    })
}
async function displayDrawnCards(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        card1Slot.innerHTML = `<img src="${data.cards[0].image}" class="retrievedcard">`
        card2Slot.innerHTML = `<img src="${data.cards[1].image}" class="retrievedcard2">`
        heading.textContent = matchingCardWithId(data.cards[0], data.cards[1])

        remainingCards.textContent = `Cards Remaining: ${data.remaining}`
        if(data.remaining === 0){
            drawCard.disabled = true
            if(gabbyScore > PlayerScore){
                heading.textContent = "Gabby won the Game"
            }
            else if(gabbyScore < PlayerScore){
                heading.textContent = "You won the Game!!"
            }
            else {
                heading.textContent = "Its a tie!!"
            }
        }
        else if(data.remaining >0){
            drawCard.disabled = false
        }
    })
}

function matchingCardWithId (card1, card2){
    const cardObj = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ObjIndex = cardObj.indexOf(card1.value)
    const card2ObjIndex = cardObj.indexOf(card2.value)

    if(card1ObjIndex > card2ObjIndex){
        gabbyScore++ 
        gabbyScoreEl.textContent =`Gabby's Score: ${gabbyScore}`
        return "Gabby Wins"
    }
    else if(card1ObjIndex < card2ObjIndex){
        PlayerScore++
        yourScore.textContent =`Your Score: ${PlayerScore}`
        return "You win!"
    }
    else {
        return "its a War"
    }
}

