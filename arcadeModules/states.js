import { RunningTrail } from "./particles.js";

export const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3, 
    ATK1: 4,
    ATK2: 5,
    HIT: 6,
}

class State {
    constructor(state, game) {
        this.game = game;
        this.state = state;
    }
}

export class Idle extends State {
    constructor(game) {
        super('IDLE', game);
    }

    enter() { 
        this.game.player.frameX = 0; // Prevent blinking if we switch between states too quickly

        // Differentiate idling animation for unique characters
        this.game.player.speedX = 0;
        if (this.game.playerChar == 'uzui') {
            this.game.player.image = UzuiIdle; // 3 / 0.25 / 399x520
            this.game.player.maxFrame = 3; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 520;
            this.game.player.sizeMultiplier = 0.25;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        else if (this.game.playerChar == 'raijin') {
            this.game.player.image = RaijinIdle; // 7 / 0.21 / 395x500 
            this.game.player.maxFrame = 7; 
            this.game.player.spriteWidth = 395;
            this.game.player.spriteHeight = 500;
            this.game.player.sizeMultiplier = 0.21;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        else if (this.game.playerChar == 'lee') { // 
            this.game.player.image = LeeIdle; // 9 / 0.28 / 399x373
            this.game.player.maxFrame = 9; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 373;
            this.game.player.sizeMultiplier = 0.28;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }
    }

    handleInput(input)  { 
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.game.player.setState(states.RUNNING, 1); // Pass in states.RUNNING which represent the number 1 in states enum
        }

        else if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1); // Pass in states.JUMPING which represent the number 2 in states enum
        }

        else if (input.includes(' ')) { // Execute attack 1
            this.game.player.setState(states.ATK1, 2);
        }

        else if (input.includes('ArrowDown')) { // Execute attack 2
            this.game.player.setState(states.ATK2, 1);
        }
    }
}

export class Run extends State {
    constructor(game) {
        super('RUNNING', game);
    }

    enter() { 
        this.game.player.frameX = 0; 

        // Differentiate running animation for unique characters
        if (this.game.playerChar == 'uzui'){
            this.game.player.image = UzuiRun; // 7 / 0.3 / 398x446
            this.game.player.maxFrame = 7; 
            this.game.player.spriteWidth = 398;
            this.game.player.spriteHeight = 446;
            this.game.player.sizeMultiplier = 0.25;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        else if (this.game.playerChar == 'raijin'){
            this.game.player.image = RaijinRun; // 7 / 0.3 / 400x431
            this.game.player.maxFrame = 7; 
            this.game.player.spriteWidth = 400;
            this.game.player.spriteHeight = 431;
            this.game.player.sizeMultiplier = 0.3;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        else if (this.game.playerChar == 'lee'){
            this.game.player.image = LeeRun; // 7 / 0.22 / 398x454
            this.game.player.maxFrame = 7; 
            this.game.player.spriteWidth = 398;
            this.game.player.spriteHeight = 454;
            this.game.player.sizeMultiplier = 0.22;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }
    }

    handleInput(input)  { 

        // Create running dust cloud
        this.game.particles.push(new RunningTrail(this.game, this.game.player.x + this.game.player.width * 0.3, this.game.player.y + this.game.player.height));

        if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1); 
        }

        else if (this.game.energy > 0 && input.includes(' ')) { // Execute attack 1 when running
            this.game.player.setState(states.ATK1, 2);
        }

        else if (this.game.energy > 0 && input.includes('ArrowDown')) { // Execute attack 2 when running
            this.game.player.setState(states.ATK2, 1);
        }
    }
}

export class Jump extends State {
    constructor(game) {
        super('JUMPING', game);
    }

    enter() { 
        this.game.player.frameX = 0;
        this.game.player.speedX = 5; // Move slightly to the right when jumping
        
        // Differentiate jumping animation for unique characters
        if (this.game.playerChar == 'uzui') {
            this.game.player.image = UzuiJump; // 1 / 0.25 / 399x520
            this.game.player.maxFrame = 1; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 520;
            this.game.player.sizeMultiplier = 0.25;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        else if (this.game.playerChar == 'raijin') {
            this.game.player.image = RaijinJump; // 1 / 0.3 / 400x426
            this.game.player.maxFrame = 1; 
            this.game.player.spriteWidth = 400;
            this.game.player.spriteHeight = 426;
            this.game.player.sizeMultiplier = 0.3;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        else if (this.game.playerChar == 'lee') {
            this.game.player.image = LeeJump; // 2 / 0.24 / 392x520
            this.game.player.maxFrame = 2; 
            this.game.player.spriteWidth = 392;
            this.game.player.spriteHeight = 520;
            this.game.player.sizeMultiplier = 0.24;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }

        // Player only gains speed upwards if he is on ground 
        if (this.game.player.onGround()) {
            this.game.player.speedY -= 25; // Take note of the negative sign to move sprite upwards
        }
    }

    handleInput(input)  { 

        // Change to falling animation when it reaches the peak of its jump
        if (this.game.player.speedY >= this.game.player.weight) { // In player.js, we add weight to speedY as long as it is not on ground, making it less negative and approach zero so its value changes from -25 to a positive value 
            this.game.player.setState(states.FALLING, 1);
        }

        if (this.game.energy > 0 && input.includes(' ')) { // Execute attack 1 when jumping
            this.game.player.setState(states.ATK1, 2);
        }

        else if (this.game.energy > 0 && input.includes('ArrowDown')) { // Execute attack 2 when jumping
            this.game.player.setState(states.ATK2, 1);
        }
    }
}

export class Fall extends State {
    constructor(game) {
        super('FALLING', game);
    }

    enter() { 
        this.game.player.frameX = 0;
        this.game.player.speedX = 5; // Move slightly to the right when falling
        
        // Differentiate falling animation for unique characters 
        if (this.game.playerChar == 'uzui') {
            this.game.player.image = UzuiFall; // 1 / 0.25 / 399x520
            this.game.player.maxFrame = 1; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 520;
            this.game.player.sizeMultiplier = 0.25;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }

        else if (this.game.playerChar == 'raijin') {
            this.game.player.image = RaijinFall; // 1 / 0.35 / 400x388
            this.game.player.maxFrame = 1; 
            this.game.player.spriteWidth = 400;
            this.game.player.spriteHeight = 388;
            this.game.player.sizeMultiplier = 0.35;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }

        else if (this.game.playerChar == 'lee') {
            this.game.player.image = LeeFall; // 2 / 0.24 / 400x520
            this.game.player.maxFrame = 2; 
            this.game.player.spriteWidth = 400;
            this.game.player.spriteHeight = 520;
            this.game.player.sizeMultiplier = 0.24;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }
    }

    handleInput(input)  { 
        if (this.game.player.onGround()) { // Go back to running state when landed
            this.game.player.setState(states.RUNNING, 1);
        }

        if (this.game.energy > 0 && input.includes(' ')) { // Execute attack 1 when falling
            this.game.player.setState(states.ATK1, 2);
        }

        else if (this.game.energy > 0 && input.includes('ArrowDown')) { // Execute attack 2 when falling
            this.game.player.setState(states.ATK2, 1);
        }
    }
}

export class Atk1 extends State {
    constructor(game) {
        super('ATTACK 1', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.energy -= 10; // Energy spent to attack so player cannot spam it
        this.game.player.attackSound.play(); // Attack sound effect
        
        // Differentiate attack 1 animation for unique characters  
        if (this.game.playerChar == 'uzui') {
            this.game.player.image = UzuiAtk1; // 3 / 0.53 / 399x281
            this.game.player.speedX = 50; // Move slightly forward during Attack 1
            this.game.player.maxFrame = 3; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 281;
            this.game.player.sizeMultiplier = 0.53;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }

        else if (this.game.playerChar == 'raijin') {
            this.game.player.image = RaijinAtk1; // 5 / 0.57 / 397x350
            this.game.player.speedX = 150; // Move forward significantly during Attack 1
            this.game.player.maxFrame = 5; 
            this.game.player.spriteWidth = 397;
            this.game.player.spriteHeight = 350;
            this.game.player.sizeMultiplier = 0.57;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }

        else if (this.game.playerChar == 'lee') {
            this.game.player.image = LeeAtk1; // 5 / 0.59 / 397x283
            this.game.player.maxFrame = 5; 
            this.game.player.spriteWidth = 397;
            this.game.player.spriteHeight = 283;
            this.game.player.sizeMultiplier = 0.59;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;

            // Launch Lee in the air if on ground
            if (this.game.player.onGround()) {
                this.game.player.speedY -= 25;
            }
        }

         // Allow player to use this attack in air 
         if (this.game.player.onGround()) {
            this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
        }
    }

    handleInput(input) {
        if (this.game.player.frameX >= this.game.player.maxFrame) { // Once done animating, player can choose to do attack 2 or switch back to running or falling depending whether they are on ground
            if (this.game.player.onGround()) {
                this.game.player.setState(states.RUNNING, 1);
            }

            else {
                this.game.player.setState(states.FALLING, 1);
            }

            if (this.game.energy > 0 && input.includes('ArrowDown')) {
                this.game.player.setState(states.ATK2, 1);
            }
        }

        else if (this.game.player.onGround() && input.includes('ArrowUp')) { // Jumping while attacking 
            this.game.player.setState(states.JUMPING, 1);
        } 
    }
}

export class Atk2 extends State {
    constructor(game) {
        super('ATTACK 2', game);
    }
    
    enter() {
        this.game.player.frameX = 0;
        this.game.energy -= 10; // Energy spent to attack so player cannot spam it
        this.game.player.attackSound.play(); // Attack sound effect

        // Differentiate attack 2 animation for unique characters   
        if (this.game.playerChar == 'uzui') {
            this.game.player.image = UzuiAtk2; // 3 / 0.53 / 399x338
            this.game.player.maxFrame = 3; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 338;
            this.game.player.sizeMultiplier = 0.53;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;

            if (!this.game.player.onGround()) {
                this.game.player.speedY = 30; // Slam down if in air 
            }
        }

        else if (this.game.playerChar == 'raijin') {
            this.game.player.image = RaijinAtk2; // 5 / 0.7 / 397.5x226
            this.game.player.speedX = -300; // Move player backwards 
            this.game.player.maxFrame = 5; 
            this.game.player.spriteWidth = 397.5;
            this.game.player.spriteHeight = 226;
            this.game.player.sizeMultiplier = 0.7;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;

            if (this.game.player.onGround()) {
                this.game.player.y = this.game.height - this.game.player.height - this.game.groundMargin; 
            }
        }
        
        else if (this.game.playerChar == 'lee') {
            this.game.player.image = LeeAtk2; // 6 / 0.41 / 398x432
            this.game.player.maxFrame = 6; 
            this.game.player.spriteWidth = 398;
            this.game.player.spriteHeight = 433;
            this.game.player.sizeMultiplier = 0.41;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;

            if (!this.game.player.onGround()) {
                this.game.player.speedY = 30; // Slam down if in air 
            }
        }
    }

    handleInput(input) {
        if (this.game.player.frameX >= this.game.player.maxFrame) { // Once done animating, player can choose to do attack 1 or switch back to running or falling depending whether they are on ground
            if (this.game.player.onGround()) {
                this.game.player.setState(states.RUNNING, 1);
            }

            else {
                this.game.player.setState(states.FALLING, 1);
            }

            if (this.game.energy > 0 && input.includes(' ')) {
                this.game.player.setState(states.ATK1, 2);
            }
        }

        else if (this.game.player.onGround() && input.includes('ArrowUp')) { // Allow jumping while attacking 
            this.game.player.setState(states.JUMPING, 1);
        } 
    }
}

export class Hit extends State {
    constructor(game) {
        super('HIT', game);
    }
    
    enter() {
        this.game.player.frameX = 0;

        // Differentiate hit animation for unique characters   
        if (this.game.playerChar == 'uzui') {
            this.game.player.image = UzuiHit; // 2 / 0.25 / 399x520
            this.game.player.maxFrame = 2; 
            this.game.player.spriteWidth = 399;
            this.game.player.spriteHeight = 520;
            this.game.player.sizeMultiplier = 0.25;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }

        else if (this.game.playerChar == 'raijin') {
            this.game.player.image = RaijinHit; // 3 / 0.3 / 400x444
            this.game.player.maxFrame = 3; 
            this.game.player.spriteWidth = 400;
            this.game.player.spriteHeight = 444;
            this.game.player.sizeMultiplier = 0.3;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }
        
        else if (this.game.playerChar == 'lee') {
            this.game.player.image = LeeHit; // 2 / 0.3 / 395x327
            this.game.player.maxFrame = 2; 
            this.game.player.spriteWidth = 395;
            this.game.player.spriteHeight = 327;
            this.game.player.sizeMultiplier = 0.3;
            this.game.player.width = this.game.player.sizeMultiplier * this.game.player.spriteWidth;
            this.game.player.height = this.game.player.sizeMultiplier * this.game.player.spriteHeight;
        }
    }

    handleInput(input) {
        if (this.game.player.frameX >= 2 && this.game.player.onGround()) { // If player is hit on ground
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}