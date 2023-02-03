export class Ladder {
    constructor(x, y, x2, y2) {
        this.x = x
        this.y = y
        this.x2 = x2
        this.y2 = y2
    }

    drawLadder(ctx) {
        ctx.strokeStyle = "cyan";
        ctx.beginPath();
        ctx.lineWidth = 30
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
    }

}