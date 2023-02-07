import {Mario} from "./Classes/Mario.js"
import {Barrel} from "./Classes/Barrel.js"
import {Platform} from "./Classes/Platform.js";
import {Ladder} from "./Classes/Ladder.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

let marX = 200
let marY = 350
let marWidth = 50
let marHeight = 50

let upPressed = false;
let leftPressed = false;
let rightPressed = false;

let barX = 1000
let barY = 200
let barWidth = 30
let barHeight = 30

let platStartX = 50
let platStartY = 400
let platEndX = 1450
let platEndY = 400

let ladStartX = 1300
let ladStartY = 395
let ladEndX = 1300
let ladEndY = 200

let img = new Image();
img.src = './mario_luigi_sprites.png'
img.onload = function() {
  init()
}

let img2 = new Image();
img2.src = './mario_luigi_sprites.png'
img2.onload = function() {
  init()
}

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
    ctx.drawImage(img2, frameX * width, frameY * height, width, height,
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

function init() {
    window.requestAnimationFrame(step)
}

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

class Start {
    
    constructor(width, height) {
        this.width = width
        this.height = height
        this.mario = new Mario(marX, marY, marWidth, marHeight, upPressed, leftPressed, rightPressed)
        this.barrel = new Barrel(barX, barY, barWidth, barHeight)
        this.platform = new Platform(platStartX, platStartY, platEndX, platEndY)
        this.ladder = new Ladder(ladStartX, ladStartY, ladEndX, ladEndY)
    }

    sprites() {
        init()
    }

    draw(ctx) {
        this.ladder.drawLadder(ctx)
        this.mario.drawMario(ctx)
        this.barrel.drawBarrel(ctx)
        this.platform.drawPlaform(ctx)
        
    }

    collision(ctx) {
        this.mario.collision(ctx)
        this.barrel.collision(ctx)
    }

    barrelRespawn() {
        this.barrel.respawn()
    }

    gravity() {
        this.mario.gravity()
        this.barrel.gravity()
    }

    move() {
        if(this.mario.keys.w.pressed) {
            this.mario.moveY(marY -= 5)
        }

        else {
            marY = 350
        }

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

const start = new Start(canvas.width, canvas.height)

function animation() {
    //start.sprites()
    start.draw(ctx)
    start.move()
    start.gravity(ctx)
    start.collision(ctx)
    start.barrelRespawn()
    //start.score(ctx)
    window.requestAnimationFrame(animation)
}

const cycleLoop = [0, 1, 2]
let currentLoopIndex = 0
let frameCount = 0

function step() {
    //start.sprites()
    frameCount++

    if (frameCount < 14) {
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
}

//requestAnimationFrame(animation)
//requestAnimationFrame(step)