import {Mario} from "./Classes/Mario.js"
import {DK} from "./Classes/DK.js"
import {Barrel} from "./Classes/Barrel.js"
import {Platform} from "./Classes/Platform.js";
import {Ladder} from "./Classes/Ladder.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

let marX = 200
let marY = 600
let marWidth = 45 - 10
let marHeight = 62 - 10

let upPressed = false
let leftPressed = false
let rightPressed = false

let barX = 1000
let barY = 200
let barWidth = 30
let barHeight = 30

// let img = new Image();
// img.src = './mario_and_luigi_sprites.png'
// img.onload = function() {
//   init()
// }

const scale = 3
const width = 17
const height = 22
const scaledWidth = scale * width
const scaledHeight = scale * height

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height,
                  canvasX + 60, canvasY, scaledWidth, scaledHeight)

    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(img, frameX * width, frameY * height, width, height,
                -canvasX - scaledWidth, canvasY, scaledWidth, scaledHeight)
    ctx.restore()
}

// function drawFrame2(frameX, frameY, canvasX, canvasY) {
//     ctx.save()
//     ctx.scale(-1, 1)
//     ctx.drawImage(img2, frameX * width, frameY * height, width, height,
//                   -canvasX - scaledWidth, canvasY, scaledWidth, scaledHeight)
//     ctx.restore()
// }

// function init() {
//     window.requestAnimationFrame(step)
// }

/* function init () {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, width, height, -scaledWidth, 0, scaledWidth, scaledHeight);
    ctx.drawImage(img, 16.5, 0, width, height, -scaledWidth * 2, 0, scaledWidth, scaledHeight);
    ctx.drawImage(img, 0, 0, width, height, -scaledWidth * 3, 0, scaledWidth, scaledHeight);
    ctx.drawImage(img, 35, 0, width, height, -scaledWidth * 4, 0, scaledWidth, scaledHeight);
    ctx.restore();
    window.requestAnimationFrame(animation)
} */

let bottom = canvas.height - barHeight

class Game {
    
    constructor(width, height) {
        this.width = width
        this.height = height
        this.mario = new Mario(marX, marY, marWidth, marHeight, upPressed, leftPressed, rightPressed)
        this.dk = new DK(250, -17)
        //this.barrel = new Barrel(barX, barY, barWidth, barHeight)

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

        //this.dkPlatform = new Platform(120, 106 + 32, 42)

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

        this.dk.drawDK(ctx)
    }

    updateMario() {
        this.mario.update(ctx, this.platforms, this.ladders)
    }

    updateBarrel() {
        this.barrel.update(ctx, this.platforms, this.mario)
    }

    updateDK() {
        /* this.dk.step() */
        this.dk.update(ctx)
    }

    showTitleScreen() {
        // Clear canvas
        ctx.clearRect(0, 0, this.width, this.height)

        // Draw title screen
        const x = (this.width - 700) / 2
        ctx.drawImage(img, x, 10, 700, 400)

        ctx.fillStyle = 'white'
        ctx.font = '16px "Press Start 2P", Arial'
        ctx.textAlign = "center"
        ctx.fillText("Press Enter to Start", this.width / 2, 500)

        // Add event listener for enter key press to start the game
        document.addEventListener("keydown", this.startGame)
    }

        if(this.mario.keys.d.pressed) {
            this.mario.moveX(marX += 3)
        }
    }

    score(ctx) {
        let playerScore = null

        /* if(marX == barX && marY > barY) {
            playerScore = playerScore + 100
        } */

        /* if(marY = 250) {
            playerScore = playerScore + 100
        } */

        ctx.font = "24px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`Score: ${playerScore}`, 8, 20);
    }
}

const game = new Game(canvas.width, canvas.height)

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //game.sprites()
    game.draw(ctx)
    game.move()
    game.gravity(ctx)
    game.collision(ctx)
    //game.barrelRespawn()
    //game.score(ctx)

    window.requestAnimationFrame(animation)
}

const cycleLoop = [0, 1, 2]
let currentLoopIndex = 0
let frameCount = 0

/* function step() {
    //game.sprites()
    frameCount++

    if (frameCount < 10) {
        window.requestAnimationFrame(step);
        return;
    }

    frameCount = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0)
    // drawFrame2(cycleLoop[currentLoopIndex], 0, 0, 0)
    currentLoopIndex++
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0
    }
    window.requestAnimationFrame(step)
} */

requestAnimationFrame(animation)
//requestAnimationFrame(step)