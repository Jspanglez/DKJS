export class Mario {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.game = game
        this.gravity = 0.75
        this.gravitySpeed = 0
        this.ySpeed = 0
    }

    drawMario(ctx) {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "blue";
    }

    drawPlaform(ctx) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(50, 400);
        ctx.lineTo(1450, 400);
        ctx.closePath();
        ctx.stroke();
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
                this.y = 350
                this.gravitySpeed = 0
            }
        }
    }
}