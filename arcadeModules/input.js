export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];

        // Add key to this.keys array when player presses key
        window.addEventListener('keydown', e => {
            this.game.gameStarted = true; // Make game start once player hits a button

            if ((e.key == 'ArrowUp' ||
                 e.key == 'ArrowDown' ||
                 e.key == 'ArrowLeft' ||
                 e.key == 'ArrowRight' ||
                 e.key == ' ') &&
                 this.keys.indexOf(e.key) == -1) {
                    this.keys.push(e.key);
                 }

            else if (e.key == 'Escape') { // Pause game if Esc is pressed 
                this.game.gamePaused = !this.game.gamePaused;
            }
        });

        // Remove key from this.keys array when player releases key
        window.addEventListener('keyup', e => {
            if ((e.key == 'ArrowUp' ||
                 e.key == 'ArrowDown' ||
                 e.key == 'ArrowLeft' ||
                 e.key == 'ArrowRight' ||
                 e.key == ' ') &&
                 this.keys.indexOf(e.key) != -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                 }
        });
    }
}