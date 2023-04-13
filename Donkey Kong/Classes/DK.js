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
		/* Donkey Kong */
		// ctx.drawImage(img, 132, 50, 40, 38, this.x, this.y, 120, 124)
		// ctx.drawImage(img, 332, 50, 50, 38, this.x, this.y, spriteWidth, spriteHeight)
		// ctx.drawImage(img, 382, 50, 50, 38, this.x, this.y, spriteWidth, spriteHeight)
		// ctx.drawImage(img, 332, 50, 50, 38, this.x, this.y, spriteWidth, spriteHeight)
		// ctx.drawImage(img, 382, 50, 50, 38, this.x, this.y, spriteWidth, spriteHeight)
		// ctx.drawImage(img, 181, 50, 45, 38, this.x, this.y, spriteWidth, spriteHeight)
		// ctx.drawImage(img, 618, 50, 40, 38, this.x, this.y, spriteWidth, spriteHeight)
		// ctx.drawImage(img, 280, 50, 45, 38, this.x, this.y, spriteWidth, spriteHeight)
		
		/* Stationary barrels */
		ctx.drawImage(img2, 59.5, 109, 15, 16, 150, 88, 50, 50)
		ctx.drawImage(img2, 59.5, 109, 15, 16, 150, 40, 50, 50)
		ctx.drawImage(img2, 59.5, 109, 15, 16, 195, 88, 50, 50)
		ctx.drawImage(img2, 59.5, 109, 15, 16, 195, 40, 50, 50)

		/* Pauline */
		ctx.drawImage(img2, 18, 243, 20, 22, 510, 5, 50, 50)
	}

    drawHelp(ctx) {

        if (this.visible) {
            ctx.drawImage(img, 264, 100, 25, 30, 570, 0, 60, 60)
        }
    
        const currentTime = performance.now()
    
        if (this.visible && currentTime - this.startTime >= this.displayDuration) {
            this.visible = false
            this.startTime = currentTime
        } 
        
        else if (!this.visible && currentTime - this.startTime >= this.hideDuration) {
            this.visible = true
            this.startTime = currentTime
        }
    }

	drawFrame(frameData) {
		const x = frameData[0]
    	const width = frameData[1]
		this.ctx.drawImage(img, x, 50, width, 38, this.x, this.y, 120 + 20, 124 + 20)
	}

	step() {
		this.frameCount++
		if (this.frameCount == 90) {
		this.frameCount = 0
		this.ctx.clearRect(this.x, this.y, 120, 124)
		const frameData = this.loop[this.loopIndex]
		this.drawFrame(frameData)
		//this.drawFrame(this.loop[this.currentLoopIndex])
		this.loopIndex++

			if (this.loopIndex >= this.loop.length) {
				this.loopIndex = 0
			}
		}
	}

  }
}