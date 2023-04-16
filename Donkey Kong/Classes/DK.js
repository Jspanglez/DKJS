let img = new Image()
img.src = './DK_sprites.png'

let img2 = new Image()
img2.src = './mario_and_luigi_sprites.png'

export class DK {
	constructor(x, y, ctx, dkCtx, frameCount) {
		this.x = x
		this.y = y
		this.ctx = ctx
		this.dkCtx = dkCtx
		this.frameCount = frameCount
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
        this.isThrowing = false
        this.throwingDelay = 100
        this.throwingTimer = null
        this.visible = true
        this.counter = 0
        this.displayDuration = 1000
        this.hideDuration = 1000
        this.startTime = 0
        /* this.dkCanvas = document.createElement('canvas')
        this.dkCtx = this.dkCanvas.getContext('2d') */
        /* this.dkCanvas.width = 140
        this.dkCanvas.height = 144 */
	}

	drawDK(ctx) {	
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
		this.dkCtx.drawImage(img, x, 50, width, 38, 0, 0, 140, 144)

        if (x == 280) {
            if (!this.isThrowing) {
                // Start timer and set isThrowing to true
                this.throwingTimer = setTimeout(() => {
                    this.isThrowing = false
                }, this.throwingDelay)
                this.isThrowing = true
            }
        } 
          
        else {
            // Reset timer and set isThrowing to false
            clearTimeout(this.throwingTimer)
            this.isThrowing = false
        }
	}

	step() {
		this.frameCount++
		if (this.frameCount == 80) {
            this.frameCount = 0
            this.dkCtx.clearRect(0, 0, 140, 144)
            const frameData = this.loop[this.loopIndex]
            this.drawFrame(frameData, this.dkCtx)
            this.loopIndex++

            if (this.loopIndex >= this.loop.length) {
                this.loopIndex = 0
            }
		}
	}

    update(ctx) {
        //this.ctx.drawImage(this.dkCanvas, this.x, this.y)
        /* this.dkCtx.clearRect(0, 0, this.dkCanvas.width, this.dkCanvas.height)
            
        // Update the Donkey Kong sprite on its own canvas
        const frameData = this.loop[this.loopIndex]
        this.drawFrame(frameData)
        this.loopIndex++

        if (this.loopIndex >= this.loop.length) {
            this.loopIndex = 0
        }

        // Draw the updated Donkey Kong canvas onto the main canvas
        this.ctx.drawImage(this.dkCanvas, this.x, this.y)  */

        this.step()
        this.drawDK(ctx)
        this.drawHelp(ctx)
    }
}