import { RunningTrail } from "./particles.js";

export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    RUNNING_LEFT: 2,
    RUNNING_RIGHT: 3,
    JUMPING_LEFT: 4,
    JUMPING_RIGHT: 5,
    FALLING_LEFT: 6,
    FALLING_RIGHT: 7,
    ATK_1_LEFT: 8,
    ATK_1_RIGHT: 9,
    ATK2_LEFT: 10,
    ATK_2_RIGHT: 11,
    HIT_LEFT: 12,
    HIT_RIGHT: 13,
    DEATH_LEFT: 14,
    DEATH_RIGHT: 15,
}

class State {
    constructor(state, game, player) {
        this.state = state;
        this.game = game;
        this.player = player;
    }
}

export class StandingLeft extends State {
    constructor(game, player) {
        super('StandingLeft', game, player);
    }

    enter() {
        this.player.frameX = 0;
        this.player.speedX = 0;
        this.player.speedY = 0;

        // Differentiate standing left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiIdleLeft; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.23;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinIdleLeft; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.25;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeIdleLeft; 
            this.player.maxFrame = 9;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 373;
            this.player.sizeMultiplier = 0.28;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }
    }

    handleInput(input) {
        if (input.includes('ArrowRight') || input.includes('d')) {
            this.player.setState(states.STANDING_RIGHT);
        }

        else if (input.includes('ArrowLeft') || input.includes('a')) {
            this.player.setState(states.RUNNING_LEFT);
        }

        else if (input.includes('ArrowUp') || input.includes('w')) {
            this.player.setState(states.JUMPING_LEFT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_LEFT);
        }

        else if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK2_LEFT);
        }
    }
}

export class StandingRight extends State {
    constructor(game, player) {
        super('StandingRight', game, player);
    }

    enter() {
        this.player.frameX = 0;
        this.player.speedX = 0;
        this.player.speedY = 0;

        // Differentiate standing right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiIdle; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.23;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinIdle; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 395;
            this.player.spriteHeight = 500;
            this.player.sizeMultiplier = 0.25;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') { 
            this.player.image = LeeIdle; 
            this.player.maxFrame = 9;
            this.player.spriteWidth = 398;
            this.player.spriteHeight = 373;
            this.player.sizeMultiplier = 0.28;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }
    }

    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('a')) {
            this.player.setState(states.STANDING_LEFT);
        }

        else if (input.includes('ArrowRight') || input.includes('d')) {
            this.player.setState(states.RUNNING_RIGHT);
        }

        else if (input.includes('ArrowUp') || input.includes('w')) {
            this.player.setState(states.JUMPING_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK_2_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    constructor(game, player) { 
        super('RunningLeft', game, player);
    }

    enter() {
        this.player.frameX = 0;
        this.player.speedX = -10;
        this.player.speedY = 0;

        // Differentiate running left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiRunLeft; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 446;
            this.player.sizeMultiplier = 0.25;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinRunLeft; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 430;
            this.player.sizeMultiplier = 0.31;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeRunLeft; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 398;
            this.player.spriteHeight = 454;
            this.player.sizeMultiplier = 0.22;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }
    }

    handleInput(input) {

        // Create running dust cloud
        this.player.particles.push(new RunningTrail(this.game, this.player.x + this.player.width * 0.3, this.player.y + this.player.height));
        
        if (input.length == 0) {
            this.player.setState(states.STANDING_LEFT);
        }

        else if (input.includes('ArrowRight') || input.includes('d')) {
            this.player.setState(states.STANDING_RIGHT);
        }

        else if (input.includes('ArrowUp') || input.includes('w')) {
            this.player.setState(states.JUMPING_LEFT);
        }

        else if(this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_LEFT);
        }

        else if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK2_LEFT);
        }
    }
}

export class RunningRight extends State {
    constructor(game, player) {
        super('RunningRight', game, player);
    }

    enter() {
        this.player.frameX = 0;
        this.player.speedX = 10;
        this.player.speedY = 0;

        // Differentiate running right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiRun; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 446;
            this.player.sizeMultiplier = 0.25;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinRun; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 431;
            this.player.sizeMultiplier = 0.3;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeRun; 
            this.player.maxFrame = 7;
            this.player.spriteWidth = 398;
            this.player.spriteHeight = 454;
            this.player.sizeMultiplier = 0.22;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }
    }

    handleInput(input) {
        this.player.particles.push(new RunningTrail(this.game, this.player.x + this.player.width * 0.3, this.player.y + this.player.height));
        
        if (input.length == 0) {
            this.player.setState(states.STANDING_RIGHT);
        }

        else if (input.includes('ArrowLeft') || input.includes('a')) {
            this.player.setState(states.STANDING_LEFT);
        }

        else if (input.includes('ArrowUp') || input.includes('w')) {
            this.player.setState(states.JUMPING_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK_2_RIGHT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(game, player) {
        super('JumpingLeft', game, player);
    }

    enter() {
        this.player.frameX = 0;
        this.player.speedX = -5; // Move slightly to the left when jumping left 

        // Player only gains speed upwards if he is on ground or platform AND has zero speed
        if ((this.player.onGround() || this.player.onPlatform()) && this.player.speedY == 0) {
            this.player.speedY -= 25; // Take note of the negative sign to move sprite upwards
        }

        // Differentiate jumping left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiJumpLeft; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinJumpLeft; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 470;
            this.player.sizeMultiplier = 0.27;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeJumpLeft; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }
    }

    handleInput(input) {
        if (this.player.speedY >= this.player.weight) {
            this.player.setState(states.FALLING_LEFT);
        }

        else if (input.includes('ArrowRight') || input.includes('d')) {
            this.player.setState(states.JUMPING_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_LEFT);
        }

        if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK2_LEFT);
        }

        // Fix bug where player is stuck in perpetual jumping left mode 
        if (this.player.onGround()) { 
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class JumpingRight extends State {
    constructor(game, player) {
        super('JumpingRight', game, player);
    }

    enter() {
        this.player.frameX = 0;
        this.player.speedX = 5; // Move slightly to the right when jumping right 

        if ((this.player.onGround() || this.player.onPlatform()) && this.player.speedY == 0) {
            this.player.speedY -= 25; 
        }

        // Differentiate jumping right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiJump; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinJump; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 426;
            this.player.sizeMultiplier = 0.28;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeJump; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 392;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.y = this.game.height - this.height - this.game.groundMargin; 
        }
    }

    handleInput(input) {
        if (this.player.speedY >= this.player.weight) {
            this.player.setState(states.FALLING_RIGHT);
        }

        else if (input.includes('ArrowLeft') || input.includes('a')) {
            this.player.setState(states.JUMPING_LEFT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK_2_RIGHT);
        }

        // Fix bug where player is stuck in perpetual jumping right mode 
        if (this.player.onGround()) {
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class FallingLeft extends State {
    constructor(game, player) {
        super('FallingLeft', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.speedX = -5; // Move slightly to the left when falling left 

        // Differentiate falling left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiFallLeft; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinFallLeft; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 388;
            this.player.sizeMultiplier = 0.35;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeFallLeft; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }
    }

    handleInput(input) {
        if (this.player.onGround() || this.player.onPlatform()) { // Go back to standing state when landed
            this.player.setState(states.STANDING_LEFT);
        }

        else if (input.includes('ArrowRight') || input.includes('d')) {
            this.player.setState(states.FALLING_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_LEFT);
        }

        if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK2_LEFT);
        }
    }
}

export class FallingRight extends State {
    constructor(game, player) {
        super('FallingRight', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.speedX = 5; // Move slightly to the right when falling right 

        // Differentiate falling left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiFall; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinFall; 
            this.player.maxFrame = 1;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 388;
            this.player.sizeMultiplier = 0.35;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeFall; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }
    }

    handleInput(input) {
        if (this.player.onGround() || this.player.onPlatform()) {
            this.player.setState(states.STANDING_RIGHT);
        }

        else if (input.includes('ArrowLeft') || input.includes('a')) {
            this.player.setState(states.FALLING_LEFT);
        }

        else if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
            this.player.setState(states.ATK_1_RIGHT);
        }

        else if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
            this.player.setState(states.ATK_2_RIGHT);
        }
    }
}

export class Atk1Left extends State {
    constructor(game, player) {
        super('Atk1Left', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.energy -= 5; // Deduct energy points when attacking. Choose to put it in state management code so energy is deducted only once when attacking
        this.player.attackSound.play(); // Attack sound effect

        // Differentiate attack 1 left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiAtk1Left; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 276;
            this.player.sizeMultiplier = 0.54;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.player.speedX = -90; // Move Uzui to the left
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinAtk1Left; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 397;
            this.player.spriteHeight = 275;
            this.player.sizeMultiplier = 0.55;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.player.speedX = -180; // Move Raijin to the left
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeAtk1Left;
            this.player.maxFrame = 5;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 283;
            this.player.sizeMultiplier = 0.54;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;

            // Make Lee jump up if on ground or platform 
            if ((this.player.onGround() || this.player.onPlatform()) && this.player.speedY == 0) {
                this.player.speedY -= 20; 
            }
        }

        // Allow player to use this attack in air 
        if (this.player.onGround()) {
            this.player.y = this.game.height - this.player.height - this.game.groundMargin; 
        }
    }

    handleInput(input) {

        // Can only change states once done animating 
        if (this.player.frameX >= this.player.maxFrame) {
            if (this.player.onGround() || this.player.onPlatform()) {

                // Make transition to standing states smoother
                if (this.player.name == 'uzui' || this.player.name == 'raijin') {
                    this.player.x += 100;
                    this.player.y += 30;
                }

                else if (this.player.name == 'lee') {
                    this.player.x += 20;
                    this.player.y += 30;
                }

                this.player.setState(states.STANDING_LEFT);
            }

            else {
                this.player.setState(states.FALLING_LEFT);
            }

            if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
                this.player.setState(states.ATK2_LEFT);
            }
        }

        else if ((this.player.onGround() || this.player.onPlatform()) && (input.includes('ArrowUp') || input.includes('w'))) { // Jumping while attacking 
            this.player.setState(states.JUMPING_LEFT);
        } 
    }
}

export class Atk1Right extends State {
    constructor(game, player) {
        super('Atk1Right', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.energy -= 5;
        this.player.attackSound.play();

        // Differentiate attack 1 right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiAtk1; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 281;
            this.player.sizeMultiplier = 0.53;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.player.speedX = 90; // Move Uzui to the right
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinAtk1; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 397;
            this.player.spriteHeight = 350;
            this.player.sizeMultiplier = 0.53;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.player.speedX = 250; // Move Raijin to the right
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeAtk1; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 397;
            this.player.spriteHeight = 283;
            this.player.sizeMultiplier = 0.59;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;

            // Make Lee jump up if on ground or platform 
            if ((this.player.onGround() || this.player.onPlatform()) && this.player.speedY == 0) {
                this.player.speedY -= 20; 
            }
        }

        // Allow player to use this attack in air 
        if (this.player.onGround()) {
            this.player.y = this.game.height - this.player.height - this.game.groundMargin; 
        }
    }

    handleInput(input) {

        // Can only change states once done animating 
        if (this.player.frameX >= this.player.maxFrame) {
            if (this.player.onGround() || this.player.onPlatform()) {
                if (this.player.name == 'uzui') {
                    this.player.x += 20;
                    this.player.y += 30;
                }

                else if (this.player.name == 'raijin') {
                    this.player.x += 20;
                    this.player.y += 50;
                }

                else if (this.player.name == 'lee') {
                    this.player.x += 50;
                    this.player.y += 40;
                }

                this.player.setState(states.STANDING_RIGHT);
            }

            else {
                this.player.setState(states.FALLING_RIGHT);
            }

            if (this.player.energy > 0 && (input.includes('ArrowDown') || input.includes('s'))) {
                this.player.setState(states.ATK_2_RIGHT);
            }
        }

        else if ((this.player.onGround() || this.player.onPlatform()) && (input.includes('ArrowUp') || input.includes('w'))) { // Jumping while attacking 
            this.player.setState(states.JUMPING_RIGHT);
        } 
    }
}

export class Atk2Left extends State {
    constructor(game, player) {
        super('Atk2Left', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.energy -= 5;
        this.player.attackSound.play();

        // Differentiate attack 2 left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiAtk2Left; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 344;
            this.player.sizeMultiplier = 0.5;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;

            // Make Uzui slam down if in air 
            if (!(this.player.onGround() || this.player.onPlatform())) {
                this.player.speedY = 40; 
            }
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinAtk2Left; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 226;
            this.player.sizeMultiplier = 0.65;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.player.speedX = 180; // Move Raijin backward
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeAtk2Left; 
            this.player.maxFrame = 6;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 433;
            this.player.sizeMultiplier = 0.41;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;

            // Make Lee slam down if in air
            if (!(this.player.onGround() || this.player.onPlatform())) {
                this.player.speedY = 40; 
            }
        }

        // Allow player to use this attack in air 
        if (this.player.onGround()) {
            this.player.y = this.game.height - this.player.height - this.game.groundMargin; 
        }
    }
    
    handleInput(input) {

        // Can only change states once done animating 
        if (this.player.frameX >= this.player.maxFrame) {
            if (this.player.onGround() || this.player.onPlatform()) { 
                if (this.player.name == 'uzui') {
                    this.player.x += 70;
                    this.player.y += 50;
                }

                else if (this.player.name == 'lee') {
                    this.player.y += 70;
                }

                else if (this.player.name == 'raijin') {
                    this.player.x += 160;
                }

                this.player.setState(states.STANDING_LEFT);
            }

            else {
                this.player.setState(states.FALLING_LEFT);
            }

            if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
                this.player.setState(states.ATK_1_LEFT);
            }
        }

        else if ((this.player.onGround() || this.player.onPlatform()) && (input.includes('ArrowUp') || input.includes('w'))) { // Jumping while attacking 
            this.player.setState(states.JUMPING_LEFT);
        } 
    }
}

export class Atk2Right extends State {
    constructor(game, player) {
        super('Atk2Right', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.energy -= 5;
        this.player.attackSound.play();

        // Differentiate attack 2 right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiAtk2; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 338;
            this.player.sizeMultiplier = 0.51;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;

            // Make Uzui slam down if in air 
            if (!(this.player.onGround() || this.player.onPlatform())) {
                this.player.speedY = 40; 
            }
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinAtk2; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 397.5;
            this.player.spriteHeight = 226;
            this.player.sizeMultiplier = 0.65;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
            this.player.speedX = -180; // Move Raijin backward
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeAtk2; 
            this.player.maxFrame = 6;
            this.player.spriteWidth = 398;
            this.player.spriteHeight = 432;
            this.player.sizeMultiplier = 0.41;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;

            // Make Lee slam down if in air
            if (!(this.player.onGround() || this.player.onPlatform())) {
                this.player.speedY = 40; 
            }
        }

        // Allow player to use this attack in air 
        if (this.player.onGround()) {
            this.player.y = this.game.height - this.player.height - this.game.groundMargin; 
        }
    }
    
    handleInput(input) {

        // Can only change states once done animating 
        if (this.player.frameX >= this.player.maxFrame) {
            if (this.player.onGround() || this.player.onPlatform()) {
                if (this.player.name == 'uzui') {
                    this.player.x += 20;
                    this.player.y += 40;
                }

                else if (this.player.name == 'raijin') {
                    this.player.x += 20;
                    this.player.y += 50;
                }

                else if (this.player.name == 'lee') {
                    this.player.x += 20;
                    this.player.y += 100;
                }
                this.player.setState(states.STANDING_RIGHT);
            }

            else {
                this.player.setState(states.FALLING_RIGHT);
            }

            if (this.player.energy > 0 && (input.includes(' ') || input.includes('Enter'))) {
                this.player.setState(states.ATK_1_RIGHT);
            }
        }

        else if ((this.player.onGround() || this.player.onPlatform()) && (input.includes('ArrowUp') || input.includes('w'))) { // Jumping while attacking 
            this.player.setState(states.JUMPING_RIGHT);
        } 
    }
}

export class HitLeft extends State {
    constructor(game, player) {
        super('HitLeft', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.health -= 10; // Deduct health if in hit state. Choose to put it in state management code so health is deducted only once when hit
        this.player.damageSound.play(); // Take hit sound effect

        // Differentiate hit left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiHitLeft; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinHitLeft; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 475;
            this.player.sizeMultiplier = 0.3;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeHitLeft; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 395;
            this.player.spriteHeight = 329;
            this.player.sizeMultiplier = 0.3;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        // Hit players fall to ground if in air
        if (!this.player.onGround() && !this.player.onPlatform()) {
            this.player.speedY += 10; 
        }
    }

    handleInput(input) {
        if (this.player.frameX >= this.player.maxFrame) {
            if (this.player.onGround() || this.player.onPlatform()) {
                this.player.setState(states.STANDING_LEFT);
            }

            else {
                this.player.setState(states.FALLING_LEFT);
            }
        }
    }
}

export class HitRight extends State {
    constructor(game, player) {
        super('HitRight', game, player);
    }

    enter() { 
        this.player.frameX = 0;
        this.player.health -= 10;
        this.player.damageSound.play(); 

        // Differentiate hit right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiHit; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 520;
            this.player.sizeMultiplier = 0.24;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinHit; 
            this.player.maxFrame = 3;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 444;
            this.player.sizeMultiplier = 0.31;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeHit; 
            this.player.maxFrame = 2;
            this.player.spriteWidth = 395;
            this.player.spriteHeight = 327;
            this.player.sizeMultiplier = 0.3;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        if (!this.player.onGround() && !this.player.onPlatform()) {
            this.player.speedY += 10; 
        }
    }

    handleInput(input) {
        if (this.player.frameX >= this.player.maxFrame) {
            if (this.player.onGround() || this.player.onPlatform()) {
                this.player.setState(states.STANDING_RIGHT);
            }

            else {
                this.player.setState(states.FALLING_RIGHT);
            }
        }
    }
}

export class DeathLeft extends State {
    constructor(game, player) {
        super('DeathLeft', game, player);
    }

    enter() { 

        // Differentiate death left animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiDeathLeft; 
            this.player.maxFrame = 6;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 357;
            this.player.sizeMultiplier = 0.37;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinDeathLeft; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 470;
            this.player.sizeMultiplier = 0.28;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeDeathLeft; 
            this.player.maxFrame = 10;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 301;
            this.player.sizeMultiplier = 0.34;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        if (!this.player.onGround() || !this.player.onPlatform()) {
            this.player.speedY += 10; 
        }
    }

    handleInput(input) {
        if (this.player.frameX >= this.player.maxFrame) {
            this.player.dead = true;
        }
    }
}

export class DeathRight extends State {
    constructor(game, player) {
        super('DeathRight', game, player);
    }

    enter() { 

        // Differentiate death right animation for unique characters
        if (this.player.name == 'uzui') { 
            this.player.image = UzuiDeath; 
            this.player.maxFrame = 6;
            this.player.spriteWidth = 399;
            this.player.spriteHeight = 357;
            this.player.sizeMultiplier = 0.37;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'raijin') {
            this.player.image = RaijinDeath; 
            this.player.maxFrame = 5;
            this.player.spriteWidth = 397.5;
            this.player.spriteHeight = 445;
            this.player.sizeMultiplier = 0.29;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        else if (this.player.name == 'lee') {
            this.player.image = LeeDeath; 
            this.player.maxFrame = 10;
            this.player.spriteWidth = 400;
            this.player.spriteHeight = 300;
            this.player.sizeMultiplier = 0.34;
            this.player.width = this.player.sizeMultiplier * this.player.spriteWidth;
            this.player.height = this.player.sizeMultiplier * this.player.spriteHeight;
        }

        if (!this.player.onGround() || !this.player.onPlatform()) {
            this.player.speedY += 10; 
        }
    }

    handleInput(input) {
        if (this.player.frameX >= this.player.maxFrame) {
            this.player.dead = true;
        }
    }
}