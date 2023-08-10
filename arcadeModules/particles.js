// Parent Particle class for different states
class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.scrollSpeed;
        this.y -= this.speedY;
        this.size *= 0.97;

        // Delete particle once it shrinks to certain size
        if (this.size < 0.5) {
            this.markedForDeletion = true;
        }
    }
}

// Particles when player moves
export class RunningTrail extends Particle {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 10;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(255, 255, 255, 0.2)';
        this.type = 'Running';
    }

    draw(context) {

        // Circles will act as dust trail as player runs
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

// Particles when player hits the ground after falling
export class LandingCloud extends Particle {
    constructor(game, x, y) {
        super(game);
        this.game = game;
        this.size = Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 6 - 4; // To splash in both directions from player horizontally
        this.speedY = 0; // No movement in the vertical axis

        // For animating dust cloud
        this.image = dust; 
        this.frameX = 0;
        this.maxFrame = 3;
        this.sizeModifier = 0.2
        this.spriteWidth = 400; // 3 / 0.5 / 400x150
        this.spriteHeight = 150;
        this.width = this.spriteWidth * this.sizeModifier; 
        this.height = this.spriteHeight * this.sizeModifier;
        this.frameTimer = 0;
        this.frameInterval = 100;
        this.type = 'Landing';
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.scrollSpeed;

        // Animate dust cloud 
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;

            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } 

            else {
                this.markedForDeletion = true;
            }
        }

        else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}