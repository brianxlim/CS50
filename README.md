# **CLASH OF HEROES** 
***

## **Video Demo**
[_CS50: Final Project_](targetURL "CS50 Final Project Video")
***

## **Background**
As I approached the final project, my mind was brimming with ideas about what to create. However, in the absence of clear guidelines or problem sets, I found myself taking a break from coding to reflect on my options. It was during this hiatus, unexpectedly, that I completed _God of War: Ragnarok_ on my PlayStation and the idea of developing a game began to take root.

Creating a complete game seemed daunting at first, and my initial attempts to develop an escape room game proved too challenging after just two weeks. Despite grappling with game asset creation and the complexities of open-world game design, I refused to give up. Just as I was about to start anew, I stumbled upon a video tutorial on YouTube by [_freeCodeCamp_](https://www.youtube.com/watch?v=GFO_txvwK_c&ab_channel=freeCodeCamp.org "Video Referenced") that showcased the process of building a game with nothing but plain, vanilla JavaScript, HTML, and CSS. Intrigued by the idea and with nothing to lose, I decided to watch the 9-hour tutorial in its entirety. By the time the tutorial was over, I had been inspired to create an infinite runner game for single player mode and a fighting game for multiplayer. 
***

## **Arcade Mode**
The singleplayer version of the game is the arcade mode, which features an infinite runner format. While I had already developed the basic framework of the infinite runner game, I did not want to limit players to a single character. To enhance the player experience, I wanted to incorporate multiple characters and ensure that each character had unique attack moves, which would complement their unique attributes. This will allow players to choose their preferred character as each will eventually have a distinct personality and visual design. 

Additionally, I aimed to incorporate various enemy types, drawing from the knowledge I acquired in the video tutorial. Drawing inspiration from the tutorial, I wanted to develop various enemy types that would pose different levels of threat to the player. Although this presented a more significant workload, I was enthusiastic about the prospect of diversifying the game and bringing my vision for the arcade mode to fruition.

### ----- Players -----
To create the playable characters, I scoured the internet for sprites that would align with my vision. With a keen interest in anime, I focused my search on Asian culture-inspired sprites. After much searching (especially at [_Itch.io_](https://itch.io/game-assets/free "Itch.io")), I discovered a few free-to-use sprites that caught my eye, and I ultimately settled on three: Raijin, Uzui, and Lee.

Raijin, inspired by the character Raiden from the game _Mortal Kombat_, was named after the Japanese god of thunder, lending the character an added air of power. Uzui Tengen, a character from the anime _Demon Slayer_, brought a unique and elegant fighting style to the game. Finally, Lee Chao Lan, who I designed as a counterpart to the _Tekken_ character Lee Chao Lun, rounded out the trio with a distinctive martial arts approach. 

During the later stages of the project, I encountered a significant issue with the raw player spritesheets. Specifically, I discovered that there was a considerable amount of blank space surrounding each player sprite, which made it difficult to draw them accurately in the game. In order to resolve this problem, I had to use GIMP to resize each player sprite individually, removing the excess space from their respective spritesheets. While effective, this process was incredibly time-consuming and required a significant amount of attention to detail.

![Image Resize Process](/static/forReadMe/imageResizeProcess.png)

### ----- Character Select ----- 
Once I had selected the player sprites and finalized their unique attack properties, my next step was to create an attractive character select screen that would precede the actual game. To achieve this, I spent a significant amount of time researching various HTML and CSS techniques on YouTube, experimenting with different colors and layouts until I arrived at a visually appealing design that complemented each of the character sprites.

Throughout the process of creating the character select screen, I also gained valuable experience with the use of the URLSearchParams() JavaScript method, which enabled me to implement the correct character to draw in the runner game. This newfound understanding will undoubtedly prove invaluable when developing the character select screen for the versus game mode.

### ----- State Management ----- 
Each of the three characters was designed with unique attack properties to diversify gameplay and ensure players had multiple playstyles to choose from, which would prevent the game from becoming repetitive. For example, when executing Attack 1 by pressing the spacebar, Uzui and Raijin moved to the right with varying degrees of speed, while Lee would launch into the air if he was on the ground. Achieving these varying behaviours required adjusting the state management code for each character, with an example described below.

```JavaScript
enter() {
    ...
    if (this.game.playerChar == 'uzui') {
        this.game.player.speedX = 50; // Move forward slightly
        ...
    }

    else if (this.game.playerChar == 'raijin') {
        this.game.player.speedX = 150; // Move forward significantly
        ...
    }

    else if (this.game.playerChar == 'lee') {
        ...
        // Launch Lee in the air if on ground
        if (this.game.player.onGround()) {
            this.game.player.speedY -= 25;
        }
    }
}
```
By incorporating these unique attack properties that align with each character's personality, I was able to introduce a greater level of diversity and depth to the game, enabling players to choose characters that resonate with their preferred style of gameplay and adding to the overall appeal of the game.

### ----- Enemies ----- 
In my search for player sprites, I also kept an eye out for potential enemy sprites and experimented with several to determine the most suitable ones. I had two important considerations before making my final selections: ensuring that the enemies were of different types to prevent monotony and making sure that they wouldn't make the game too difficult for players. After careful consideration, I settled on the 'Goblin', a land melee enemy, the 'Flying Eye', a flying melee enemy, and the 'Fire Worm', a land ranged enemy.

![Enemies](/static/forReadMe/enemies.png)

Like the player spritesheets, the enemy spritesheets also suffered from an excess of space around each frame of the enemy sprite. In addition, there was a problem with the direction that the enemies faced - they were supposed to face the player, requiring the spritesheet to be flipped vertically. This resulted in the supposed first frame of the spritesheet on the left becoming the last frame on the right of the image. Rather than rearranging each frame individually, I chose to modify my animating algorithm for the enemy sprites, animating from the last frame to the first frame.

Given the three unique enemy types, there were inevitably subtle differences in their movements. The Flying Eyes move in a wave-like pattern, Goblins run in a straight line towards the player, stopping to attack once they reach a certain distance, while the Worm remains stationary and fires fireballs from its position. To achieve this, I created a parent Enemy class and differentiated their movements in the update() method in the child class, as illustrated below.

```JavaScript
// -------------------
// Flying Eye movement
// -------------------
update(deltaTime) {
    ...
    this.angle += this.angleIncrement;
    this.y += this.amplitude * Math.sin(this.angle); // Induce sine wave movement in the y-axis 
}

// --------------
// Goblin Movement 
// --------------
update(deltaTime) {
    ...
    if (this.alive) {

        // If Goblin is sufficiently close to the player
        if (this.game.player.x + this.game.player.width + this.width >= this.x - 15 && 
            this.x + this.width >= this.game.player.x + 15) { 
            this.image = GoblinAtk; // Change to attack image
            this.speedX = 0; // Stop to execute attack animation
            ...
        }

        else { // If Goblin out of range
            this.image = GoblinRun; // Change to run image
            this.speedX = this.runSpeed; // Continue moving to the left of the screen
            ...
        }
    }
}
```
In addition to their distinct movements, each enemy type also had different properties and a unique interaction with the player. For example, defeating a Flying Eye did not yield any points. Similarly, Goblins provided some points but did not replenish the player's energy. The Fire Worm, on the other hand, could be killed but its fireballs were indestructible. This prevented players from resorting to spamming attack moves to defeat the enemies, adding an element of challenge and strategy to the game. Additionally, I incorporated randomization into the movement of each Goblin and Flying Eye towards the left side of the screen to further enhance the game's variability and excitement. By doing so, I was able to introduce unpredictability and dynamism to the gameplay, which in turn prevents monotony and enhances player engagement. Furthermore, I added an extra layer of randomness by generating random sizes for each Flying Eye that spawns, thereby increasing the challenge and variety for players to overcome.

### ----- Background ----- 
The forest background I discovered on [_Itch.io_](https://itch.io/game-assets/free "Itch.io") was ideal for my purposes as it was composed of numerous layers, which allowed me to create a captivating and dynamic parallax effect.

![Background](/static/forest/arcadeBG.png)

To create a visually appealing and immersive gameplay experience, I utilized the parallax effect by implementing multiple layers of the background that move at varying speeds. This creates a sense of depth and dynamism, which enhances the gameplay experience for the players. I accomplished this by developing a JavaScript 'Layer' class that takes in an 'image' and 'speedModifier' argument. The image argument specifies which image to draw, while the speedModifier factor is multiplied by the main game scroll speed to determine how fast or slow that particular layer moves.

Furthermore, I strategically positioned the top of the screen to provide ample room for introducing Flying Eyes or any other text before the game starts. In the arcade mode, I kept the instructions simple yet engaging by incorporating a breathing effect that gives a more dynamic appearance to the text. Only after the game starts will the score and health bar of the player appear.

### ----- Particles ----- 
After completing the core game mechanics, I decided to enhance the game's overall experience by adding additional effects. These effects included a running trail that would follow the player as they move, a landing cloud that appears when the player lands after a jump, and floating messages that display how many points or energy the player earns from killing an enemy. Certain effects were unique to specific enemies, such as a boom cloud that appears only when a Flying Eye is defeated.

![Particles](/static/forReadMe/particles.png)

To implement these particle effects, I integrated the logic for particles into the game's state management code. For instance, when the player is in the running state, the game creates running trail particles that follow the player's movement. By adding these details, I was able to create a more engaging and immersive game experience for the players.

### ----- Server and Leaderboard ----- 
As I approached the final phase of my game development project, I realized that incorporating a leaderboard system would significantly enhance the gaming experience for players by giving players a way to track their progress and adding an extra layer of competition and motivation to the game. Therefore, I set out to create a leaderboard that would store the high scores of players and allow them to compare their scores with others. I began by creating a visually appealing HTML page with a well-designed table layout using CSS to display the high scores.

![Leaderboard](/static/forReadMe/leaderboard.png)

On the backend, I had to connect the player's name submission form to a database. Initially, I planned on using flask to establish a connection with an SQL database. However, after conducting some research and experimentation, I found that it would be more efficient to use flask and a simple JSON file to store the names and scores of past players. To accomplish this, I had to learn how to utilize JavaScript to send a POST request to my flask server. 

```JavaScript
// After game ends, create an object called 'data' with two properties: name which player has input and score of game 
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
```

To add a player's name and score to the leaderboard, I created a write_json() method that parsed the JSON string sent via the POST request and added it to the existing JSON database. When a player accessed the leaderboard from the main menu, a GET request was sent to the Flask server, which then displayed the leaderboard accordingly.

```Python
@app.route("/", methods=['POST','GET'])
def main():

    # If user is submitting name and score after game
    if request.method == 'POST':
        data = json.loads(request.data) # Load our JSON formatted string, convert it into a Python object and set it as 'data' variable
        if data:
            write_json(data) # Add data object containing name and score into leaderboard.json using write_json() method
        
        # Create HTTP response object that can be returned from a Flask view function using make_response function
        return make_response(jsonify({"message":"Success"}), 200)

    with open('leaderboard.json','r') as file:
        file_data = json.load(file)
        return make_response(jsonify({"data":file_data['data']}), 200)
```

Connecting all of the different pieces of the puzzle was undoubtedly a challenging and complex process. However, by overcoming these obstacles, I was able to acquire valuable knowledge and experience in web development that I will carry forward into future projects.
***

## **Versus Mode**
The multiplayer, or versus, mode allows 2 people to play my game together. Many of the elements of this game mode is similar to that of the arcade game mode. I will discuss the distinct differences between the two game modes below. 

### ----- Character Select -----
As this game is meant to be played between 2 players, the character select screen will need to allow for two characters to be chosen. As a result, I used an array to store which characters have been chosen and once this array contains two objects, it will redirect players to the actual game. 

I will also need to take note of which character represents player 1 and which represents player 2 and also relay this information to the end user. Hence, I created a new CSS class called 'selected' such that if the 'card' class contains this 'selected' class, it will display which player has been chosen.  

```JavaScript
cards.forEach(card => { // Card is the player card on the character select screen
    const selectButton = card.querySelector('.selector button');
    const cardBody = card.querySelector('.card-body');

    selectButton.addEventListener('click', () => {
        cardBody.classList.toggle('selected'); // Once selected, player card will execute visual changes
        charsSelected.push(card.id); // Player selected will be added to charsSelected array

        if (cardBody.classList.contains('selected')) {
            selectButton.style.display = 'none'; // Disable selection once player is chosen
            cardBody.innerHTML = '<h2>Player ' + (charsSelected.length) + ' selected</h2>'; // Display player chosen  

            // Check if two player have been chosen
            if (charsSelected.length >= 2) {

                // Set player number to character chosen using .set() method of URLParamsSearch class
                urlParams.set('player1', charsSelected[0]); 
                urlParams.set('player2', charsSelected[1]);
                urlParams.delete('mode');
                window.location.href = "../templates/versus.html?" + urlParams.toString(); // Redirect user to game
            }
        }
    });
});
```

### ----- Background -----
To add more depth and variation to the gameplay, I decided to introduce two platforms that players could stand on and jump between. This not only adds a layer of strategy to the game, but also breaks up the monotony of player movement. I put a lot of thought into the design of these platforms, taking into account factors such as when players can land on them, to avoid getting stuck when jumping, and how far players can move on the platform before falling, to prevent players from appearing to float in mid-air. These platforms provide players with more opportunities for evasion and attack, and help to make the gameplay more engaging and dynamic.

![Background](/static/forest/versusBG.png)

### ----- State Management -----
Designing the multiplayer mode was an important aspect of the project, requiring the creation of a mirrored version of every state for the characters, as players would now be facing left instead of right. However, this led to some irregular glitching movements, as the sprites had size differences between states. Overcoming this challenge required extensive experimentation and offsetting the size differences for each state across all three characters, making it one of the most tedious tasks in the project.
***

## **Closing**
This was my first ever coding project of such a big scale. After investing countless hours into the creation of thousands of lines of code, I finally completed the project on April 21st, 2023. While the finished product is undoubtedly impressive, it was the exhilarating process of learning that truly stood out to me. In retrospect, the obstacles and challenges I encountered along the way were what made this project so rewarding. The lessons I learned throughout the problem sets, labs, and lectures associated with this course will undoubtedly stick with me for a significant period of time, serving as a testament to the power of persistence and dedication.

> Nothing in the world is worth having or worth doing unless it means effort, pain, difficulty —— Theodore Roosevelt

This was CS50x!
***
