export class UI {
    constructor(game, player1, player2) {
        this.game = game;
        this.player1 = player1; 
        this.player2 = player2;
        this.fontSize = 30;
        this.fontColor = 'black';
        this.fontFamily = 'Bangers';
        this.emptyBarSW = 111; // Spritewidth of empty bars, i.e. frame of health and energy bar
        this.emptyBarSH = 15; // Spriteheight of empty bars, i.e. frame of health and energy bar
        this.fullBarSW = 109; // Spritewidth of health and energy bar
        this.fullBarSH = 6; // Spritewidth of health and energy bar
        
        // Scale it to desired size on screen 
        this.barSizeMultiplier = 2.7;
        this.emptyBarWidth = this.barSizeMultiplier * this.emptyBarSW;
        this.emptyBarHeight = this.barSizeMultiplier * this.emptyBarSH;
        this.fullBarWidth = this.barSizeMultiplier * this.fullBarSW;
        this.fullBarHeight = this.barSizeMultiplier * this.fullBarSH;
    }

    draw(context, timeStamp, playerWon) {

        // --------------------------------------------
        // Draw health and energy bars when game starts
        // --------------------------------------------
        if (this.game.gameStarted) {
            context.save(); // Since shadows are for text only, we will wrap our code between save() and restore() methods
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'white';
            context.shadowBlur = 0;
            context.fillStyle = this.game.fontColor;
            
            context.font = `bold ${this.fontSize * 1.1}px ${this.fontFamily}`;

            // For player 1
            context.fillText('Player 1:', 23, 90);
            if (this.player1.health >= 0) {
                context.drawImage(fullHealth, 0, 0, this.fullBarSW, this.fullBarSH, 23, 102.3, this.player1.health / 100 * this.fullBarWidth, this.fullBarHeight);
            }
            
            if (this.player1.energy >= 0) {
                context.drawImage(fullEnergy, 0, 0, this.fullBarSW, this.fullBarSH, 23, 122.4, this.player1.energy / 100 * this.fullBarWidth, this.fullBarHeight);
            }
            context.drawImage(emptyBar, 20, 100, this.emptyBarWidth, this.emptyBarHeight);

            // For player 2
            context.fillText('Player 2:', 600, 90);

            if (this.player2.health >= 0) {
                context.drawImage(fullHealth, 0, 0, this.fullBarSW, this.fullBarSH, 600, 102.3, this.player2.health / 100 * this.fullBarWidth, this.fullBarHeight);
            }
            
            if (this.player2.energy >= 0) {
                context.drawImage(fullEnergy, 0, 0, this.fullBarSW, this.fullBarSH, 600, 122.4, this.player2.energy / 100 * this.fullBarWidth, this.fullBarHeight);
            }
            context.drawImage(emptyBar, 598, 100, this.emptyBarWidth, this.emptyBarHeight);
            context.restore();
        }

        // --------------------------------------
        // For start game and instruction message
        // --------------------------------------
        else {
            const startGameText = "Press any button to start";
            const instructionText = `        W       / Up Arrow         -     Jump\n        A        / Left Arrow      -     Move Left\n        S        / Down Arrow   -     Attack 1\n        D        / Right Arrow   -     Move Right\nSpaceBar / Enter                 -     Attack 2`;
            const instructionLines = instructionText.split('\n');

            let startGameFontSize = 50;
            let instructionFontSize = 30;
            let opacity = 1;

            // Calculate the breathing animation using a sine wave
            const breath = Math.sin(timeStamp / 500) * 0.5 + 0.5;
            startGameFontSize += breath * 10;
            opacity -= breath * 0.25;

            // Set the font and fill style for start game text
            context.save()
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'white';
            context.shadowBlur = 0;
            context.font = `${startGameFontSize}px Bangers`;
            context.fillStyle = `rgba(0, 0, 0, ${opacity})`;

            // Measure start game text width and height
            const startGameTextWidth = context.measureText(startGameText).width;
            const startGameTextHeight = startGameFontSize;

            // Draw start game text at center of the page
            context.fillText(startGameText, (this.game.width - startGameTextWidth) / 2, (this.game.height - startGameTextHeight) / 5); 
            context.restore();

            // Draw instruction text at center of the page
            context.save();
            context.fillStyle = '#AF4B4B';
            context.font = `${instructionFontSize}px ${this.fontFamily}`;
            const lineHeight = 35;
            let instructionTextY = 280;

            for (let i = 0; i < instructionLines.length; i++) {

                // For text shadow effect
                context.save();
                context.fillStyle = 'black';
                context.fillText(instructionLines[i], 252, instructionTextY + 3);
                context.restore();

                // Actual text is pink color
                context.fillText(instructionLines[i], 250, instructionTextY);
                instructionTextY += lineHeight;
            }
        }
        
        // ----------------------
        // Draw game over message 
        // ----------------------
        if (this.game.gameOver) {
            context.save();
            context.fillStyle = '#AF4B4B';
            context.font = `bold ${this.fontSize * 1.5}px ${this.fontFamily}`;
            if (playerWon != 0) {
                const winningText = `Player ${playerWon} wins!`;
                const winningTextWidth = context.measureText(winningText).width;
                context.fillText(winningText, (this.game.width - winningTextWidth) / 2, 400);
            }

            else {
                const gameTiedText = 'Game tied';
                const gameTiedTextWidth = context.measureText(gameTiedText).width;
                context.fillText(gameTiedText, (this.game.width - gameTiedTextWidth) / 2, 400);
            }
            context.restore();
        }
    }
 }