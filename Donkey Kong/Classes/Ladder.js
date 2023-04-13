let img = new Image();
img.src = './mario_and_luigi_sprites.png'
img.onload = function() {
    new Ladder()
}

export class Ladder {
    constructor(x, y, h) {
        this.x = x
        this.y = y
        this.h = h
    }

    drawLadder(ctx) {
        if (this.h == 1) {
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 15, 38, 38)
        }
        
        else if (this.h == 2) {
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 15, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 30, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 33, 38, 38)
        }

        else if (this.h == 3) {
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 15, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 30, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 45, 38, 38)
        }

        else if (this.h == 4) {
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 15, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 30, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 45, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 60, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 75, 38, 38)
            ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y - 90, 38, 38)
    }

    /* drawLadder(ctx) {
        ctx.strokeStyle = "cyan";
        ctx.beginPath();
        ctx.lineWidth = 30
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
    } */

}