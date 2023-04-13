let img = new Image()
img.src = './DK_sprites.png'

let img2 = new Image()
img2.src = './mario_and_luigi_sprites.png'

export class DK {
	constructor(x, y, ctx, canvas) {
    this.x = x
    this.y = y
		this.ctx = ctx
		this.canvas = canvas
		this.frameCount = 0
		this.loop = [
		[132, 45],
		[334, 45],
		[384, 45],
		[334, 45],
		[384, 45],
		[181, 50],
		[618, 45],
		[280, 50]
		]
		this.loopIndex = 0
        this.visible = true
        this.counter = 0
        this.displayDuration = 1000
        this.hideDuration = 1000
        this.startTime = 0
  }

  drawDK(ctx) {
    const spriteWidth = 120
    const spriteHeight = 124
    const spriteX = 132
    const spriteY = 50

    ctx.drawImage(img, spriteX, spriteY, 40, 38, this.x, this.y, spriteWidth, spriteHeight)
  }
}