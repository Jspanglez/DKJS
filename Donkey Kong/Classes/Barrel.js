export class Barrel {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.force = 1
        this.speed = 0
    }

    drawBarrel(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "brown";
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