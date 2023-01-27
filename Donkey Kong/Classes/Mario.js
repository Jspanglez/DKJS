const keys = {
    w: {
        pressed: false,
    },
    
    a: {
        pressed: false,
    },

    d: {
        pressed: false,
    },
};

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

              case "a":
                this.keys.a.pressed = true;
                break;

              case "d":
                this.keys.d.pressed = true;
                break;
            }
        });

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
            }
        }); 
    }

    moveX(x) {
        this.x = x
    }

    moveY(y) {
        this.y = y
    }

    drawMario(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill()
        ctx.closePath()
    }

    gravity() {
        this.y += this.speed + this.force
    }

    collision(ctx) {
        let info = ctx.getImageData(this.x, this.y, this.width, this.height)
        for(let i = 0, n = info.data.length; i < n; i += 4) {
            let color = info.data[i];

            if(color == 255) {
                this.y = 345 // Shouldn't be hardcoded
                this.speed = 0
            }
        }
    }
}