export class Background {
    constructor(game) {
        this.game = game;
        this.image = versusBackground;
        this.birds = [];
        this.birdTimer = 0;
        this.birdInterval = 1000; // Bird spawns every 1000s 

        // Platform coordinates
        this.platformWidth = 180; // Width of each platform
        this.platformHeight = 17; // Height of each platform
        this.platform1x = 207; // x- and y-coordinate of first platform
        this.platform1y = 480;
        this.platform2x = 577; // x- and y-coordinate of second platform
        this.platform2y = 558;
    }

    update(deltaTime) {
        if (this.birdTimer > this.birdInterval) {
            this.birdTimer = 0;
            for (let i = 0; i < 2; i++) {
                this.birds.push(new Bird(this.game));
            }
        }

        else {
            this.birdTimer += deltaTime;
        }

        this.birds.forEach(bird => {
            bird.update(deltaTime);
        })

        this.birds = this.birds.filter(bird => !bird.markedForDeletion);
    }

    draw(context) {
        context.drawImage(this.image, 0, 0);
        this.birds.forEach(bird => {
            bird.draw(context);
        })
    }
}

// To spawn background birds
class Bird extends Background {
    constructor(game) {
        super(game);
        this.birdImage = bird;
        this.spriteWidth = 100;
        this.spriteHeight = 107;
        this.sizeModifier = 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight  * this.sizeModifier;
        this.x = this.game.width + this.width 
        this.y = Math.random() * this.game.height * 0.16 + 20; // Spawn randomly at sky of background
        this.speedX = Math.random() * 3 + 5; // Horizontal movement of bird
        this.frameX = 0;
        this.maxFrame = 7;
        this.fps = 20;
        this.frameInterval = 100 / this.fps; 
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.x -= this.speedX; 
        
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;

            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }

            else {
                this.frameX = 0;
            }
        }

        else {
            this.frameTimer += deltaTime;
        }
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        context.drawImage(this.birdImage, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

        if (this.game.debug) {
            context.save();
            context.strokeStyle = 'yellow';
            context.lineWidth = 3;
            context.strokeRect(207, 480, 180, 46);
            context.strokeRect(577, 558, 180, 46);
            context.restore();
        }
    }
}