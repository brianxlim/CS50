import { Background } from "./background.js";
import { Uzui, Lee, Raijin } from "./player.js";
import { InputHandler } from "./input.js";
import { FlyingEye, Goblin, Worm } from "./enemies.js";
import { UI } from "./ui.js";

window.addEventListener("load", function () {
    const nameForm = document.getElementById("name-form");
    const nameInput = document.getElementById("name");
    const submitName = document.getElementById("name-form-submit");
    const loading = document.getElementById("loading");
    loading.style.display = "none";
    let submitted = false;

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 928;
    canvas.height = 793;
    const urlParams = new URLSearchParams(window.location.search);
    const playerChar = urlParams.get("arcadeChar"); // Use query parameter created back in select.js

    class Game {
        constructor(width, height, playerChar) {
            this.width = width; // Width of canvas
            this.height = height; // Height of canvas
            this.playerChar = playerChar; // Chosen character
            this.groundMargin = 60; // Offset character from background's floor
            this.scrollSpeed = 0; // Used to scroll background
            this.maxScrollSpeed = 2; // Used to tweak difficulty of game
            this.maxDifficulty = 12; // Max speed of game
            this.background = new Background(this); // Instantiate background
            this.input = new InputHandler(this); // Instantiate input handler
            this.gameStarted = false;
            this.gameOver = false;
            this.gamePaused = false;
            this.enemies = []; // Array to hold Enemy objects
            this.enemyTimer = 0; // Determine when to spawn enemy
            this.enemyInterval = 1000; // How often an enemy spawns
            this.minEnemyInterval = 200; // Prevent too many enemies from spawning
            this.particles = []; // Array to hold Particle objects
            this.floatingMessages = []; // Array to hold floatingMessages objects
            this.collisions = []; // Array to hold CollisionAnimation objects
            this.difficultyTimer = 0; // Increase speed of game periodically
            this.difficultyInterval = 10000; // Interval to increase game difficulty

            // --------------
            // For UI display
            // --------------
            this.ui = new UI(this);
            this.fontColor = "black";
            this.score = 0; // Scoreboard
            this.health = 100; // Health bar
            this.energy = 500; // Energy bar

            // Instantiate player based on character selection
            switch (this.playerChar) {
                case "uzui":
                this.player = new Uzui(this);
                break;

                case "raijin":
                this.player = new Raijin(this);
                break;

                case "lee":
                this.player = new Lee(this);
                break;
                default:
                console.error(`Invalid id parameter: ${this.playerChar}`); // If somehow, arcadeChar is not a valid id
            }
        }

        update(deltaTime) {
            // Check if game over
            if (this.health <= 0) {
                this.health = 0;
                this.gameOver = true;
            }

            // Only start animating background once game starts, i.e. player starts moving
            if (this.gameStarted) {
                this.background.update();

                // Increase game difficulty with time only after game starts
                if (this.difficultyTimer > this.difficultyInterval) {
                this.difficultyTimer = 0;

                if (this.maxScrollSpeed <= this.maxDifficulty) {
                    this.maxScrollSpeed *= 1.5; // Increase speed
                }

                if (this.enemyInterval > this.minEnemyInterval) {
                    this.enemyInterval *= 0.75; // Spawn more enemies
                }
                } 
                
                else {
                this.difficultyTimer += deltaTime;
                }
            }

            // Prevent energy from being more than 500
            if (this.energy > 499) {
                this.energy = 499;
            }

            // Start animating player before game starts so we can have idle animation showing
            this.player.update(deltaTime, this.input.keys);

            // Add enemies periodically
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } 
            
            else {
                this.enemyTimer += deltaTime;
            }

            // Animate and move enemies
            this.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
            });

            // Remove enemies from array
            this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

            // Animate particles
            this.particles.forEach(particle => {
                particle.update(deltaTime);
            });

            // Remove particles from array
            this.particles = this.particles.filter((particle) => !particle.markedForDeletion);

            // Animate collisions
            this.collisions.forEach((collision) => {
                collision.update(deltaTime);
            });

            // Remove collisions once animated
            this.collisions = this.collisions.filter((collision) => !collision.markedForDeletion);

            // Animate floating messages
            this.floatingMessages.forEach(floatingMessage => {
                floatingMessage.update(deltaTime);
            });

            // Remove floating messages from array
            this.floatingMessages = this.floatingMessages.filter((floatingMessage) => !floatingMessage.markedForDeletion);
        }

        draw(context, timeStamp, playerChar) {
            this.background.draw(context);
            this.player.draw(context);

            // Draw enemies
            this.enemies.forEach((enemy) => {
                enemy.draw(context);
            });

            this.particles.forEach(particle => {
                particle.draw(context);
            });

            // Draw collisions
            this.collisions.forEach((collision) => {
                collision.draw(context);
            });

            // Draw floating messages
            this.floatingMessages.forEach((floatingMessage) => {
                floatingMessage.draw(context);
            });

            // Draw UI display last
            this.ui.draw(context, timeStamp, playerChar);
        }

        addEnemy() {
            this.enemies.push(new FlyingEye(this)); // Add Flying Eye every cycle

            if (this.gameStarted) {
                this.enemies.push(new Goblin(this)); // Add Goblin every cycle

                if (Math.random() > 0.3) {
                this.enemies.push(new Worm(this));
                }
            }
        }
    }

    const game = new Game(canvas.width, canvas.height, playerChar);
    let lastTime = 0;

    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!game.gameOver && !game.gamePaused) {
        game.update(deltaTime);
        }
        game.draw(ctx, timeStamp, playerChar);

        // ---------------
        // After game over
        // ---------------
        if (game.gameOver) {
            nameForm.style.display = "inline-block"; // Display name form for user to submit their name 
            nameInput.addEventListener("input", function() {
                const nameLength = nameInput.value.length;
                if (nameLength >= 2 && nameLength <= 12) { // Do not allow submissions until length of name requirement is met
                  submitName.disabled = false;
                } 
                
                else {
                  submitName.disabled = true;
                }
            });

            if (!submitName.disabled) { // If name requirement is met, allow user to submit their name 
                submitName.addEventListener("click", function sendUserInfo() {
                    if (submitted == false) {
                        submitted = true;

                        // Creates an object called 'data' with two properties: name which player has input and score of game that just ended
                        const data = {
                            name: document.getElementById("name").value,
                            score: game.score,
                        };
                    
                        // Make a POST request to a URL (http://127.0.0.1:5000/) 
                        fetch("http://127.0.0.1:5000/", {
                            method: "POST",
                            mode: "cors",   
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data), // The body of the request is a JSON string representation of the data object
                        }).then((response) => window.location.href = "../templates/leaderboard.html"); // Redirect user to leaderboard.html once successful
                    }
                });
            }
        }

        requestAnimationFrame(animate);
    }
    animate(0);
});