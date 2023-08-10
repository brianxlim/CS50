import { Idle, Run, Jump, Fall, Atk1, Atk2, Hit } from './states.js';
import { FlyingEyeCollision } from './collisionAnimation.js';
import { FloatingMessage } from './floatingMessages.js';
import { LandingCloud } from './particles.js';

class Player {
    constructor(game) {
        this.game = game;

        // Manage player in different states
        this.states = [new Idle(this.game), new Run(this.game), new Jump(this.game), new Fall(this.game), new Atk1(this.game), new Atk2(this.game), new Hit(this.game)]; 
        this.currentState = this.states[0];

        // Animating player in various states
        this.frameX = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        // Movement of player
        this.speedX = 0;
        this.speedY = 0;
        this.weight = 1;
        this.landing = false;
        
        // Sounds of player in different states
        this.attackSound = new Audio();
        this.attackSound.src = "../static/particles/swordSwing.wav";
        this.damageSound = new Audio();
        this.damageSound.src = "../static/particles/takeDamage.mp3";
    }

    update(deltaTime, input) {

        // Detect input and collision 
        this.currentState.handleInput(input); // Execute command by player 
        this.checkCollision();

        // ----------------
        // Animating sprite
        // ----------------
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
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

        // -------------------
        // Horizontal movement
        // -------------------
        this.x += this.speedX;
        if (this.currentState != this.states[6] && input.includes('ArrowRight')) { // Moving right
            this.speedX = 10;
        }

        else if (this.currentState != this.states[6] && input.includes('ArrowLeft')) { // Moving left
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
        if (!this.onGround()) { // Upward speed starts to reduce when player leaves the ground 
            this.speedY += this.weight;
        }

        else { // If on ground, nothing happens (unless player transitions to jump state)
            this.speedY = 0;
        }

        if (this.y >= this.game.height - this.height - this.game.groundMargin) { // Bottom boundary
            this.y = this.game.height - this.height - this.game.groundMargin;
        }

        // Add landing cloud animation after landing
        if (!this.onGround()) {
            this.landing = true;
        }

        if (this.landing && this.onGround()) {
            this.game.particles.push(new LandingCloud(this.game, this.x + this.width * 0.2, this.y + this.height  * 0.87));
            this.landing = false;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0,
        this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    // Check if player is in air 
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    // Changing between states
    setState(state, speed) {
        this.currentState = this.states[state];
        this.currentState.enter();
        this.game.scrollSpeed = speed * this.game.maxScrollSpeed; 
    }

    // Check if player is attacking 
    isAttacking() {
        return this.currentState == this.states[4]  || this.currentState == this.states[5];
    }

    // Collision detection 
    checkCollision() {

        // If collided with enemy, check if player is in attacking state
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x + this.width && 
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y &&
                enemy.alive && this.game.gameStarted && this.currentState != this.states[6]) { // Prevent collisions with dead sprites, before game starts and when player is already hit
                    
                    // If in attacking state, add points and energy, create collision animation and make enemy die
                    if (this.isAttacking()) {
                        enemy.lives--;
                        this.game.energy += enemy.energy; // Add energy based on how much enemy is worth

                        // Create collision particles
                        if (enemy.type == "FlyingEye") {
                            this.game.collisions.push(new FlyingEyeCollision(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)); // Create collision animation for Flying Eye
                        }

                        // If enemy is killed 
                        if (enemy.lives <= 0) {
                            this.game.score += enemy.points; // Add points based on how much enemy is worth
                            enemy.death(); // Execute death animation

                            // Create floating messages 
                            if (enemy.type == "FlyingEye") {
                                this.game.floatingMessages.push(new FloatingMessage(enemy.energy, enemy.x, enemy.y, 130, 150, 'white'));
                            }

                            else {
                                this.game.floatingMessages.push(new FloatingMessage(enemy.points, enemy.x, enemy.y, 130, 50, 'white'))
                            }
                        }
                    }

                    // If not in attacking state, deduct health and go into hit state 
                    else {
                        this.damageSound.play(); // Play sound when taken damage

                        // Fireball explode upon contact even if not in attacking mode 
                        if (enemy.type == "Fireball") {
                            enemy.death();
                        }

                        else {
                            enemy.markedForDeletion = true; // Make enemy disappear regardless
                        }

                        // Since Worms do not deal damage, do not go into hit state if collide into Worm only
                        if (enemy.type != "Worm") { 
                            this.setState(6, 0); // Hit state
                        }

                        this.game.health -= enemy.damage; // Deduct health based on enemy damage
                    }
            }
        });
    }
}

export class Uzui extends Player {
    constructor(game) {
        super(game);
        this.image = UzuiIdle; // 3 / 0.25 / 399x520
        this.maxFrame = 3;
        this.spriteWidth = 399;
        this.spriteHeight = 520;
        this.sizeMultiplier = 0.25;
        this.width = this.sizeMultiplier * this.spriteWidth;
        this.height = this.sizeMultiplier * this.spriteHeight;
        this.x = 50;
        this.y = this.game.height - this.height - this.game.groundMargin; 
    } 

    update(deltaTime, input) {
        super.update(deltaTime, input);
    }
    
    draw(context) {
        super.draw(context);
    }
}

export class Raijin extends Player {
    constructor(game) {
        super(game);
        this.image = RaijinIdle;
        this.maxFrame = 7;
        this.spriteWidth = 395;
        this.spriteHeight = 500;
        this.sizeMultiplier = 0.25;
        this.width = this.sizeMultiplier * this.spriteWidth;
        this.height = this.sizeMultiplier * this.spriteHeight;
        this.x = 50;
        this.y = this.game.height - this.height - this.game.groundMargin; 
    } 

    update(deltaTime, input) {
        super.update(deltaTime, input);
    }
    
    draw(context) {
        super.draw(context);
    }
}

export class Lee extends Player {
    constructor(game) {
        super(game);
        this.image = LeeIdle; // 9 / 0.28 / 399x373
        this.maxFrame = 9;
        this.spriteWidth = 399;
        this.spriteHeight = 373;
        this.sizeMultiplier = 0.28;
        this.width = this.sizeMultiplier * this.spriteWidth;
        this.height = this.sizeMultiplier * this.spriteHeight;
        this.x = 50;
        this.y = this.game.height - this.height - this.game.groundMargin; 
    } 

    update(deltaTime, input) {
        super.update(deltaTime, input);
    }
    
    draw(context) {
        super.draw(context);
    }
}