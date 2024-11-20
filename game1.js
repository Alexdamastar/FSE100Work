// Game elements
const gameContainer = document.getElementById("gameContainer");
let selectedName = null;
let score = 0;
let level = 1;
let timeLeft = 20;

// Fruit and vegetable data
const items = [
    { name: "Apple", image: "apple.png" },
    { name: "Banana", image: "banana.png" },
    { name: "Blackberry", image: "blackberry.png" },
    { name: "Carrot", image: "carrot.jpg" },
    { name: "Corn", image: "corn.jpg" },
    { name: "Tomato", image: "tomato.jpg" }
];

// Shuffle array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create styles programmatically
function applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
    }
}

// Show description screen
function showDescription() {
    resetGame();

    gameContainer.innerHTML = ``;

    const description = document.createElement("div");
    const button = document.createElement("button");

    description.innerHTML = `
        <h2>How to Play</h2>
        <p>Match the names of the fruits and vegetables with their corresponding images. Drag and drop the name onto the image. Each level gets harder, with less time and more matches. Good luck!</p>
    `;

    button.textContent = "Start Game";
    button.addEventListener("click", startGame);

    applyStyles(description, {
        textAlign: "center",
        margin: "20px",
        fontSize: "18px",
        color: "red"
    });

    applyStyles(button, {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer"
    });

    gameContainer.appendChild(description);
    gameContainer.appendChild(button);
}

// Reset game state
function resetGame() {
    score = 0;
    level = 1;
    timeLeft = 20;
}

// Start game
// Start game
// Start game
function startGame() {
    score = 0; // Reset score at the beginning of each round
    timeLeft = 20 - (level - 1) * 5; // Decrease time with each level
    const currentItems = shuffleArray([...items]).slice(0, level + 2); // Increase items each level

    gameContainer.innerHTML = ``;

    const nameContainer = document.createElement("div");
    const imageContainer = document.createElement("div");
    const scoreElement = document.createElement("div");
    const timerElement = document.createElement("div");

    nameContainer.id = "nameContainer";
    imageContainer.id = "imageContainer";
    scoreElement.id = "score";
    timerElement.id = "timer";

    applyStyles(nameContainer, { display: "flex", justifyContent: "center", margin: "20px" });
    applyStyles(gameContainer, {
        backgroundImage: "url('NewBack1.jpg')", // Replace with your image file path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw"
    });       
    applyStyles(imageContainer, { display: "flex", justifyContent: "center", margin: "20px" });
    applyStyles(scoreElement, { textAlign: "center", fontSize: "18px", marginBottom: "10px" });
    applyStyles(timerElement, { textAlign: "center", fontSize: "18px", marginBottom: "20px" });

    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    gameContainer.appendChild(nameContainer);
    gameContainer.appendChild(imageContainer);
    gameContainer.appendChild(scoreElement);
    gameContainer.appendChild(timerElement);

    // Timer
    const timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame("Time's up! Game over.");
        }
    }, 1000);

    // Create names
    shuffleArray(currentItems).forEach(item => {
        const nameElement = document.createElement("div");
        nameElement.textContent = item.name;
        nameElement.draggable = true;

        applyStyles(nameElement, {
            margin: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "grab",
            fontSize: "16px",
            transition: "transform 0.2s ease",
            color: "yellow"
        });

        nameElement.addEventListener("dragstart", () => {
            selectedName = item.name;
            nameElement.style.transform = "scale(1.2)";
            nameElement.style.opacity = "0.7";
        });

        nameElement.addEventListener("dragend", () => {
            nameElement.style.transform = "scale(1)";
            nameElement.style.opacity = "1";
        });

        nameContainer.appendChild(nameElement);
    });

    // Create images
    shuffleArray(currentItems).forEach(item => {
        const imageElement = document.createElement("div");
        const img = document.createElement("img");

        img.src = item.image;
        img.alt = item.name;

        applyStyles(img, { width: "100px", height: "100px" });
        applyStyles(imageElement, {
            margin: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            textAlign: "center",
            color: "yellow"
        });

        imageElement.addEventListener("dragover", (e) => e.preventDefault());
        imageElement.addEventListener("drop", () => {
            if (selectedName === item.name) {
                score++;
                imageElement.innerHTML = `<p>✅ ${item.name}</p>`;
                imageElement.style.pointerEvents = "none";
                scoreElement.textContent = `Score: ${score}`;
            } else {
                alert("Incorrect match! Try again.");
            }
            selectedName = null;

            // Update the win condition to match the total number of items
            if (score === currentItems.length) {
                clearInterval(timer);
                endLevel();
            }
        });

        imageElement.appendChild(img);
        imageContainer.appendChild(imageElement);
    });
}

// End level
function endLevel() {
    gameContainer.innerHTML = ``;

    const message = document.createElement("h2");
    const continueButton = document.createElement("button");
    const mainMenuButton = document.createElement("button");

    message.textContent = `Level ${level} Complete!`;
    continueButton.textContent = "Continue";
    mainMenuButton.textContent = "Main Menu";

    continueButton.addEventListener("click", () => {
        level++;
        startGame();
    });
    mainMenuButton.onclick = () => window.location.href = "index.html";

    

    applyStyles(message, { textAlign: "center", margin: "20px" , color: "yellow"});
    applyStyles(continueButton, { padding: "10px 20px", fontSize: "16px", cursor: "pointer", margin: "5px"});
    applyStyles(mainMenuButton, { padding: "10px 20px", fontSize: "16px", cursor: "pointer", margin: "5px" });

    gameContainer.appendChild(message);
    gameContainer.appendChild(continueButton);
    gameContainer.appendChild(mainMenuButton);
}

// End game
function endGame(message) {
    gameContainer.innerHTML = ``;

    const gameOverMessage = document.createElement("h2");
    const continueButton = document.createElement("button");
    const mainMenuButton = document.createElement("button");

    gameOverMessage.textContent = message;
    continueButton.textContent = "Continue";
    mainMenuButton.textContent = "Main Menu";

    continueButton.addEventListener("click", () => {
        resetGame();
        startGame();
    });

    mainMenuButton.addEventListener("click", showDescription);

    applyStyles(gameOverMessage, { textAlign: "center", margin: "20px" });
    applyStyles(continueButton, { padding: "10px 20px", fontSize: "16px", cursor: "pointer", margin: "5px" });
    applyStyles(mainMenuButton, { padding: "10px 20px", fontSize: "16px", cursor: "pointer", margin: "5px" });

    gameContainer.appendChild(gameOverMessage);
    gameContainer.appendChild(continueButton);
    gameContainer.appendChild(mainMenuButton);
}

// Load description screen
document.addEventListener("DOMContentLoaded", showDescription);
