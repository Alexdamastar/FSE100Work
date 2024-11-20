const berries = [
    { name: "Raspberry", image: "raspberry.png"},
    { name: "Strawberry", image: "strawberry.png" },
    { name: "Blackberry", image: "blackberry.png" },
    { name: "Blueberry", image: "blueberry.png" }
];

const poisonousBerries = [
    { name: "Hollyberry", image: "hollyberry.png" },
    { name: "Yew Berry", image: "yew berry.png" },
    { name: "Jerusalem Cherry", image: "jerusalem cherry.png" }
];

let round = 1;
let score = 0;
let timer = 20;
let interval;
let poisonousCount = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create draggable berry images
function createDraggableBerry(berry, isPoison = false) {
    const img = document.createElement("img");
    img.src = berry.image;
    img.alt = berry.name;
    img.className = isPoison ? "poisonous" : "berry";
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.position = "absolute";
    img.style.cursor = "grab";

    const x = Math.random() * (window.innerWidth - 200); // Random x position
    const y = Math.random() * (window.innerHeight - 200); // Random y position
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    img.draggable = true;

    img.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", berry.name);
    };

    img.ondragend = () => {
        img.style.display = "none"; // Hide the image after drag
    };

    return img;
}

// Function to create word boxes for berries
function createWordBox(berryName) {
    const box = document.createElement("div");
    box.className = "word-box";
    box.textContent = berryName;
    box.style.width = "150px";
    box.style.height = "50px";
    box.style.border = "2px solid black";
    box.style.margin = "10px";
    box.style.textAlign = "center";
    box.style.lineHeight = "50px";
    box.style.display = "inline-block";
    box.style.color = "yellow"; 

    box.ondragover = (e) => {
        e.preventDefault();
    };

    box.ondrop = (e) => {
        e.preventDefault();
        const droppedBerryName = e.dataTransfer.getData("text/plain");
        if (droppedBerryName === berryName) {
            score++;
            box.style.backgroundColor = "lightgreen";
            box.dataset.completed = "true"; // Mark as completed
            checkRoundCompletion();
        } else {
            if (poisonousBerries.some((berry) => berry.name === droppedBerryName)) {
                poisonousCount++;
                score -= 2;
                if (poisonousCount >= 2) {
                    endGame(false);
                }
            }
            box.style.backgroundColor = "red";
        }
    };

    return box;
}

// Start the game
function startGame() {
    document.body.style.backgroundImage = "url('Back1.jpg')"; // Replace 'background.jpg' with the path to your image
    document.body.style.backgroundSize = "cover"; // Ensures the image covers the entire screen
    document.body.style.backgroundPosition = "center"; // Centers the image
    document.body.style.backgroundRepeat = "no-repeat"; // Prevents tiling
    document.body.innerHTML = ""; // Clear the screen
    timer = 20;
    poisonousCount = 0;

    // Create word boxes
    const wordBoxContainer = document.createElement("div");
    wordBoxContainer.id = "word-box-container";
    wordBoxContainer.style.marginBottom = "50px";

    const currentBerries = berries.slice(0, round + 2); // Increase number of berries as rounds progress
    currentBerries.forEach((berry) => {
        const box = createWordBox(berry.name);
        wordBoxContainer.appendChild(box);
    });

    document.body.appendChild(wordBoxContainer);

    // Create berries and poisonous berries
    const berryContainer = document.createElement("div");
    berryContainer.id = "berry-container";

    currentBerries.forEach((berry) => {
        const berryElement = createDraggableBerry(berry);
        berryContainer.appendChild(berryElement);
    });

    const currentPoisonous = poisonousBerries.slice(0, round); // Add more poisonous berries each round
    currentPoisonous.forEach((poisonBerry) => {
        const poisonElement = createDraggableBerry(poisonBerry, true);
        berryContainer.appendChild(poisonElement);
    });

    document.body.appendChild(berryContainer);

    startTimer();
}

// Check if the round is complete
function checkRoundCompletion() {
    const boxes = document.querySelectorAll(".word-box");
    const allCompleted = Array.from(boxes).every((box) => box.dataset.completed === "true");

    if (allCompleted) {
        clearInterval(interval);
        if (round < 3) {
            round++;
            startGame();
        } else {
            endGame(true);
        }
    }
}

// Start the timer
function startTimer() {
    const timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    timerDisplay.textContent = `Time: ${timer}`;
    timerDisplay.style.position = "fixed";
    timerDisplay.style.top = "10px";
    timerDisplay.style.right = "10px";
    timerDisplay.style.fontSize = "24px";
    timerDisplay.style.color = "yellow";
    document.body.appendChild(timerDisplay);

    interval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Time: ${timer}`;

        if (timer <= 0) {
            clearInterval(interval);
            endGame(false);
        }
    }, 1000);
}

// End the game
function endGame(success) {
    clearInterval(interval);
    document.body.innerHTML = ""; // Clear the screen

    const message = document.createElement("div");
    message.textContent = success
        ? `You Won! Final Score: ${score}`
        : `Game Over! Final Score: ${score}`;
    message.style.fontSize = "24px";
    message.style.margin = "20px";
    document.body.appendChild(message);

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.onclick = () => {
        round = 1;
        score = 0;
        startGame();
    };
    document.body.appendChild(playAgainButton);

    const menuButton = document.createElement("button");
    menuButton.textContent = "Back to Menu";
    menuButton.onclick = () => window.location.href = "index.html";
    document.body.appendChild(menuButton);
}

// Show description
function showDescription() {
    const description = document.createElement("div");
    description.textContent = `
        Match the berries to their corresponding names by dragging them into the boxes.
        Avoid the poisonous berries! Each round, more berries and poisonous berries will appear. 
        If two poisonous berries are placed in the boxes, the game ends. 
        Complete all matches to move to the next round. You have 20 seconds per round. Good luck!
    `;
    description.style.margin = "20px";
    description.style.fontSize = "18px";
    document.body.appendChild(description);

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.onclick = startGame;
    document.body.appendChild(startButton);
}

// Initialize the game
showDescription();
