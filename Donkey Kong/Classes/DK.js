let img = new Image()
img.src = './DK_sprites.png'

let img2 = new Image()
img2.src = './mario_and_luigi_sprites.png'

export class DK {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  drawDK(ctx) {
    const spriteWidth = 120
    const spriteHeight = 124
    const spriteX = 132
    const spriteY = 50

    ctx.drawImage(img, spriteX, spriteY, 40, 38, this.x, this.y, spriteWidth, spriteHeight)
  }
}