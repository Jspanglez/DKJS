let img = new Image()
img.src = './mario_and_luigi_sprites.png'

export class Barrel {
    constructor(x, y, width, height, canvas, ctx, DK) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.canvas = canvas
        this.ctx = ctx
        this.DK = DK
        this.force = 0.5
        this.currentPlatform = null
        this.left = false
        this.right = false
        this.rollingRight = [1.5, 16.5, 31.5, 46.5]
        this.rollingLeft = [46.5, 31.5, 16.5, 1.5]
        this.rollingDown = [1.5, 20.5]
        this.currentLoopIndex = 0
        this.frameCount = 0
        this.barrels = []
        this.lastBarrelTimestamp = Date.now()
        this.score = 0
        this.scored = false
        this.lives = 3
        this.dead = false
        this.gameOver = false
        this.frozen = false
    }

    /* drawBarrel(ctx) {
        ctx.drawImage(img, 1.5, 106, 13, 15, this.x + 150, this.y, this.width, this.height)
        ctx.drawImage(img, 16.5, 106, 13, 15, this.x + 200, this.y, this.width, this.height)
        ctx.drawImage(img, 31.5, 106, 13, 15, this.x + 250, this.y, this.width, this.height)
        ctx.drawImage(img, 46.5, 106, 13, 15, this.x + 300, this.y, this.width, this.height)
    } */

    drawFrame(frameX) {
        this.ctx.drawImage(img, frameX, 109, 13, 12, this.x, this.y, this.width, this.height)

        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 2

        // Draw a border around the image
        this.ctx.strokeRect(this.x, this.y, this.width, this.height)
        this.ctx.strokeRect(this.x, this.y - 20, this.width, 1)
    }

    drawFalling(x) {
        this.ctx.drawImage(img, x, 135, 15, 17, this.x, this.y, this.width + 5, this.height + 5)
    }

    step() {

        this.frameCount++

        if (this.right) {
            if (this.frameCount == 15) {
                this.frameCount = 0
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
            this.x -= 1
        }
        
        else if (this.right) {
            this.x += 1
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
        
        else if (this.x === 225 && this.y < 608) {
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

        else if (player.isJumping && (playerMiddle == this.barrelMiddle && (playerBottom < this.y && playerBottom > this.y - 20))) {
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
        ctx.fillText(`Score: ${this.score}`, 90, 20)
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
    
    update(ctx, platforms, player) {

        /* if (this.frozen) {
            return
        } */

        if (this.DK.isThrowing) {
            this.barrels.push(new Barrel(this.x, this.y, this.width, this.height, this.canvas, this.ctx))
        }

        // Update each barrel
        for (let i = 0; i < this.barrels.length; i++) {
            const barrel = this.barrels[i]
            barrel.move()
            barrel.step()
            barrel.gravity()
        }

        for (let i = 0; i < platforms.length; i++) {
            for (let j = 0; j < this.barrels.length; j++) {
                this.barrels[j].collision(platforms[i], player)
            }
        }

        this.points(ctx)
        this.playerLives(ctx)

        for (let i = 0; i < this.barrels.length; i++) {
            if (this.barrels[i].scored) {
                this.score += 100
                //this.barrels[i].scored = false
            }
        }

        /* for (let i = 0; i < this.barrels.length; i++) {
            if (this.barrels[i].dead) {
                this.resetGame(player)
            }
        } */

        if (this.lives < 0) {
            //Game Over
        }
    }
}