// Text when player attacks enemies
export class FloatingMessage {
    constructor(value, x, y, targetX, targetY, color) { // Arguments are value of floating text, starting x and y positions and target x and y positions
        this.value = value;
        this.color = color;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0; // Set time limit to how long the message can be shown
    }

    update(deltaTime) {

        // Make text approach target coordinates
        this.x += (this.targetX - this.x) * 0.03; 
        this.y += (this.targetY - this.y) * 0.03;
        
        // Delete message once it has exceeded time limit
        this.timer += deltaTime;
        if (this.timer > 2000) { // Messages stay on screen for 2 seconds
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        context.font = '30px Bangers';
        context.fillStyle = this.color;
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black'; // Draw message again to create shadow effect, alternative to built-in shadow effect in canvas
        context.fillText(this.value, this.x + 2, this.y + 2);
    }
}