window.addEventListener('load', function() {
    let backToMain = document.getElementById('back-to-main');
    backToMain.addEventListener('click', function() {
        window.location.href = "../templates/main.html"; // Bring user back to main menu
    });

    let app = document.querySelector('#bodytable'); 
    app.innerHTML.HTML = ""; // 'app' variable essentially represent the code for body of leaderboard table
    let lines = ""; // 'lines' variable will be the lines of code for body of leaderboard table

    // make a request to the URL http://127.0.0.1:5000/
    fetch('http://127.0.0.1:5000/')
    .then((response) => response.json()) // Convert response to JSON format
    .then((data) => {
        let rank = 1; // Rank the name and scores
        data.data.sort((a, b) => b.score - a.score); // Sort 'data' array based on 'score' property in descending order

        // Use map method to iterate over each item in the 'data' array and a string is constructed for each item that contains the rank, name, and score of the item
        data?.data.map((item) => { 
            lines += "<tr><td>" + rank + "</td><td>" + item?.name + "</td><td>" + item?.score + "</td></tr>";
            rank++; // Increment rank by one after each name and score 
        });
        app.innerHTML = lines; // Set innerHTML of 'app' to 'lines' which is the HTML for table rows
    });
})