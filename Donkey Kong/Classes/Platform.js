const scale = 3
const width = 17
const height = 22

let img = new Image()
img.src = './mario_and_luigi_sprites.png'

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
}