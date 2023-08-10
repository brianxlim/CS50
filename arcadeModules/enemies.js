// Parent enemy class for updating and drawing enemies
class Enemy {
    constructor() {
        this.alive = true;

        // For animating enemies
        this.frameX = this.maxFrame;
        
        this.fps = Math.random() * 10 + 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        // Remove from array once enemy is out of the screen or dead
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        
        // Horizontal and vertical movement
        this.x -= this.speedX + this.game.scrollSpeed; // Account for scroll speed when moving enemies, speedX will be instantiated in child classes
        this.y += this.speedY; // speedY will be instantiated in child classes (if applicable)

        if (this.y >= this.game.height - this.height - this.game.groundMargin) { // Bottom bound
            this.y = this.game.height - this.height - this.game.groundMargin;
        }

        // Animating enemy sprite (sprites in spritesheets are in reverse order)
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0; // Restart timer whenever frame changes by one 

            if (this.frameX > 0) {
                this.frameX--;
            }

            else {
                if (this.alive) {
                    this.frameX = this.maxFrame;
                }

                else { // Delete enemy once death animation plays 
                    this.markedForDeletion = true;
                }
            }
        }

        else {
            this.frameTimer += deltaTime; 
        }

        // Delete enemy if it is out of left bound 
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// Air enemy
export class FlyingEye extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.type = "FlyingEye"; // To differentiate different enemy types later 
        this.lives = 1; // Flying Eye needs to be hit once to die
        this.points = 0; // Flying Eye is not worth any points
        this.energy = 10; // Flying Eye is worth 10 energy points
        this.damage = 10; // Flying Eye deals 10 damage points

        // For drawing Flying Eye 
        this.image = FlyingEyeFlight;
        this.maxFrame = 7;
        this.sizeModifier = Math.random() * 0.1 + 0.25; // Randomise sizes of Flying Eyes
        this.spriteWidth = 400;
        this.spriteHeight = 321;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        // For horizontal movement of Flying Eye
        this.x = this.game.width + this.width; // Starts from the right of the screen
        this.speedX = Math.random() * 2 + 2; // Randomise horizontal speed

        // For vertical wave movement of Flying Eye
        this.y = this.game.height * Math.random() * 0.4 + 120; // Ensure it only spawns in top part of canvas
        this.speedY = 0; // Will be changed if it dies 
        this.angle = 0;
        this.angleIncrement = Math.random() * 0.1 + 0.05; // Randomise trajectory of each Eye
        this.amplitude = Math.random() + 2; // Randomise amplitude of sine wave
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.angleIncrement;
        this.y += this.amplitude * Math.sin(this.angle);

        if (this.alive) {
            if (this.game.player.x + this.game.player.width + this.width >= this.x - 15  && this.x + this.width >= this.game.player.x + 15) { 
                this.image = FlyingEyeAtk; // Change to attack animation when sufficiently close 
            }
    
            else {
                this.image = FlyingEyeFlight;
            }
        }
    }
    
    // To execute death animation and turn alive property to false at the same time so the enemy object disappears after it's death animation plays
    death() { 
        this.alive = false;
        this.image = FlyingEyeDeath;
        this.maxFrame = 3;
        this.frameX = this.maxFrame;
        this.speedY = 15;
        this.speedX = 0;
    }
}

// Ground enemy 
export class Goblin extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.type = "Goblin"; 
        this.lives = 10; // Goblin has 10 health
        this.points = 5; // Goblin is worth 5 points
        this.energy = 0; // Goblin is worth no energy points
        this.damage = 25; // Goblin deals 25 damage points

        // For drawing Goblin 
        this.image = GoblinRun;
        this.maxFrame = 7;
        this.runSizeModifier = 0.25;
        this.attackSizeModifier = 0.55; 
        this.sizeModifier = this.runSizeModifier;
        this.spriteWidth = 398;
        this.spriteHeight = 430;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        // For horizontal movement of Goblin
        this.x = this.game.width + this.width; // Starts from the right of the screen
        this.speedX = Math.random() * 2 + 5; // Randomise horizontal speed
        this.runSpeed = this.speedX;

        // For vertical wave movement of Goblin
        this.y = this.game.height - this.height - this.game.groundMargin; // Stay on ground
        this.speedY = 0; 
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (this.alive) {
            if (this.game.player.x + this.game.player.width + this.width >= this.x - 15 && this.x + this.width >= this.game.player.x + 15) {
                this.image = GoblinAtk;
                this.speedX = 0; // Stop to execute attack animation
                this.spriteWidth = 415;
                this.spriteHeight = 210;
                this.sizeModifier = this.attackSizeModifier;
                this.width = this.sizeModifier * this.spriteWidth;
                this.height = this.sizeModifier * this.spriteHeight;
                this.y = this.game.height - this.height - this.game.groundMargin; // Adjust y position based on new height 
            }
    
            else {
                this.image = GoblinRun;
                this.speedX = this.runSpeed;
                this.spriteWidth = 398;
                this.spriteHeight = 430;
                this.sizeModifier = this.runSizeModifier;
                this.width = this.sizeModifier * this.spriteWidth;
                this.height = this.sizeModifier * this.spriteHeight;
                this.y = this.game.height - this.height - this.game.groundMargin;
            }
        }
    }

    death() {
        this.alive = false;
        this.speedX = 0;
        this.image = GoblinDeath;
        this.maxFrame = 3;
        this.frameX = this.maxFrame;
        this.spriteWidth = 400;
        this.spriteHeight = 420;
        this.sizeModifier = 0.35;
        this.width = this.sizeModifier * this.spriteWidth;
        this.height = this.sizeModifier * this.spriteHeight;
        this.y = this.game.height - this.height - this.game.groundMargin;
    }
}

// Stationary ranged enemy 
export class Worm extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.type = "Worm"; 
        this.lives = 1; // Worm has 1 health
        this.points = 8; // Worm is worth 8 points
        this.energy = 0; // Worm is worth no energy points
        this.damage = 0; // Worm itself does no damage (only its fireballs deal damage)

        // For drawing Worm
        this.image = WormIdle;
        this.maxFrame = 8;
        this.sizeModifier = 0.3;
        this.spriteWidth = 400;
        this.spriteHeight = 353;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        // No horizontal and vertical movement of Worm
        this.x = this.game.width + this.width; // Starts from the right of the screen
        this.speedX = 0; // Make worm stationary
        this.y = this.game.height - this.height - this.game.groundMargin; // Stay on ground
        this.speedY = 0; // No vertical movement of Worm

        // Delay shooting fireballs 
        this.attacking = false;
        this.fireballTimer = 0;
        this.fireballInterval = 2000;
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (this.fireballTimer > this.fireballInterval) {
            this.attacking = true;
            this.fireballTimer = 0;
        }

        else if (this.fireballTimer < this.fireballInterval && !this.attacking) {
            this.fireballTimer += deltaTime;
        }

        if (this.alive) {
            if (this.attacking && this.game.player.x + this.game.player.width + this.width >= this.x - 400) {
                this.image = WormAtk;
                this.sizeModifier = 0.33;
                this.maxFrame = 15;
                this.spriteWidth = 495;
                this.width = this.spriteWidth * this.sizeModifier;
                this.height = this.spriteHeight * this.sizeModifier;
                this.y = this.game.height - this.height - this.game.groundMargin; // Stay on ground with new height

                if (this.frameX == 3) {
                    this.game.enemies.push(new Fireball(this.game, this));
                }
            }
    
            else {
                this.image = WormIdle;
                this.sizeModifier = 0.3;
                this.maxFrame = 8;
                this.spriteWidth = 400;
                this.width = this.spriteWidth * this.sizeModifier;
                this.height = this.spriteHeight * this.sizeModifier;
                this.y = this.game.height - this.height - this.game.groundMargin;

                // Prevent sprite from flashing because attack sprite could be animating at frameX higher than maximum number of frames of idle sprite 
                if (this.frameX > this.maxFrame) { 
                    this.frameX = this.maxFrame;
                }
            }
        }
    }

    death() {
        this.alive = false;
        this.speedX = 0;
        this.image = WormDeath;
        this.maxFrame = 7;
        this.frameX = this.maxFrame;
        this.spriteWidth = 473;
        this.width = this.sizeModifier * this.spriteWidth;
    }
}

// Fireball from worm enemy 
export class Fireball extends Enemy {
    constructor(game, worm) {
        super();
        this.game = game;
        this.worm = worm;
        this.type = "Fireball"; 
        this.lives = 99; // Worm has 1 health
        this.points = 0; // Worm is worth 8 points
        this.energy = 0; // Worm is worth no energy points
        this.damage = 15; // Worm itself does no damage (only its fireballs deal damage)

        // For drawing Worm
        this.image = FireballMove;
        this.maxFrame = 5;
        this.sizeModifier = 0.2;
        this.spriteWidth = 400;
        this.spriteHeight = 277;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        // No horizontal and vertical movement of Worm
        this.x = this.worm.x - 20; // Starts from mouth of worm
        this.speedX = Math.random() * 5 + 4; // Make worm stationary
        this.y = this.worm.y + 20; // Stay on ground
        this.speedY = 0; // No vertical movement of Worm
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (this.worm.frameX == 0) {
            this.worm.attacking = false;
        }
    }

    // For fireball to explode 
    death() { 
        this.alive = false;
        this.speedX = 0;
        this.image = FireballExplode;
        this.maxFrame = 6;
        this.frameX = this.maxFrame;
        this.sizeModifier = 0.3; 
        this.spriteHeight = 399;
        this.height = this.spriteHeight * this.sizeModifier;
        this.width = this.spriteWidth * this.sizeModifier;
    }
}