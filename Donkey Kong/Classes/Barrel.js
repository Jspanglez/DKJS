export class Barrel {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.gravity = 0.5
        this.gravitySpeed = 0
        this.ySpeed = 0
    }

    drawBarrel(ctx) {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "brown";
    }

    gravity() {
        this.gravitySpeed += this.gravity;
        this.y += this.ySpeed + this.gravitySpeed
    }

    collision(ctx) {
        let info = ctx.getImageData(this.x, this.y, this.width, this.height)
        for(let i = 0, n = info.data.length; i < n; i += 4) {
            let color = info.data[i];

            if(color == 255) {
                this.y = 365
                this.x = this.x - 0.2
                this.gravitySpeed = 0
            }
        }
    }
}