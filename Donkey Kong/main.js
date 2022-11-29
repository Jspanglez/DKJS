import {Mario} from "./Classes/Mario.js"
import {Barrel} from "./Classes/barrel.js"

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

let marX = 200
let marY = 200
let marWidth = 50
let marHeight = 50

let barX = 1000
let barY = 200
let barWidth = 30
let barHeight = 30

let leftPressed = false;
let rightPressed = false;
let upPressed = false;

class Start {
    
    constructor(width, height) {
        this.width = width
        this.height = height
        this.mario = new Mario(marX, marY, marWidth, marHeight)
        this.barrel = new Barrel(barX, barY, barWidth, barHeight)
    }

    draw(ctx) {
        this.mario.drawMario(ctx)
        this.mario.drawPlaform(ctx)
        this.barrel.drawBarrel(ctx)
    }

    gravity() {
        this.mario.gravity()
        this.barrel.gravity()
    }

    collision() {
        this.mario.collision()
        this.barrel.collision()
    }

    barrelRespawn() {
        let bottom = canvas.height - barHeight
        if(barY > bottom) {
            barX = 1000
            barY = 200
        }
    }

    movement() {
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
            if(e.key == "Up" || e.key == "ArrowUp") {
                upPressed = true;
            }
        }

        function keyUpHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
            if(e.key == "Up" || e.key == "ArrowUp") {
                upPressed = false;
            }
        }

        if (rightPressed) {
            marX += 5;
        }
        
        else if (leftPressed) {
            marX -= 5;
        }

        if (upPressed) {
            marY -= 15
        }
    }
}

const start = new Start(canvas.width, canvas.height)

function animation() {
    requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    start.draw()
    start.gravity()
    start.collision()
    start.movement()
}

requestAnimationFrame(animation)