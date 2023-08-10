window.addEventListener('load', function() {

    // Make loading screen disappear
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    // If user wants to play arcade
    const arcadeButton = document.getElementById("arcade");
    arcadeButton.addEventListener("click", function() {
        window.location.href = "../templates/select.html?mode=arcade"; // When arcade button is clicked, redirect to character select page with gamemode variable set to arcade 
    });

    // If user wants to play versus 
    const versusButton = document.getElementById("versus");
    versusButton.addEventListener("click", function() {
        window.location.href = "../templates/select.html?mode=versus";
    });

    // If user wants to view leaderboard 
    const leaderboardButton = document.getElementById("leaderboard");
    leaderboardButton.addEventListener("click", function() {
        window.location.href = "../templates/leaderboard.html";
    });
});