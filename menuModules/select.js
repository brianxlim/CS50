window.addEventListener('load', function() {
    let urlParams = new URLSearchParams(window.location.search);
    const gameMode = urlParams.get('mode');

    if (gameMode == "arcade") {

        // Check which character is chosen
        const leeButton = document.getElementById("leeChosen");
        const uzuiButton = document.getElementById("uzuiChosen");
        const raijinButton = document.getElementById("raijinChosen");

        leeButton.addEventListener('click', function() {
            window.location.href = "../templates/arcade.html?arcadeChar=lee";
        });
    
        uzuiButton.addEventListener('click', function() {
            window.location.href = "../templates/arcade.html?arcadeChar=uzui";
        });
        
        raijinButton.addEventListener('click', function() {
            window.location.href = "../templates/arcade.html?arcadeChar=raijin";
        });
    }

    else if (gameMode == "versus") {
        const charsSelected = [];
        const cards = document.querySelectorAll('.card');
        urlParams = new URLSearchParams();

        cards.forEach(card => {
            const selectButton = card.querySelector('.selector button');
            const cardBody = card.querySelector('.card-body');

            selectButton.addEventListener('click', () => {
                cardBody.classList.toggle('selected');
                charsSelected.push(card.id);

                if (cardBody.classList.contains('selected')) {
                    selectButton.style.display = 'none';
                    cardBody.innerHTML = '<h2>Player ' + (charsSelected.length) + ' selected</h2>';

                    if (charsSelected.length >= 2) {
                        urlParams.set('player1', charsSelected[0]);
                        urlParams.set('player2', charsSelected[1]);
                        urlParams.delete('mode');
                        window.location.href = "../templates/versus.html?" + urlParams.toString();
                    }
                }
            });
        });
    }
});