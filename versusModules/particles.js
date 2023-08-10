// Particles when player moves
export class RunningTrail {
    constructor(game, x, y) {
        this.game = game;
        this.markedForDeletion = false;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 10;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(255, 255, 255, 0.2)';
        this.type = 'Running';
    }

    update(deltaTime) {
        this.x -= this.speedX;
        this.y -= this.speedY;
        this.size *= 0.97;

        // Delete particle once it shrinks to certain size
        if (this.size < 0.5) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {

        // Circles will act as dust trail as player runs
        context.save()
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }
}