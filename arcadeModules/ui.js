 export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Bangers';
        this.emptyBarSW = 111; // Spritewidth of empty bars, i.e. frame of health and energy bar
        this.emptyBarSH = 15; // Spriteheight of empty bars, i.e. frame of health and energy bar
        this.fullBarSW = 109; // Spritewidth of health and energy bar
        this.fullBarSH = 6; // Spritewidth of health and energy bar
        
        // Scale it to desired size on screen 
        this.barSizeMultiplier = 3.5;
        this.emptyBarWidth = this.barSizeMultiplier * this.emptyBarSW;
        this.emptyBarHeight = this.barSizeMultiplier * this.emptyBarSH;
        this.fullBarWidth = this.barSizeMultiplier * this.fullBarSW;
        this.fullBarHeight = this.barSizeMultiplier * this.fullBarSH;
    }

    draw(context, timeStamp, playerChar) {
        context.save(); // Since shadows are for text only, we will wrap our code between save() and restore() methods
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        // Scoreboard
        context.font = 'bold '+ this.fontSize * 1.5 + 'px ' + this.fontFamily;
        context.fillText('Score: ' + this.game.score, 20, 70);

        // Draw health and energy bars when game starts
        if (this.game.gameStarted) {
            context.drawImage(fullHealth, 0, 0, this.fullBarSW, this.fullBarSH, 23, 105, this.game.health / 100 * this.fullBarWidth, this.fullBarHeight);
            context.drawImage(fullEnergy, 0, 0, this.fullBarSW, this.fullBarSH, 23, 128, this.game.energy / 500 * this.fullBarWidth, this.fullBarHeight);
            context.drawImage(emptyBar, 20, 100, this.emptyBarWidth, this.emptyBarHeight);
        }

        // For start game message
        else {
            const text = "Press any button to start";
            let fontSize = 50;
            let opacity = 1;

            // Calculate the breathing animation using a sine wave
            const breath = Math.sin(timeStamp / 500) * 0.5 + 0.5;
            fontSize += breath * 10;
            opacity -= breath * 0.25;

            // Set the font and fill style, customising for different characters
            context.font = `${fontSize}px Bangers`;
            switch (playerChar) {
                case "uzui":
                context.fillStyle = `rgba(32, 20, 138, ${opacity})`;
                break;

                case "raijin":
                context.fillStyle = `rgba(115, 107, 107, ${opacity})`;
                break;

                case "lee":
                context.fillStyle = `rgba(24, 115, 0, ${opacity})`;
                break;
            }

            // Measure text width
            const textWidth = context.measureText(text).width;
            const textHeight = fontSize;

            // Draw the text at center of the page
            context.fillText(text, (this.game.width - textWidth) / 2, (this.game.height - textHeight) / 5); 
        }

        context.restore();
    }
 }