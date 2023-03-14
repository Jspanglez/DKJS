const scale = 3
const width = 17
const height = 22
const scaledWidth = scale * width
const scaledHeight = scale * height

let img = new Image();
img.src = './mario_and_luigi_sprites.png'
img.onload = function() {
    new Platform()
}

export class Platform {
    constructor(x, y, w) {
        this.x = x
        this.y = y
        this.w = w
    }

    drawPlatform(ctx) {
        const spriteWidth = 20
        const spriteHeight = 24
        const spriteX = 152
        const spriteY = 154
        
        for (let i = 0; i < this.w; i++) {
          const x = this.x + i * 15
          ctx.drawImage(img, spriteX, spriteY, 9, 8, x, this.y, spriteWidth, spriteHeight)
        }
    }
      

    /* drawPlatform(ctx) {
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x2, this.y2)
        ctx.closePath()
        ctx.stroke()
    } */
}