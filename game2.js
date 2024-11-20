let shapes = [];
let currentShapeIndex = 0;
let trail = [];
let isTracing = false;
let screen = 'menu';
let bgImage;
let homeButton;
let continueButton, menuButton;
let accuracy = 0; // Store accuracy percentage

function setup() {
    createCanvas(800, 600);
    bgImage = loadImage('Back2.jpg'); // Load background image

    // Create the Home button
    homeButton = createButton("Home");
    homeButton.style('padding', '10px 20px');
    homeButton.style('font-size', '16px');
    homeButton.style('background-color', '#007BFF');
    homeButton.style('color', '#fff');
    homeButton.style('border', 'none');
    homeButton.style('border-radius', '5px');
    homeButton.style('cursor', 'pointer');
    homeButton.position(10, 10);
    homeButton.mousePressed(() => {
        console.log("Home button clicked!");
        window.location.href = 'index.html';
    });

    // Create the Continue button
    continueButton = createButton("Continue");
    continueButton.style('padding', '10px 20px');
    continueButton.style('font-size', '16px');
    continueButton.style('background-color', '#28A745');
    continueButton.style('color', '#fff');
    continueButton.style('border', 'none');
    continueButton.style('border-radius', '5px');
    continueButton.style('cursor', 'pointer');
    continueButton.position(700, 500);
    continueButton.mousePressed(() => {
        console.log("Continue button clicked!");
        nextShape();
    });
    continueButton.hide(); // Initially hidden
}

function addBackToMenuButton() {
  const backToMenuButton = document.createElement('button');
  backToMenuButton.textContent = "Back to Main Menu";
  backToMenuButton.style.position = 'absolute';
  backToMenuButton.style.bottom = '20px';
  backToMenuButton.style.right = '20px';
  backToMenuButton.style.padding = '10px 20px';
  backToMenuButton.style.fontSize = '16px';
  backToMenuButton.addEventListener('click', () => {
      window.location.href = "index.html";
  });

  document.body.appendChild(backToMenuButton);
}

function goToMenu() {
  window.location.href = 'index.html'; // Redirect to the main menu page
}
function goToMenu() {
  resetTracing();
  window.location.href = 'index.html'; // Redirect to the main menu page
}

function draw() {
  if (screen === 'menu') {
    showMenuScreen();
  } else if (screen === 'game') {
    showGameScreen();
  } else if (screen === 'redirection') {
    showRedirectionScreen();
  }
  
}

function showMenuScreen() {
  background(200);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to the Game", width / 2, height / 2 - 100);
  textSize(20);
  text("Click to start", width / 2, height / 2);

  if (mouseIsPressed) {
    screen = 'game'; // Go to game screen
    startNewGame();
    isTracing = true; // Start tracing after clicking to start
  }
}

function startNewGame() {
  shapes = [];
  trail = [];
  currentShapeIndex = 0;
  accuracy = 0; // Reset accuracy at the start of a new game
  isTracing = false;
}

function showGameScreen() {
  background(240); // A light gray background for the game screen
  image(bgImage, 0, 0, width, height); // Background image

  if (shapes.length === 0) {
    // Add shapes to the array (only once)
    shapes.push({
      type: 'circle',
      x: width / 2,
      y: height / 2,
      radius: 50,
      dots: generateDots(width / 2, height / 2, 50)  // Dots around circle
    });
    shapes.push({
      type: 'rectangle',
      x1: width / 2 - 50,
      y1: height / 2 - 50,
      x2: width / 2 + 50,
      y2: height / 2 - 50,
      x3: width / 2 + 50,
      y3: height / 2 + 50,
      x4: width / 2 - 50,
      y4: height / 2 + 50,
      dots: generateRectangleDots(width / 2 - 50, height / 2 - 50, width / 2 + 50, height / 2 + 50)  // Dots around rectangle
    });
  }

  let shape = shapes[currentShapeIndex];

  // Draw the current shape
  noFill();
  stroke(0);
  if (shape.type === 'circle') {
    ellipse(shape.x, shape.y, shape.radius * 2);
  } else if (shape.type === 'rectangle') {
    beginShape();
    vertex(shape.x1, shape.y1);
    vertex(shape.x2, shape.y2);
    vertex(shape.x3, shape.y3);
    vertex(shape.x4, shape.y4);
    endShape(CLOSE);
  }

  drawDotsOnOutline(shape);

  // Handle the player's trail as they trace
  stroke(255, 0, 0);
  strokeWeight(2);
  beginShape();
  for (let pt of trail) {
    vertex(pt.x, pt.y);
  }
  endShape();

  if (isTracing && mouseIsPressed) {
    trail.push({ x: mouseX, y: mouseY });

    // Check if the dots have been traced
    checkDotHit(shape.dots);

    if (checkAllDotsCovered(shape.dots)) {
      if (isTracingComplete(shape)) {
        isTracing = false;
        trail = [];
        calculateAccuracy(shape); // Calculate accuracy
        continueButton.show(); // Show the continue button
      }
    }
  }

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Click to start tracing, Press home to return", width / 2, height - 30);
}

function showRedirectionScreen() {
  background(200);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You've completed the tracing!", width / 2, height / 2 - 100);
  textSize(20);
  text("Click to continue", width / 2, height / 2);
  textSize(18);
  text("Accuracy: " + accuracy + "%", width / 2, height / 2 + 30); // Display the accuracy
  
  if (mouseIsPressed) {
    screen = 'game'; // Go back to game screen
    startNewGame();
  }
}

// Dot-related functions
function generateDots(centerX, centerY, radius) {
  let numDots = 36; // Number of dots around the circle
  let dots = [];
  for (let i = 0; i < numDots; i++) {
    let angle = map(i, 0, numDots, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    dots.push({ x, y, hit: false });  // Added a 'hit' property to track if the dot is covered
  }
  return dots;
}

function generateRectangleDots(x1, y1, x2, y2) {
  let numDots = 10; // Number of dots per side
  let dots = [];

  // Ensure top-left corner is the starting point
  let rectCoordinates = [
    { x: x1, y: y1 }, // Top-left
    { x: x2, y: y1 }, // Top-right
    { x: x2, y: y2 }, // Bottom-right
    { x: x1, y: y2 }  // Bottom-left
  ];

  // Generate dots for each side
  for (let i = 0; i < rectCoordinates.length; i++) {
    let start = rectCoordinates[i];
    let end = rectCoordinates[(i + 1) % rectCoordinates.length];
    
    for (let j = 0; j <= numDots; j++) {
      let x = lerp(start.x, end.x, j / numDots);
      let y = lerp(start.y, end.y, j / numDots);
      dots.push({ x, y, hit: false });
    }
  }

  return dots;
}

function drawDotsOnOutline(shape) {
  for (let dot of shape.dots) {
    fill(dot.hit ? 0 : 255, 0, 0);  // Green for hit, red for unhit
    noStroke();
    ellipse(dot.x, dot.y, 10);
  }
}

function checkDotHit(dots) {
  for (let dot of dots) {
    let d = dist(mouseX, mouseY, dot.x, dot.y);
    if (d < 10 && !dot.hit) {
      dot.hit = true; // Mark the dot as hit
    }
  }
}

function checkAllDotsCovered(dots) {
  for (let dot of dots) {
    if (!dot.hit) {
      return false;  // Return false if any dot isn't hit yet
    }
  }
  return true; // All dots are hit
}

function isTracingComplete(shape) {
  // Check if all the dots have been hit in the shape
  return shape.dots.every(dot => dot.hit);
}

function calculateAccuracy(shape) {
  let totalDots = shape.dots.length;
  let correctHits = shape.dots.filter(dot => dot.hit).length;
  accuracy = Math.round((correctHits / totalDots) * 100); // Calculate accuracy as a percentage
}

function nextShape() {
  currentShapeIndex++;

  if (currentShapeIndex >= shapes.length) {
    // If all shapes are completed, end the game
    screen = 'redirection';
    calculateAccuracy(shapes[currentShapeIndex - 1]); // Ensure accuracy is calculated for the last shape
    continueButton.hide(); // Hide continue button
    return;
  }

  resetShape(); // Reset the new shape's state
}
function resetShape() {
  isTracing = true; // Allow tracing for the new shape
  trail = []; // Clear the trail
  if (shapes[currentShapeIndex]) {
    shapes[currentShapeIndex].dots.forEach(dot => dot.hit = false); // Reset dot hit states
  }
  continueButton.hide(); // Hide continue button for the next shape
}