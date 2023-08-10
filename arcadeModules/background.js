export class Layer {
    constructor(game, width, height, image, speedModifier) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x < -this.width) {
            this.x = 0;
        }

        else {
            this.x -= this.game.scrollSpeed * this.speedModifier;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.layer1image = layer_1;
        this.layer2image = layer_2;
        this.layer3image = layer_3;
        this.layer4image = layer_4;
        this.layer5image = layer_5;
        this.layer6image = layer_6;
        this.layer7image = layer_7;
        this.layer8image = layer_8;
        this.layer9image = layer_9;
        this.layer10image = layer_10;
        this.layer11image = layer_11;
        this.layer12image = layer_12;
        this.layer1 = new Layer(this.game, this.game.width, this.game.height, this.layer1image, this.game.maxScrollSpeed);
        this.layer2 = new Layer(this.game, this.game.width, this.game.height, this.layer2image, this.game.maxScrollSpeed);
        this.layer3 = new Layer(this.game, this.game.width, this.game.height, this.layer3image, 0.8 * this.game.maxScrollSpeed);
        this.layer4 = new Layer(this.game, this.game.width, this.game.height, this.layer4image, 0.8 * this.game.maxScrollSpeed);
        this.layer5 = new Layer(this.game, this.game.width, this.game.height, this.layer5image, 0.7 * this.game.maxScrollSpeed);
        this.layer6 = new Layer(this.game, this.game.width, this.game.height, this.layer6image, 0.7 * this.game.maxScrollSpeed);
        this.layer7 = new Layer(this.game, this.game.width, this.game.height, this.layer7image, 0.6 * this.game.maxScrollSpeed);
        this.layer8 = new Layer(this.game, this.game.width, this.game.height, this.layer8image, 0.6 * this.game.maxScrollSpeed);
        this.layer9 = new Layer(this.game, this.game.width, this.game.height, this.layer9image, 0.5 * this.game.maxScrollSpeed);
        this.layer10 = new Layer(this.game, this.game.width, this.game.height, this.layer10image, 0.5 * this.game.maxScrollSpeed);
        this.layer11 = new Layer(this.game, this.game.width, this.game.height, this.layer11image, 0.4 * this.game.maxScrollSpeed);
        this.layer12 = new Layer(this.game, this.game.width, this.game.height, this.layer12image, 0.4 * this.game.maxScrollSpeed);
        this.background = [this.layer12, this.layer11, this.layer10, this.layer9, this.layer8, this.layer7, this.layer6, 
        this.layer5, this.layer4, this.layer3, this.layer2, this.layer1];
    }

    update() {
        this.background.forEach(layer => {
            layer.update();
        })
    }

    draw(context) {
        this.background.forEach(layer => {
            layer.draw(context);
        });
    }
}