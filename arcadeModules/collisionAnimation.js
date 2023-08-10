export class CollisionAnimation {
    constructor() {
        
        // For delaying collision animation
        this.frameX = 0;
        this.fps = Math.random() * 10 + 5;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }

    // Ensure collision animation move with game world
    update(deltaTime) {
        this.x -= this.game.scrollSpeed;
        
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0; // Reset the timer so we can count again

            if (this.frameX > this.maxFrame) {
                this.markedForDeletion = true;
            }

            else {
                this.frameX++;
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

export class FlyingEyeCollision extends CollisionAnimation {
    constructor(game, x, y) {
        super();
        this.game = game;

        // Boom animation when Flying Eye is hit
        this.image = boom; 
        this.maxFrame = 4;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        
        // We want the sprite to be in the middle of the image so we only instantiate this.x and this.y at the end after this.width and this.height variables
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
    }
}
