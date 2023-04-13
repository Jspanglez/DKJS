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
        this.ladder.drawLadder(ctx)
        this.ladder2.drawLadder(ctx)

        this.ladder3.drawLadder(ctx)
        this.ladder4.drawLadder(ctx)

        this.ladder5.drawLadder(ctx)
        this.ladder6.drawLadder(ctx)

        this.ladder7.drawLadder(ctx)
        this.ladder8.drawLadder(ctx)

        this.ladder9.drawLadder(ctx)
        this.ladder10.drawLadder(ctx)

        this.ladder11.drawLadder(ctx)
        this.ladder12.drawLadder(ctx)
        this.ladder13.drawLadder(ctx)

        this.ladder14.drawLadder(ctx)
        this.ladder15.drawLadder(ctx)
        this.ladder16.drawLadder(ctx)

        //this.barrel.drawBarrel(ctx)
        this.platform.drawPlatform(ctx)
        this.segment.drawPlatform(ctx)
        this.segment2.drawPlatform(ctx)
        this.segment3.drawPlatform(ctx)
        this.segment4.drawPlatform(ctx)
        this.segment5.drawPlatform(ctx)

        this.platform2.drawPlatform(ctx)
        this.segment6.drawPlatform(ctx)
        this.segment7.drawPlatform(ctx)
        this.segment8.drawPlatform(ctx)
        this.segment9.drawPlatform(ctx)
        this.segment10.drawPlatform(ctx)
        this.segment11.drawPlatform(ctx)
        this.segment12.drawPlatform(ctx)
        this.segment13.drawPlatform(ctx)

        this.segment14.drawPlatform(ctx)
        this.segment15.drawPlatform(ctx)
        this.segment16.drawPlatform(ctx)
        this.segment17.drawPlatform(ctx)
        this.segment18.drawPlatform(ctx)
        this.segment19.drawPlatform(ctx)
        this.segment20.drawPlatform(ctx)
        this.segment21.drawPlatform(ctx)
        this.segment22.drawPlatform(ctx)

        this.segment23.drawPlatform(ctx)
        this.segment24.drawPlatform(ctx)
        this.segment25.drawPlatform(ctx)
        this.segment26.drawPlatform(ctx)
        this.segment27.drawPlatform(ctx)
        this.segment28.drawPlatform(ctx)
        this.segment29.drawPlatform(ctx)
        this.segment30.drawPlatform(ctx)
        this.segment31.drawPlatform(ctx)

        this.segment32.drawPlatform(ctx)
        this.segment33.drawPlatform(ctx)
        this.segment34.drawPlatform(ctx)
        this.segment35.drawPlatform(ctx)
        this.segment36.drawPlatform(ctx)
        this.segment37.drawPlatform(ctx)
        this.segment38.drawPlatform(ctx)
        this.segment39.drawPlatform(ctx)
        this.segment40.drawPlatform(ctx)

        this.segment41.drawPlatform(ctx)
        this.segment42.drawPlatform(ctx)
        this.segment43.drawPlatform(ctx)
        this.segment44.drawPlatform(ctx)

        this.dkPlatform.drawPlatform(ctx)

        this.mario.drawMario(ctx)
        this.dk.drawDK(ctx)
    }

    collision(ctx) {
        this.mario.ladderDetection(ctx, this.ladder)
        this.mario.ladderDetection(ctx, this.ladder2)
        this.mario.ladderDetection(ctx, this.ladder3)
        this.mario.ladderDetection(ctx, this.ladder4)

        this.mario.collision(ctx, this.platform, 640)
        this.mario.collision(ctx, this.segment, 110)
        this.mario.collision(ctx, this.segment2, 110)
        this.mario.collision(ctx, this.segment3, 110)
        this.mario.collision(ctx, this.segment4, 110)
        this.mario.collision(ctx, this.segment5, 110)

        this.mario.collision(ctx, this.platform2, 110)
        this.mario.collision(ctx, this.segment6, 110)
        this.mario.collision(ctx, this.segment7, 110)
        this.mario.collision(ctx, this.segment8, 110)
        this.mario.collision(ctx, this.segment9, 110)
        this.mario.collision(ctx, this.segment10, 110)
        this.mario.collision(ctx, this.segment11, 110)
        this.mario.collision(ctx, this.segment12, 110)
        this.mario.collision(ctx, this.segment13, 80)

        this.mario.collision(ctx, this.segment14, 110)
        this.mario.collision(ctx, this.segment15, 110)
        this.mario.collision(ctx, this.segment16, 110)
        this.mario.collision(ctx, this.segment17, 110)
        this.mario.collision(ctx, this.segment18, 110)
        this.mario.collision(ctx, this.segment19, 110)
        this.mario.collision(ctx, this.segment20, 110)
        this.mario.collision(ctx, this.segment21, 110)
        this.mario.collision(ctx, this.segment22, 80)

        this.mario.collision(ctx, this.segment23, 110)
        this.mario.collision(ctx, this.segment24, 110)
        this.mario.collision(ctx, this.segment25, 110)
        this.mario.collision(ctx, this.segment26, 110)
        this.mario.collision(ctx, this.segment27, 110)
        this.mario.collision(ctx, this.segment28, 110)
        this.mario.collision(ctx, this.segment29, 110)
        this.mario.collision(ctx, this.segment30, 110)
        this.mario.collision(ctx, this.segment31, 80)

        this.mario.collision(ctx, this.segment32, 110)
        this.mario.collision(ctx, this.segment33, 110)
        this.mario.collision(ctx, this.segment34, 110)
        this.mario.collision(ctx, this.segment35, 110)
        this.mario.collision(ctx, this.segment36, 110)
        this.mario.collision(ctx, this.segment37, 110)
        this.mario.collision(ctx, this.segment38, 110)
        this.mario.collision(ctx, this.segment39, 110)
        this.mario.collision(ctx, this.segment40, 80)

        this.mario.collision(ctx, this.segment41, 110)
        this.mario.collision(ctx, this.segment42, 110)
        this.mario.collision(ctx, this.segment43, 110)
        this.mario.collision(ctx, this.segment44, 110)

        this.mario.collision(ctx, this.dkPlatform, 640)

        //this.barrel.collision(ctx)
    }   

    /* barrelRespawn() {
        this.barrel.respawn()
    } */

    gravity() {
        this.mario.gravity()
        //this.barrel.gravity()
    }
    
    move() {
        if(this.mario.keys.space.pressed && marY > this.platform.y - 120) {
            this.mario.moveY(marY -= 2)
        }

        else if (!this.mario.keys.space.pressed) {
            marY = 550
        }

        /* if(this.mario.keys.w.pressed) {
            console.log(isLadder)
            this.mario.moveY(marY -= 2)
        } */

        if(this.mario.keys.a.pressed) {
            this.mario.moveX(marX -= 3)
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