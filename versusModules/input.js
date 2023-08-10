export class InputHandler2{
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.locked = false;

        // Add key to this.keys array when player presses key
        window.addEventListener('keydown', e => {
            this.game.gameStarted = true; // Start game if any key is pressed

            if ((e.key == 'ArrowUp' ||
                 e.key == 'ArrowDown' ||
                 e.key == 'ArrowLeft' ||
                 e.key == 'ArrowRight' ||
                 e.key == 'Enter') && !this.locked && 
                 this.keys.indexOf(e.key) == -1) {
                    this.keys.push(e.key);
                 }

            else if (e.key == 'Escape') { // Pause game if Esc is pressed 
                this.game.gamePaused = !this.game.gamePaused;
            }

            else if (e.key == '/') {
                this.game.debug = !this.game.debug;
            }
        });

        // Remove key from this.keys array when player releases key
        window.addEventListener('keyup', e => {
            if ((e.key == 'ArrowUp' ||
                 e.key == 'ArrowDown' ||
                 e.key == 'ArrowLeft' ||
                 e.key == 'ArrowRight' ||
                 e.key == 'Enter') &&
                 this.keys.indexOf(e.key) != -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                 }
        });
    }
}

export class InputHandler1 {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.locked = false;

        window.addEventListener('keydown', e => {
            this.game.gameStarted = true;

            if ((e.key.toLowerCase() == 'w' ||
                 e.key.toLowerCase() == 'a' ||
                 e.key.toLowerCase() == 's' ||
                 e.key.toLowerCase() == 'd' ||
                 e.key.toLowerCase() == ' ') && !this.locked &&
                 this.keys.indexOf(e.key.toLowerCase()) == -1) {
                    this.keys.push(e.key.toLowerCase());
                 }               
        });

        // Remove key from this.keys array when player releases key
        window.addEventListener('keyup', e => {
            if ((e.key.toLowerCase() == 'w' ||
                 e.key.toLowerCase() == 'a' ||
                 e.key.toLowerCase() == 's' ||
                 e.key.toLowerCase() == 'd' ||
                 e.key.toLowerCase() == ' ') &&
                 this.keys.indexOf(e.key.toLowerCase()) != -1) {
                    this.keys.splice(this.keys.indexOf(e.key.toLowerCase()), 1);
                 }
        });
    }
}