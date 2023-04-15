const keys = {
    w: {
        pressed: false,
    },
    
    a: {
        pressed: false,
    },

    s: {
        pressed: false,
    },

    d: {
        pressed: false,
    },

    space: {
        pressed: false,
    },
}

let img = new Image()
img.src = './mario_and_luigi_sprites.png'

export class Mario {
    constructor(x, y, width, height, character) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.character = character
        this.force = 5
        this.speed = 0
        this.keys = keys
        this.currentPlatform = null
        this.currentLadder = null
        this.isJumping = false
        this.isOnLadder = false
        this.facingLeft = false
        this.facingRight = true
        this.score = 0

        document.addEventListener("keydown", (e) => {
            switch(e.key) {
                case "w":
                    this.keys.w.pressed = true;
                    break;

                case "s":
                    this.keys.s.pressed = true;
                    break;

                case "a":
                    this.keys.a.pressed = true;
                    break;

                case "d":
                    this.keys.d.pressed = true;
                    break;

                case " ":
                    this.keys.space.pressed = true;
                    break;
            }
        })

        document.addEventListener("keyup", (e) => {
            switch(e.key) {
                case "w":
                    this.keys.w.pressed = false;
                    break;

                case "s":
                    this.keys.s.pressed = false;
                    break;

                case "a":
                    this.keys.a.pressed = false;
                    break;

                case "d":
                    this.keys.d.pressed = false;
                    break;

                case " ":
                    this.keys.space.pressed = false;
                    break;
            }
        });
    }

    setCharacter(character) {
        this.character = character
    }
      
    drawMario(ctx) {

        let x
        let y
        let jump

        if (this.character == "Mario") {
            x = 0
            y = 4
            jump = 53 
        }

        else if (this.character == "Luigi") {
            x = 393
            y = 122
            jump = 445
        }

        ctx.save()
      
        if (this.facingLeft) {

            /* Jumping while facing left */
            if (this.isJumping) {
                ctx.drawImage(img, jump, y, 15, 18, this.x, this.y, this.width, this.height)
            } 
            
            /* Mario is moving left */
            else {
                ctx.drawImage(img, x, y, 15, 18, this.x, this.y, this.width, this.height)
            }
        }
        
        else {
            ctx.save()
            ctx.scale(-1, 1)

            /* Jumping while facing right */
            if (this.isJumping) {
                ctx.drawImage(img, jump, y, 15, 18, -this.x - this.width, this.y, this.width, this.height)
            } 
            
            /* Mario is moving right */
            else {
                ctx.drawImage(img, x, y, 15, 18, -this.x - this.width, this.y, this.width, this.height)
            }

            ctx.restore()
        }

        ctx.strokeStyle = 'white' // color of the border
        ctx.lineWidth = 2 // width of the border

        // Draw a border around the image
        //ctx.strokeRect(this.x, this.y, this.width, this.height)
      
        ctx.restore()
    }
      

    gravity() {
        this.y += (this.speed + this.force) / 9
        this.speed += 0.2
    }

    
    get marioBottom() {
        return this.y + this.height
    }

    collision(platform) {
        // Check if the bottom of Mario overlaps with the platform
        if (this.marioBottom > platform.y && this.marioBottom - this.speed < platform.y + 24 &&
            this.x + this.width - 7 > platform.x && this.x < platform.x + (platform.w * 20) -50) {
          // Collision detected
          this.currentPlatform = platform
          this.isJumping = false
          this.y = platform.y - this.height
          this.force = 5
          this.speed = 0
        }

        /* else {
            // No collision, Mario is falling
            this.currentPlatform = null
        } */
    }

    get marioMiddle() {
        return this.x + this.width / 2
    }

    ladderDetection(ladder) {
        let ladderEnd = ladder.x + 38
    
        // If Mario is above the ladder and pressing the W key, he climbs up
        if (this.marioMiddle >= ladder.x && this.marioMiddle <= ladderEnd && (this.y <= ladder.y && this.y >= ladder.y - 89) && this.keys.w.pressed) {
            this.currentLadder = ladder
            this.speed = 0
            this.y -= 0.2
        }
    
        // If Mario is on the ladder and pressing the S key, he climbs down
        else if (this.marioMiddle >= ladder.x && this.marioMiddle <= ladderEnd && (this.y <= ladder.y && this.y >= ladder.y - 89) && this.keys.s.pressed) {
            this.currentLadder = ladder
            this.speed = 0
            this.y += 0.2
        }
    
        // If Mario is on the ladder and not pressing any keys, he stays still
        else if (this.marioMiddle >= ladder.x && this.marioMiddle <= ladderEnd && (this.y <= ladder.y && this.y >= ladder.y - 89)) {
            this.currentLadder = ladder
            this.speed = 0
        }
    
        // If Mario is not on a ladder, he falls down
        else {
            this.currentLadder = null
        }
    
        /* If you let go of W or S while on a ladder */
        if (this.currentLadder && !this.keys.w.pressed && !this.keys.s.pressed && this.collision && this.currentLadder === ladder) {
            this.force = 0 
            this.speed = 0
        }
    
        /* If you are above a ladder and press W */
        if (this.currentLadder && this.currentPlatform.y < this.currentLadder.y && this.keys.w.pressed) {
            this.y = this.currentPlatform.y - this.height
        }
    }
    

    get jumpLimit() {
        return this.currentPlatform?.y - 90
    }

    move() {
        if (this.keys.space.pressed && !this.isJumping && this.y > this.jumpLimit) {
          this.isJumping = true
          this.jumpHeight = 1000 // height in pixels of the jump
          this.jumpSpeed = 2 // pixels per frame of the jump
        }
      
        if (this.isJumping) {

            if (this.jumpHeight > 0) {
                this.y -= this.jumpSpeed
                this.jumpHeight -= this.jumpSpeed
            }
            
            else {
                this.isJumping = false
            }
        } 
        
        if (this.keys.a.pressed) {
            this.x -= 1
            this.facingLeft = true
            this.facingRight = false
        }
    
        if (this.keys.d.pressed) {
            this.x += 1
            this.facingRight = true
            this.facingLeft = false
        }
    }

    update(ctx, platforms, ladders, character) {
        this.setCharacter(character)

        this.gravity()

        this.move()

        for (let i = 0; i < platforms.length; i++) {
            this.collision(platforms[i])
        }

        for (let i = 0; i < ladders.length; i++) {
            this.ladderDetection(ladders[i])
        }

        this.drawMario(ctx)
    }
    
}