import {Mario} from "./Classes/Mario.js"
import {DK} from "./Classes/DK.js"
import {Barrel} from "./Classes/Barrel.js"
import {Platform} from "./Classes/Platform.js"
import {Ladder} from "./Classes/Ladder.js"

const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d", { willReadFrequently: true })

let gameState = "title"
let character = "Mario"
let isGameStarted = false

let sprites = new Image()
sprites.src = './mario_and_luigi_sprites.png'

class Game {
    
    constructor(width, height) {
        this.width = width
        this.height = height
        this.mario = new Mario(200, 608, 35, 52, character)
        this.dk = new DK(250, -5)
        this.barrels = []
        this.score = 0
        this.highScore = 0
        this.lives = 3

        this.choose = (event) => {
            if (event.key === "a") {
                character = "Mario"
                ctx.fillStyle = "red"
                ctx.fillText("Mario", 632, 420)
                ctx.fillStyle = "white"
                ctx.fillText("Luigi", 882, 420)
            } 
            
            else if (event.key === "d") {
                character = "Luigi"
                ctx.fillStyle = "lime"
                ctx.fillText("Luigi", 882, 420)
                ctx.fillStyle = "white"
                ctx.fillText("Mario", 632, 420)
            }
        }

        this.platforms = [
            new Platform(120, 138, 42),
            new Platform(120, 660, 42),
            new Platform(752, 657, 8),
            new Platform(875, 654, 8),
            new Platform(998, 651, 8),
            new Platform(1121, 648, 8),
            new Platform(1244, 645, 8),

            new Platform(1121, 575, 8),
            new Platform(998, 572, 8),
            new Platform(875, 569, 8),
            new Platform(752, 566, 8),
            new Platform(629, 563, 8),
            new Platform(506, 561, 8),
            new Platform(383, 558, 8),
            new Platform(260, 555, 8),
            new Platform(182, 552, 5),

            new Platform(260, 475 + 8, 8),
            new Platform(383, 470 + 8, 8),
            new Platform(506, 465 + 8, 8),
            new Platform(629, 460 + 8, 8),
            new Platform(752, 455 + 8, 8),
            new Platform(875, 450 + 8, 8),
            new Platform(998, 445 + 8, 8),
            new Platform(1121, 440 + 8, 8),
            new Platform(1244, 435 + 8, 5),

            new Platform(1121, 365 + 10, 8),
            new Platform(998, 360 + 10, 8),
            new Platform(875, 355 + 10, 8),
            new Platform(752, 350 + 10, 8),
            new Platform(629, 345 + 10, 8),
            new Platform(506, 340 + 10, 8),
            new Platform(383, 335 + 10, 8),
            new Platform(260, 330 + 10, 8),
            new Platform(182, 325 + 10, 5),

            new Platform(260, 253 + 15, 8),
            new Platform(383, 248 + 15, 8),
            new Platform(506, 243 + 15, 8),
            new Platform(629, 238 + 15, 8),
            new Platform(752, 233 + 15, 8),
            new Platform(875, 228 + 15, 8),
            new Platform(998, 223 + 15, 8),
            new Platform(1121, 218 + 15, 8),
            new Platform(1244, 213 + 15, 5),

            new Platform(1121, 158, 8),
            new Platform(998, 153, 8),
            new Platform(875, 148, 8),
            new Platform(752, 143, 8),

            new Platform(500, 37 + 20, 25),

            new Platform(408, 60 + 20, 6),
        ]

        this.ladders = [
            new Ladder(1125, 612, 1),
            new Ladder(350, 521, 1),
            new Ladder(1125, 413, 1),
            new Ladder(350, 306, 1),
            new Ladder(1125, 196, 1),
            new Ladder(680, 525, 2),
            new Ladder(760, 428, 3),
            new Ladder(845, 110, 2),
            new Ladder(410, 100, 4),
            new Ladder(470, 100, 4),
        ]
    }

    draw(ctx) {
        for(const ladder of this.ladders) {
            ladder.drawLadder(ctx)
        }

        for(const platform of this.platforms) {
            platform.drawPlatform(ctx)
        }
    }

    updateMario(elapsed) {
        this.mario.update(ctx, this.platforms, this.ladders, character, elapsed)
    }

    updateBarrels(elapsed) {

        if (this.dk.isThrowing) {
            this.barrels.push(new Barrel(350, 90, 27, 42))
        }

        for(const barrel of this.barrels) {
            barrel.update(ctx, this.platforms, this.mario, elapsed)
        }
    }

    updateDK(elapsed) {
        this.dk.update(ctx, elapsed)
    }

    getPoints() {
        for (let i = 0; i < this.barrels.length; i++) {
            if (this.barrels[i].scored) {
                this.score += 100
                this.barrels[i].scored = false
            }
        }
    }

    drawPoints() {
        ctx.fillStyle = 'white'
        ctx.font = '16px "Press Start 2P", Arial'
        ctx.fillText(`Score: ${this.score}`, 90, 20)
    }

    resetGame() {
        // Reset player's position to the starting position
        this.mario.x = 200
        this.mario.y = 608

        // Reset the barrels
        this.barrels = []
    }

    loseLife() {
        for (let i = 0; i < this.barrels.length; i++) {
            if (this.barrels[i].dead) {
                this.lives -= 1 
                this.resetGame()
            }
        }
    }

    gameOver() {
        if (this.lives < 0) {
            gameState = "title"
        }

        else if (this.mario.y + this.mario.height == 57) {
            gameState = "title"
            if (this.score > this.highScore) {
                this.highScore = this.score
            }
        }
    }

    playerLives() {
        ctx.fillStyle = 'white'
        ctx.font = '16px "Press Start 2P", Arial'
        const text = `Lives: ${this.lives}`
        const textWidth = ctx.measureText(text).width
        const x = canvas.width - textWidth - 10 
        ctx.fillText(text, x + 60, 20)
    }

    showTitleScreen() {
        // Clear canvas
        ctx.clearRect(0, 0, this.width, this.height)

        this.lives = 3
        this.score = 0
        this.resetGame()

        const img = new Image()
        img.src = './dk_title.png'

        img.onload = () => {
            // Draw title screen
            const x = (this.width - 700) / 2
            ctx.drawImage(img, x, 10, 700, 400)
    
            ctx.fillStyle = 'white'
            ctx.font = '16px "Press Start 2P", Arial'
            ctx.textAlign = "center"
            ctx.fillText("Press Enter to Start", this.width / 2, 500)
            ctx.fillText(`HIGH SCORE: ${this.highScore}`, this.width / 2, 600)
    
            // Add event listener for enter key press to start the game
            document.addEventListener("keydown", this.startSelect)
        }

    }

    startSelect = (event) => {
        if (event.key === "Enter" && gameState === "title") {
            document.removeEventListener("keydown", this.startSelect)
            gameState = "character"
            this.characterSelect()
        }
    }

    characterSelect() {

        ctx.clearRect(0, 0, this.width, this.height)

        ctx.fillStyle = 'white'
        ctx.font = '16px "Press Start 2P", Arial'
        ctx.textAlign = "center"
        ctx.fillText("Select your character", this.width / 2, 200)

        ctx.save()
        ctx.scale(-1, 1)

        ctx.drawImage(sprites, 17, 4, 15, 19, -600 - 60, 300, 60, 90)
        ctx.drawImage(sprites, 409, 122, 15, 19, -850 - 60, 300, 60, 90)

        ctx.restore()

        ctx.fillText("Mario", 632, 420)
        ctx.fillText("Luigi", 882, 420)

        if (character === "Mario") {
            ctx.fillStyle = "red"
            ctx.fillText("Mario", 632, 420)
            ctx.fillStyle = "white"
            ctx.fillText("Luigi", 882, 420)
        } 
        
        else if (character === "Luigi") {
            ctx.fillStyle = "lime"
            ctx.fillText("Luigi", 882, 420)
            ctx.fillStyle = "white"
            ctx.fillText("Mario", 632, 420)
        }
        
        document.addEventListener("keydown", this.choose)

        document.addEventListener("keydown", (event) => this.startGame(event))
    }

    startGame(event) {
        if (event.key === "Enter" && gameState === "character") {

            // Remove event listener
            document.removeEventListener("keydown", (event) => this.startGame(event))
            document.removeEventListener("keydown", this.choose)
            
            gameState = "game"

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Call the update function to start the game loop
            update()
        }
    }
}

const game = new Game(canvas.width, canvas.height)

let previous

function update(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (gameState == "game") {
        isGameStarted = true

        const elapsed = timestamp - previous || 0
        previous = timestamp
        
        game.draw(ctx)
        game.updateMario(elapsed)
        game.updateBarrels(elapsed)
        game.updateDK(elapsed)
        game.drawPoints()
        game.playerLives()
        game.getPoints()
        game.loseLife()
        game.gameOver()

        requestAnimationFrame(update)
    }

    else if (gameState == "title") {
        game.showTitleScreen()
    }

    else if (gameState == "character") {
        game.characterSelect()
    }
}

requestAnimationFrame(update)
