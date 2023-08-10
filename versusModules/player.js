import { StandingLeft, StandingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight, Atk1Left, Atk1Right, Atk2Left, Atk2Right, HitLeft, HitRight, DeathLeft, DeathRight } from "./states.js";

class Player {
    constructor(game, playerNum) {
        this.game = game;
        this.playerNum = playerNum;

        // Player attributes
        this.energy = 100;
        this.health = 100;
        this.dead = false;
        
        // Store player particle effects
        this.particles = [];

        // Spawn each player at different places using a ternary operator
        this.x = (this.playerNum == 1) ? 150 : 680;

        // Manage player in different states
        this.states = [new StandingLeft(this.game, this), new StandingRight(this.game, this),
                       new RunningLeft(this.game, this), new RunningRight(this.game, this),
                       new JumpingLeft(this.game, this), new JumpingRight(this.game, this),
                       new FallingLeft(this.game, this), new FallingRight(this.game, this), 
                       new Atk1Left(this.game, this), new Atk1Right(this.game, this),
                       new Atk2Left(this.game, this), new Atk2Right(this.game, this),
                       new HitLeft(this.game, this), new HitRight(this.game, this),
                       new DeathLeft(this.game, this), new DeathRight(this.game, this)];

        // Adopt different starting stance for different players
        if (this.playerNum == 1) {
            this.currentState = this.states[1];
        }

        else {
            this.currentState = this.states[0];
        }

        // Animating player in various states
        this.frameX = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        // Movement of player
        this.speedX = 0;
        this.speedY = 0;
        this.weight = 1;
        
        // Sounds of player in attack and hit states
        this.attackSound = new Audio();
        this.attackSound.src = "../static/particles/swordSwing.wav";
        this.damageSound = new Audio();
        this.damageSound.src = "../static/particles/takeDamage.mp3";
    }

    update(deltaTime, input) {

        // Detect input 
        this.currentState.handleInput(input);

        // Update particles
        this.particles.forEach(particle => {
            particle.update(deltaTime);
        });

        // ---------------------------
        // Animating sprite (if alive)
        // ---------------------------
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0 // Reset timer so can continue animating

            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }

            else if (!this.dead && this.frameX >= this.maxFrame) {                
                this.frameX = 0;
            }
        }

        else {
            this.frameTimer += deltaTime;
        }

        // -------------------
        // Horizontal movement
        // -------------------
        this.x += this.speedX;

        // So player can move in air 
        if (input.includes('ArrowRight') || input.includes('d')) { // Moving right
            this.speedX = 10;
        }

        else if (input.includes('ArrowLeft') || input.includes('a')) { // Moving left
            this.speedX = -10;
        }

        else { // Require user to hold button to keep moving
            this.speedX = 0;
        }

        if (this.x < 0) { // Left bound
            this.x = 0;
        }

        else if (this.x > this.game.width - this.width) { // Right bound
            this.x = this.game.width - this.width;
        }

        // -----------------
        // Vertical movement
        // -----------------
        this.y += this.speedY;
        if (this.onGround() || ((!this.isAttacking() && !this.isJumping()) && this.onPlatform())) { 
            this.speedY = 0;
        }

        else { // Upward speed starts to reduce when player leaves the ground 
            this.speedY += this.weight
        }

        if ((this.y >= this.game.height - this.height - this.game.groundMargin) && !this.isAttacking()) { // Bottom boundary
            this.y = this.game.height - this.height - this.game.groundMargin;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        
        // Draw particles for each player
        this.particles.forEach(particle => {
            particle.draw(context);
        })

        if (this.game.debug) {
            context.save();
            context.strokeStyle = 'red';
            context.lineWidth = 3;
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.restore();
        }
    }

    // Check if player is on ground level
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    // Check if player is on either platform
    onPlatform() {
        return (this.y + this.height + 5 >= this.game.background.platform1y && this.y + this.height + 5 <= this.game.background.platform1y + this.game.background.platformHeight && this.x + this.width / 2 >= this.game.background.platform1x && this.x + this.width / 2 <= this.game.background.platform1x + this.game.background.platformWidth) || 
               (this.y + this.height + 5 >= this.game.background.platform2y && this.y + this.height + 5 <= this.game.background.platform2y + this.game.background.platformHeight && this.x + this.width / 2 >= this.game.background.platform2x && this.x + this.width / 2 <= this.game.background.platform2x + this.game.background.platformWidth)
    }

    // Check if player is jumping
    isJumping() {
        return this.currentState == this.states[4] || this.currentState == this.states[5];
    }

    // Check if player is attacking
    isAttacking() {
        return [8, 9, 10, 11].includes(this.states.indexOf(this.currentState));
    }

    // Check if player is getting hit
    isHit() {
        return this.currentState == this.states[12] || this.currentState == this.states[13];
    }

    // Allow players to switch in between states
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}

export class Uzui extends Player {
    constructor(game, playerNum) {
        super(game, playerNum);
        this.name = 'uzui';

        // Spawn different states according to player number
        if (this.playerNum == 1) {
            this.image = UzuiIdle; 
            this.maxFrame = 3;
            this.spriteWidth = 399;
            this.spriteHeight = 520;
            this.sizeMultiplier = 0.23;
            this.width = this.sizeMultiplier * this.spriteWidth;
            this.height = this.sizeMultiplier * this.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }

        else {
            this.image = UzuiIdleLeft; 
            this.maxFrame = 3;
            this.spriteWidth = 399;
            this.spriteHeight = 520;
            this.sizeMultiplier = 0.23;
            this.width = this.sizeMultiplier * this.spriteWidth;
            this.height = this.sizeMultiplier * this.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }
    } 

    update(deltaTime, input) {
        super.update(deltaTime, input);
    }
    
    draw(context) {
        super.draw(context);
    }
}

export class Raijin extends Player {
    constructor(game, playerNum) {
        super(game, playerNum);
        this.name = 'raijin';

        if (this.playerNum == 1) {
            this.image = RaijinIdle; 
            this.maxFrame = 7;
            this.spriteWidth = 395;
            this.spriteHeight = 500;
            this.sizeMultiplier = 0.25;
            this.width = this.sizeMultiplier * this.spriteWidth;
            this.height = this.sizeMultiplier * this.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }

        else {
            this.image = RaijinIdleLeft; 
            this.maxFrame = 7;
            this.spriteWidth = 400;
            this.spriteHeight = 520;
            this.sizeMultiplier = 0.25;
            this.width = this.sizeMultiplier * this.spriteWidth;
            this.height = this.sizeMultiplier * this.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }
    } 

    update(deltaTime, input) {
        super.update(deltaTime, input);
    }
    
    draw(context) {
        super.draw(context);
    }
}

export class Lee extends Player {
    constructor(game, playerNum) {
        super(game, playerNum);
        this.name = 'lee';

        if (this.playerNum == 1) {
            this.image = LeeIdle; 
            this.maxFrame = 9;
            this.spriteWidth = 399;
            this.spriteHeight = 373;
            this.sizeMultiplier = 0.28;
            this.width = this.sizeMultiplier * this.spriteWidth;
            this.height = this.sizeMultiplier * this.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }
        
        else {
            this.image = LeeIdleLeft; 
            this.maxFrame = 9;
            this.spriteWidth = 400;
            this.spriteHeight = 373;
            this.sizeMultiplier = 0.28;
            this.width = this.sizeMultiplier * this.spriteWidth;
            this.height = this.sizeMultiplier * this.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }
    } 

    update(deltaTime, input) {
        super.update(deltaTime, input);
    }
    
    draw(context) {
        super.draw(context);
    }
}