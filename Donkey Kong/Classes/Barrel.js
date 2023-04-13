export class Barrel {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.force = 1
        this.speed = 0
    }

    drawFrame(frameX) {
        this.ctx.drawImage(img, frameX, 106, 13, 15, this.x, this.y, this.width, this.height)
    }

    drawFalling(x) {
        this.ctx.drawImage(img, x, 135, 15, 17, this.x, this.y, this.width, this.height)
    }
    step() {

        this.frameCount++

        if (this.right) {
            if (this.frameCount == 15) {
                this.frameCount = 0
                this.ctx.clearRect(this.x, this.y, this.width, this.height)
                this.drawFrame(this.rollingRight[this.currentLoopIndex])
                this.currentLoopIndex++
        
                if (this.currentLoopIndex >= this.rollingRight.length) {
                    this.currentLoopIndex = 0
                }
            }
        }

        else if (this.left) {
            if (this.frameCount == 15) {
                this.frameCount = 0
                this.ctx.clearRect(this.x, this.y, this.width, this.height)
                this.drawFrame(this.rollingLeft[this.currentLoopIndex])
                this.currentLoopIndex++
        
                if (this.currentLoopIndex >= this.rollingLeft.length) {
                    this.currentLoopIndex = 0
                }
            }
        }

        else if (!this.left && !this.right) {
            if (this.frameCount == 15) {
                this.frameCount = 0
                this.ctx.clearRect(this.x, this.y, this.width, this.height)
                this.drawFalling(this.rollingDown[this.currentLoopIndex])
                this.currentLoopIndex++
        
                if (this.currentLoopIndex >= this.rollingDown.length) {
                    this.currentLoopIndex = 0
                }
            }
        }
    }

    gravity() {
        this.y += this.speed + this.force
    }

    collision(ctx) {
        let info = ctx.getImageData(this.x, this.y, this.width, this.height)
        for(let i = 0, n = info.data.length; i < n; i += 4) {
            let color = info.data[i];

            if(color == 255) {
                this.y = 365
                this.x = this.x - 0.04
                this.speed = 0
            }
        }
    }

    respawn() {
        if (this.y > 775) {
            this.x = 1000
            this.y = 200
        }
    }
}