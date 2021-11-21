const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
var Rollbar = require('rollbar')

app.use(express.json())

app.use(express.static("public"));

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.css"));
  rollbar.log('They need CSS!')
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.js"));
  rollbar.log('Hey, they started me up again')
});

// include and initialize the rollbar library with your access token
var rollbar = new Rollbar({
  accessToken: 'add91fdd46454f7ba7ea7ed90236d4d8',
  captureUncaught: true,rollbar.log('Hello world!')
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
rollbar.warning('It is about to go down!')
rollbar.info('Hey!They want our bots!')
rollbar.log('Players are you ready?!')
rollbar.critical('Get chu your five!')


app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
        rollbar.info('Hey!They want our bots!')
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.critical('Get chu your five!')
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            rollbar.warning('It is about to go down!')
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
        rollbar.log('Players are you ready?!')
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})