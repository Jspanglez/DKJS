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
        this.y += this.force
    }

    move() {
        if (this.left) {
            this.x -= 5
    }

        else if (this.right) {
            this.x += 5
        }
    
        if (this.x < 1245 && this.y <= 106) {
            this.right = true
            this.left = false
        } 
        
        else if (this.x === 1245) {
            this.right = false
            this.left = false
        }
    
        if (this.y === 176 || this.y === 391 || this.y === 593) {
            this.left = true
        } 
        
        else if (this.x === 225) {
            this.left = false
        }
    
        if (this.y === 283 || this.y === 500) {
            this.right = true
        }
    
        if (this.x === 225 && this.y === 608) {
            this.left = true
            this.right = false
        }
    }    
    
    get barrelLeft() {
        return this.x
    }

    get barrelRight() {
        return this.x + this.width
    }

    get barrelTop() {
        return this.y
    }

    get barrelBottom() {
        return this.y + this.height
    }

    get barrelMiddle() {
        return (this.x + this.width) / 2
    }

    collision(platform, player) {
        const playerLeft = player.x
        const playerRight = player.x + player.width
        const playerTop = player.y
        const playerBottom = player.y + player.height
        let playerMiddle = (player.x + player.width) / 2
        let playerMiddleY = (player.y + player.height) / 2

        // Check if the bottom of the barrel overlaps with the platform
        if (this.barrelBottom > platform.y && this.barrelBottom - this.force < platform.y + 24 &&
            this.x + this.width - 7 > platform.x && this.x < platform.x + (platform.w * 20) - 50) {
          // Collision detected
          this.currentPlatform = platform
          this.y = platform.y - this.height
        }

        /* Need to limit the accepted y range for getting points */
        else if (player.isJumping && (playerMiddle == this.barrelMiddle && playerMiddle < this.y)) {
            this.scored = true
        }

        /* Losing a life */

        else if (this.barrelLeft < playerRight &&
                 this.barrelRight > playerLeft &&
                 this.barrelTop < playerBottom &&
                 this.barrelBottom > playerTop) {
            this.dead = true
        }

        else {
            // No collision, the barrel is falling
            this.currentPlatform = null
        }
    }

    points(ctx) {
        ctx.fillStyle = 'white'
        ctx.font = '16px "Press Start 2P", Arial'
        ctx.fillText(`Score: ${this.score}`, 80, 20)
    }

    playerLives(ctx) {
        ctx.fillStyle = 'white'
        ctx.font = '16px "Press Start 2P", Arial'
        const text = `Lives: ${this.lives}`
        const textWidth = ctx.measureText(text).width
        const x = this.canvas.width - textWidth - 10 
        ctx.fillText(text, x + 60, 20)
    }

    resetGame(player) {

        /* this.frozen = true

        setTimeout(() => {
            this.frozen = false
        }, 5000) */

        // Reset player's position to the starting position
        player.x = 200
        player.y = 608

        // Reset the barrels
        this.barrels = []

        // Decrease player's lives
        this.lives -= 1 
    }
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