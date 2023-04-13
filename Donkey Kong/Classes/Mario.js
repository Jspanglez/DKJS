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

let img = new Image();
img.src = './mario_and_luigi_sprites.png'
img.onload = function() {
    new Mario()
}

export class Mario {
    constructor(x, y, width, height, up, left, right) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.force = 5
        this.speed = 0
        this.up = up
        this.left = left
        this.right = right
        this.keys = keys

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

    drawMario(ctx) {
        ctx.save()
      
        if (this.facingLeft) {

          if (this.isJumping) {
            ctx.drawImage(img, 53, 0, 15, 22, this.x, this.y, this.width, this.height)
    }

          /* Mario is moving left */
          else {
            ctx.drawImage(img, 0, 0, 15, 22, this.x, this.y, this.width, this.height)
          }
    }

        else {
          ctx.save()
          ctx.scale(-1, 1)

          if (this.isJumping) {
            ctx.drawImage(img, 53, 0, 15, 22, -this.x - this.width, this.y, this.width, this.height)
    }

          /* Mario is moving right */
          else {
            ctx.drawImage(img, 0, 0, 15, 22, -this.x - this.width, this.y, this.width, this.height)
          }

          ctx.restore()
        }
      
        ctx.restore()
    }
      

    gravity() {
        this.y += this.speed + this.force
    }

    /* collision(ctx, platform) {
        // Calculate the x and y coordinates of the four corners of the Mario object
        let marioLeft = this.x
        let marioRight = this.x + this.width
        let marioTop = this.y
        let marioBottom = this.y + this.height
      
        // Check if any of the four corners overlap with the platform
        if (marioBottom > platform.y && marioTop < platform.y + 24 &&
            marioRight > platform.x && marioLeft < platform.x + 170) {
          // Collision detected
          this.y = platform.y - this.height
          this.speed = 0
        }
    } */

    collision(ctx, platform, length) {
        // Calculate the x and y coordinates of the bottom of the Mario object
        let marioBottom = this.y + this.height
      
        // Check if the bottom of Mario overlaps with the platform
        if (marioBottom > platform.y && marioBottom - this.speed < platform.y + 24 &&
            this.x + this.width > platform.x && this.x < platform.x + length) {
          // Collision detected
          this.y = platform.y - this.height
          this.speed = 0
        }
    }

    /* ladderDetection(ctx) {
        let info = ctx.getImageData(this.x, this.y, this.width, this.height)
        for(let i = 0, n = info.data.length; i < n; i += 4) {
            // let red = info.data[i]
            // let green = info.data[i + 1]
            let blue = info.data[i + 2]
            
            if(blue === 255 && this.keys.w.pressed) {
                this.y -= 2
            }
        }
    } */

    ladderDetection(ctx, ladder) {
        let marioMiddle = this.x + this.width / 2
        let ladderEnd = ladder.x + ladder.w
        if(marioMiddle >= ladder.x && marioMiddle <= ladderEnd && this.keys.w.pressed) {
            this.speed = 0
            this.y -= 3
        }
    }

    /* ladderDetection(ctx, ladder) {
        // Calculate the x and y coordinates of the middle of the Mario object
        let marioMiddleX = this.x + this.width / 2
        let marioMiddleY = this.y + this.height / 2
    
        // Check if Mario is near the middle of the ladder and the w key is pressed
        if (this.keys.w.pressed && Math.abs(marioMiddleX - ladder.x) < 10 && marioMiddleY > ladder.y && marioMiddleY < ladder.y + ladder.height) {
            // Ladder detected, move Mario up
            this.y -= 2
        }
    } */

    /* ladderDetection(ctx, ladder) {
        let marioMiddleX = this.x + this.width / 2
        // let marioMiddleY = this.y + this.height / 2
        // let ladderMiddleX = ladder.x + ladder.width / 2
        // let ladderMiddleY = ladder.y + ladder.height / 2

        if(this.keys.w.pressed && (marioMiddleX >= ladder.x && marioMiddleX <= ladder.x + ladder.width)) {
            this.y -= 30
        }
    } */

    /* ladderDetection(ctx, ladder) {
        let marioMiddleX = this.x + this.width / 2;
        let marioBottomY = this.y + this.height;
        
        if (this.keys.w.pressed && 
            marioMiddleX >= ladder.x && 
            marioMiddleX <= ladder.x + ladder.width && 
            marioBottomY >= ladder.y && 
            this.y <= ladder.y + ladder.height) {
          this.y -= 30;
        }
      } */
      
    
}