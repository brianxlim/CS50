import { Uzui, Raijin, Lee } from "./player.js";
import { InputHandler1, InputHandler2 } from "./input.js";
import { Background } from "./background.js";
import { UI } from "./ui.js";

window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'none'; // Remove loading screen

    const backToMainButton = document.getElementById('back-to-main-versus');

    // Instantiate canvas elements
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 928; 
    canvas.height = 793;

    // Search for characters that players chose using URL 
    const urlParams = new URLSearchParams(window.location.search);
    const player1 = urlParams.get('player1');
    const player2 = urlParams.get('player2');

    // Main Game class that controls overall game logic 
    class Game {
        constructor(width, height, player1, player2) {
            this.width = width;
            this.height = height;
            this.groundMargin = 60;
            this.player1char = player1;
            this.player2char = player2;
            this.chars = {'uzui': Uzui, 'raijin': Raijin, 'lee': Lee}; // All playable characters
            this.debug = false; // For visualising and debugging collisions
            this.gameStarted = false; // Check if game started
            this.gameOver = false; // Check if game over
            this.playerWon = 0; // Check which player won

            // Initialise correct player 1 and player 2 by using player character values to index into this.chars dictionary that maps the character names to the corresponding player classes
            this.player1 = new this.chars[this.player1char](this, 1);
            this.player2 = new this.chars[this.player2char](this, 2);

            // Initialise input handlers for each player
            this.input1 = new InputHandler1(this);
            this.input2 = new InputHandler2(this);

            // Initialise background image
            this.background = new Background(this);

            // Initialise UI
            this.ui = new UI(this, this.player1, this.player2);
        }

        // Animate and move different elements of the game
        update(deltaTime) {

            // Check if game over
            if (this.player1.health <= 0 || this.player2.health <= 0) {
                this.player1.health = (this.player1.health <= 0) ? 0 : this.player1.health;
                this.player2.health = (this.player2.health <= 0) ? 0 : this.player2.health;
                this.gameOver = true;
            }

            else if (this.player1.energy == 0 && this.player2.energy == 0) {
                this.gameOver = true;
            }

            // Once game over
            if (this.gameOver) {

                // Display back to main menu button
                backToMainButton.style.display = 'block';
                backToMainButton.addEventListener('click', function() {
                    window.location.href = "../templates/main.html"; // Bring user back to main menu
                });
                
                // Prevent players from moving
                this.input1.locked = true;
                this.input2.locked = true;

                // Check which player won
                if (this.player1.health > this.player2.health) {
                    this.playerWon = 1;
                }

                else if (this.player1.health < this.player2.health) {
                    this.playerWon = 2;
                }

                // Induce death animation on player who lost 
                if (this.playerWon == 1) { // If player 1 wins
                    if (this.player2.states.indexOf(this.player2.currentState) % 2 == 0) { // If player 2 is facing left
                        this.player2.setState(14); // Set to DeathLeft state 
                    }

                    else { // If player 2 is facing right
                        this.player2.setState(15);// Set to DeathRight state 
                    }
                }

                else if (this.playerWon == 2) { // If player 2 wins
                    if (this.player1.states.indexOf(this.player1.currentState) % 2 == 0) {
                        this.player1.setState(14); 
                    }

                    else { 
                        this.player1.setState(15);
                    }
                }
            }

            // Update and animate background
            this.background.update(deltaTime);
            
            // Update and animate players
            this.player1.update(deltaTime, this.input1.keys);
            this.player2.update(deltaTime, this.input2.keys);
            this.checkCollision(); // Check for collision between players constantly
        }

        // Draw game elements
        draw(context, timeStamp) {
            // Draw background first
            this.background.draw(context);

            // Draw both players
            this.player1.draw(context);
            this.player2.draw(context);

            // Lastly draw UI
            this.ui.draw(context, timeStamp, this.playerWon);
        } 

        // Check collisions between 2 players
        checkCollision() {
            if (this.player1.x < this.player2.x + this.player2.width &&
                this.player1.x + this.player1.width > this.player2.x &&
                this.player1.y < this.player2.y + this.player2.height &&
                this.player1.y + this.player1.height > this.player2.y) {

                    // If player 1 attacks player 2 and player 2 is not already in Hit state
                    if (this.player1.isAttacking() && !this.player2.isHit()) {
                        if (this.player2.states.indexOf(this.player2.currentState) % 2 == 0) { // If player 2 is facing left
                            this.player2.setState(12); // Set to HitLeft state 
                        }

                        else { // If player 2 face right
                            this.player2.setState(13); // Set to HitRight state
                        }
                    }

                    // If player 2 attacks player 1 and player 1 is not already in Hit state
                    else if (this.player2.isAttacking() && !this.player1.isHit()) { 
                        if (this.player1.states.indexOf(this.player1.currentState) % 2 == 0) { 
                            this.player1.setState(12);
                        }

                        else {
                            this.player1.setState(13);
                        }
                    }
                }
        }
    }

    const game = new Game(canvas.width, canvas.height, player1, player2);
    let lastTime = 0;

    // Function to run game 
    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        game.update(deltaTime);
        game.draw(ctx, timeStamp);

        requestAnimationFrame(animate);
    }
    animate(0);
});