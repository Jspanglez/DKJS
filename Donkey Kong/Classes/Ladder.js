let img = new Image();
img.src = './mario_and_luigi_sprites.png'
img.onload = function() {
    new Ladder()
}

export class Ladder {
    constructor(x, y, w) {
        this.x = x
        this.y = y
        this.w = w
    }

    drawLadder(ctx) {
        ctx.drawImage(img, 130, 151.5, 10, 9, this.x, this.y, this.w, this.w)
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