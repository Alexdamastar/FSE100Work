let screen = 'menu'; // Track which screen is active
let bgImage, bgScreen1, bgRedirect, bgScreen2, logImage, strawberryImage, raspberryImage, blueberryImage, blackberryImage; // Background and UI images
let customFont; // Custom font variable
let appleImage, orangeImage, bananaImage; // Fruit images for level 1
let elderberryImage, hollyberryImage, jerusalemCherryImage, yewBerryImage; //Berries in screen 3
let chime, error; // Sound effects for interactions
let titlesScreen1 = []; // Array to store draggable title objects
let titlesScreen2 = [];
let timeoutId; // Timeout ID for screen transitions
let matchCount = 0; // Counter for matched items
let level2Items = []; // Array for draggable items in level 2
let currentShapeIndex = 0; // Track the current shape index
let shapes = []; // Array to hold the shapes
let isTracing = false; // Flag to check if tracing is active
let trail = []; // Array to store the trail points
let dotCompletionCount = 0; // Counter for dot completion;
let fruits = [];
let compartments = [];
let correctCompartmentImage;
let isDragging = false;
let draggedFruit = null;
let berrycount = 4;


// Position mappings for items in level 2
const level2Matches = {
  'Carrot': { x: 50, y: 50 },
  'Corn': { x: 150, y: 150 },
  'Tomato': { x: 250, y: 250 }
};

function preload() {
  strawberryImage = loadImage('strawberry.png');
  raspberryImage = loadImage('raspberry.png');
  blueberryImage = loadImage('blueberry.png');
  blackberryImage = loadImage('blackberry.png');
  elderberryImage = loadImage('elderberry.png');
  hollyberryImage = loadImage('hollyberry.png');
  jerusalemCherryImage = loadImage('jerusalem cherry.png');
  yewBerryImage = loadImage('yew berry.png');
  correctCompartmentImage = loadImage('Checkmark.png');
  bgImage = loadImage('Back1.jpg');
  bgScreen1 = loadImage('Back2.jpg');
  bgRedirect = loadImage('RedirectPage.jpg');
  bgScreen2 = loadImage('Back3.png');
  bgScreen3 = loadImage('Back4.jpg');
  logImage = loadImage('file.png');
  customFont = loadFont('KumarOne-Regular.ttf');

  appleImage = loadImage('apple.png');
  orangeImage = loadImage('neworange.jpg');
  bananaImage = loadImage('newbanana.jpg');

  let carrotImage = loadImage('carrot.jpg');
  let cornImage = loadImage('corn.jpg');
  let tomatoImage = loadImage('tomato.jpg');


  level2Items.push({ img: carrotImage, label: 'Carrot', x: random(50, 350), y: random(50, 350), dragging: false });
  level2Items.push({ img: cornImage, label: 'Corn', x: random(50, 350), y: random(50, 350), dragging: false });
  level2Items.push({ img: tomatoImage, label: 'Tomato', x: random(50, 350), y: random(50, 350), dragging: false });

  chime = loadSound('chime.mp3');
  error = loadSound('error.mp3');
}

function setup() {
  createCanvas(400, 400);

  titlesScreen1.push(new DraggableTitle('Apple', 50, 50));
  titlesScreen1.push(new DraggableTitle('Orange', 50, 100));
  titlesScreen1.push(new DraggableTitle('Banana', 50, 150));

  // Align titles in screen 2 of the first game with the images
  titlesScreen2.push(new DraggableTitle('Carrot', 50, 50));   // Carrot aligned with image (50, 50)
  titlesScreen2.push(new DraggableTitle('Corn', 50, 150));     // Corn aligned with image (150, 150)
  titlesScreen2.push(new DraggableTitle('Tomato', 50, 250));   // Tomato aligned with image (250, 250)
  
  // Define fruit objects using DraggableTitle
  fruits.push(new DraggableImage(strawberryImage, 'Strawberry', 50, 50));
  fruits.push(new DraggableImage(raspberryImage, 'Raspberry', 50, 150));
  fruits.push(new DraggableImage(blueberryImage, 'Blueberry', 50, 250));
  fruits.push(new DraggableImage(blackberryImage, 'Blackberry', 50, 350));

  
  // Define compartments with target coordinates
  compartments.push({x: 250, y: 50, label: 'Strawberry'});
  compartments.push({x: 250, y: 150, label: 'Raspberry'});
  compartments.push({x: 250, y: 250, label: 'Blueberry'});
  compartments.push({x: 250, y: 350, label: 'Blackberry'});
}


function draw() {
  background(255);

  if (screen === 'menu') {
    showMenu();
  } else if (screen === 'screen1') {
    showScreen1();
  } else if (screen === 'screen2') {
    showScreen2();
  } else if (screen === 'redirection') {
    showRedirectionScreen();
  }
  else if (screen === 'blankScreen') {
    showBlankScreen();
  }
  else if (screen === 'screen3'){
    showScreen3();
  }
}

function showMenu() {
  isTracing = false; // Reset tracing flag
  trail = []; // Clear the trail points
  background(bgImage);

  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont);
  fill(255);
  text("Menu", width / 2, height / 4 - 20);

  if (button((width - 200) / 2, height / 2 - 60, "Screen 1")) {
    screen = 'screen1';
  }

  if (button((width - 200) / 2, height / 2, "Screen 2")) {
    screen = 'blankScreen';
  }

  if (button((width - 200) / 2, height / 2 + 60, "Screen 3")) {
    screen = 'screen3';
  }
}

function showScreen1() {
  background(bgScreen1);

  image(appleImage, 250, 50, 100, 100);
  image(orangeImage, 250, 160, 100, 100);
  image(bananaImage, 250, 270, 100, 100);

  let allCorrect = true;

  for (let title of titlesScreen1) {
    title.update();
    title.display();

    if (title.isCorrect()) {
      if (!title.correctlyPlaced) {
        chime.play();
        matchCount++;
      }
      title.correctlyPlaced = true;
      title.glow();
    } else if (title.isWrong()) {
      error.play();
      title.correctlyPlaced = false;
    }

    if (!title.correctlyPlaced) {
      allCorrect = false;
    }
  }

  if (allCorrect) {
    setTimeout(() => {
      screen = 'screen2';
    }, 1000);
  }

  textSize(20);
  fill(255, 255, 0);
  text(`Matches: ${matchCount}`, 10, 30); // Correctly displaying match count

}

function showScreen2() {
  background(bgScreen2);

  // Track if all items are correctly placed
  let allCorrect = true;

  // Draw images for level 2 items at their correct positions
  for (const [label, position] of Object.entries(level2Matches)) {
    const item = level2Items.find(item => item.label === label);
    if (item) {
      image(item.img, position.x, position.y, 80, 80);
    }
  }

  // Update each title's position and check for correct placements
  for (let title of titlesScreen2) {
    title.update();
    title.display();

    // Check if title is correctly placed on a level 2 image
    if (title.isCorrect()) {
      if (!title.correctlyPlaced) {
        chime.play();
        matchCount++;
      }
      title.correctlyPlaced = true;
      title.glow();  // Show title with glow effect when matched
    } else {
      title.correctlyPlaced = false;
      allCorrect = false;  // Set to false if any item is incorrectly placed
    }
  }

  // Move to the redirection screen only when all items are matched correctly
  allCorrect = titlesScreen2.every(title => title.correctlyPlaced);
  if (allCorrect) {
    setTimeout(() => {
      screen = 'redirection';
    }, 1000); // Delay of 1 second before transitioning
  }
}

function showBlankScreen() {
  background(240); // A light gray background for the blank screen
  image(bgImage, 0, 0, width, height);
  fill(200); // Light gray button
  noStroke();
  rect(10, 10, 50, 30); // Button rectangle
  fill(0); // Black text
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Home", 35, 25); // Text in the center of the button

  // Check for Home button click
  if (mouseIsPressed && mouseX > 10 && mouseX < 60 && mouseY > 10 && mouseY < 40) {
    resetTracing(); // Reset tracing states
    screen = 'menu'; // Change the screen to menu
  }

  // Your existing shape logic
  if (shapes.length === 0) {
    shapes.push({
      type: 'circle',
      x: width / 2,
      y: height / 2,
      radius: 50,
      dots: generateDots(width / 2, height / 2, 50)
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
      dots: generateRectangleDots(width / 2 - 50, height / 2 - 50, width / 2 + 50, height / 2 + 50)
    });
  }

  let shape = shapes[currentShapeIndex];
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

  stroke(0);
  fill(0);
  for (let dot of shape.dots) {
    if (isDotTraced(dot)) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    ellipse(dot.x, dot.y, 10, 10);
  }

  stroke(255, 0, 0);
  strokeWeight(2);
  beginShape();
  for (let pt of trail) {
    vertex(pt.x, pt.y);
  }
  endShape();

  if (isTracing) {
    trail.push({ x: mouseX, y: mouseY });

    // Continuously check tracing completion
    if (checkAllDotsCovered(shape.dots)) {
      if (isTracingComplete(shape)) {
        isTracing = false;
        trail = [];

        if (shape.type === 'rectangle') {
          screen = 'redirection';
        } else {
          currentShapeIndex++;
          if (currentShapeIndex >= shapes.length) {
            currentShapeIndex = 0;
          }
        }
      }
    }
  }

  textAlign(CENTER, CENTER);
  textSize(15);
  fill(0);
  text("Click to start tracing, Press home to return", width / 2, height - 30);
}

function showScreen3() {
  background(255);
  image(bgScreen3, 0, 0, width, height);
  for (let comp of compartments) {
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(comp.x, comp.y, 60, 60);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(comp.label, comp.x, comp.y);
  }

  let allCorrect = true;

  for (let fruit of fruits) {
    fruit.update();
    fruit.display();
    for (let comp of compartments) {
      if (fruit.isCorrect(comp)) {
        fruit.correctlyPlaced = true;
        fruit.glowIfCorrect();
      } else {
        fruit.correctlyPlaced = false;
      }
    }
    allCorrect = allCorrect && fruit.correctlyPlaced;
  }

  if (allCorrect && fruits.length === berrycount) {
    generateNewFruits();
  }

}

function drawDotsOnOutline(shape) {
  stroke(0); // Set stroke color for the outline
  fill(0); // Set dot color without fill
  if (shape.type === 'circle') {
    let numDots = 36; // Number of dots around the circle
    for (let i = 0; i < numDots; i++) {
      let angle = map(i, 0, numDots, 0, TWO_PI);
      let x = shape.x + cos(angle) * shape.radius;
      let y = shape.y + sin(angle) * shape.radius;
      ellipse(x, y, 5, 5); // Draw dot
    }
  } else if (shape.type === 'rectangle') {
    let dots = [
      { x: shape.x1, y: shape.y1 },
      { x: shape.x2, y: shape.y2 },
      { x: shape.x3, y: shape.y3 }
    ];

    // Interpolating dots along the edges
    for (let i = 0; i < dots.length; i++) {
      let start = dots[i];
      let end = dots[(i + 1) % dots.length]; // Wrap to first dot
      let numDots = 10; // Number of dots per edge

      for (let j = 0; j <= numDots; j++) {
        let x = lerp(start.x, end.x, j / numDots);
        let y = lerp(start.y, end.y, j / numDots);
        ellipse(x, y, 5, 5); // Draw dot
      }
    }
  }
}

function resetTracing() {
  isTracing = false;
  trail = [];
  currentShapeIndex = 0; // Reset to the first shape if needed
}

function isTracingComplete(shape) {
  // Check if all dots have been traced
  for (let dot of shape.dots) {
    if (!isDotTraced(dot)) {
      return false; // If any dot is not traced, return false
    }
  }
  return true; // All dots have been traced
}

function isDotTraced(dot) {
    const threshold = 10; // Adjust this based on your dot size and tracing accuracy
    return trail.some(pt => dist(pt.x, pt.y, dot.x, dot.y) < threshold);
}


function generateDots(centerX, centerY, radius) {
  let dots = [];
  const numDots = 10; // Number of dots
  for (let i = 0; i < numDots; i++) {
    let angle = map(i, 0, numDots, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    dots.push({ x: x, y: y });
  }
  return dots;
}

function generateRectangleDots(x1, y1, x2, y2) {
  let dots = [];
  const numDots = 20; // Adjust the density as needed
  for (let i = 0; i <= numDots; i++) {
    let ratio = i / numDots;
    dots.push({ x: lerp(x1, x2, ratio), y: y1 }); // Top edge
    dots.push({ x: lerp(x2, x1, ratio), y: y2 }); // Bottom edge
    dots.push({ x: x1, y: lerp(y1, y2, ratio) }); // Left edge
    dots.push({ x: x2, y: lerp(y1, y2, ratio) }); // Right edge
  }
  return dots;
}

function showRedirectionScreen() {
  background(bgRedirect);

  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont);
  fill(0);
  text("You Matched All Fruits!", width / 2, height / 4);

  if (button((width - 200) / 2, 200, "Home")) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      screen = 'menu';
    }, 1000);
  }

  if (button((width - 200) / 2, 300, "Try Again")) {
    resetGame();
    screen = 'screen1';
  }
}

function resetGame() {
  titlesScreen1 = [];
  titlesScreen2 = [];
  matchCount = 0;

  titlesScreen1.push(new DraggableTitle('Apple', 50, 50));
  titlesScreen1.push(new DraggableTitle('Orange', 50, 100));
  titlesScreen1.push(new DraggableTitle('Banana', 50, 150));

  titlesScreen2.push(new DraggableTitle('Carrot', 50, 50));
  titlesScreen2.push(new DraggableTitle('Corn', 50, 100));
  titlesScreen2.push(new DraggableTitle('Tomato', 50, 150));

  level2Items.forEach(item => {
    item.correctlyPlaced = false;
    item.dragging = false;
  });
}

// Check if the fruit is placed in the correct compartment
function isCorrectPlacement(compartment) {
  for (let fruit of fruits) {
    if (fruit.label === compartment.label && fruit.isCorrect()) {
      compartment.color = 'green';  // Change the compartment color to green for correct placement
      return true;
    }
  }
  // If the placement is incorrect, set the compartment color to red
  compartment.color = 'red';
  return false;
}


class DraggableTitle {
  constructor(label, x, y) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.correctlyPlaced = false;
  }

  display() {
      textAlign(LEFT, CENTER);
      textSize(24);
      fill(0);
      text(this.label, this.x, this.y);
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  mousePressed() {
    if (mouseX > this.x && mouseX < this.x + textWidth(this.label) &&
        mouseY > this.y - textSize() / 2 && mouseY < this.y + textSize() / 2) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  mouseReleased() {
    this.dragging = false;
    this.correctlyPlaced = this.isCorrect();
    
  }

  isCorrect() {
    let target;

    if (screen === 'screen1') {
      const matchesScreen1 = {
        'Apple': [250, 50],
        'Orange': [250, 160],
        'Banana': [250, 270]
      };
      target = matchesScreen1[this.label];
    } else if (screen === 'screen2') {
      const targetItem = level2Matches[this.label];
      if (targetItem) {
        target = [targetItem.x, targetItem.y];
      }
      else if (screen === 'screen3'){
        const compartment = compartments.find(comp => comp.label === this.label);
        if (compartment) {
          target = [compartment.x, compartment.y];
        }
      }
    }

    // Return true if target is defined and within the correct distance
    return target && dist(this.x, this.y, target[0], target[1]) < 50;
  }

  isWrong() {
    return !this.isCorrect() && !this.correctlyPlaced;
  }

  glow() {
    fill(0, 255, 0);
    text(this.label, this.x, this.y);
  }
  glowIfCorrect() {
    if (this.isCorrect()) {
      fill(0, 255, 0, 100);  // Green overlay for correct placement
      noStroke();
      ellipse(this.x, this.y, 60, 60);  // Draw a glowing effect
    }
  }
}

class DraggableImage {
  constructor(img, label, x, y) {
    this.img = img;
    this.label = label;
    this.x = x;
    this.y = y;
    this.dragging = false;
    this.correctlyPlaced = false;
  }

  display() {
    image(this.img, this.x, this.y, 60, 60);
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  glowIfCorrect() {
    if (this.correctlyPlaced) {
      image(correctCompartmentImage, this.x, this.y, 60, 60); // Set the background image
      if(checkAllCompartmentsFilled() == true)
      {
        resetGame3();
      }
  }
  noStroke();
  }

  startDragging() {
    if (
      mouseX > this.x && mouseX < this.x + 60 &&
      mouseY > this.y && mouseY < this.y + 60
    ) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }
  stopDragging() {
    this.dragging = false;
  }

  isCorrect(compartment) {
    return (
      compartment.label === this.label &&
      dist(this.x, this.y, compartment.x, compartment.y) < 50
    );
  }
}

function resetGame3() {
    // Reset all berries
    background(255);
    generateNewFruits();
    image(bgScreen3, 0, 0, width, height);
  for (let comp of compartments) {
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(comp.x, comp.y, 60, 60);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(comp.label, comp.x, comp.y);
  }
  
    
}

function checkAllCompartmentsFilled() {
  // Check if all compartments are filled with the correct fruit
  /*let allFilled = true; // Assume all are filled initially

  for (let i = 0; i < compartments.length; i++) {
    const comp = compartments[i];
    let isFilled = false;

    // Check each fruit to see if it's placed in the correct compartment
    for (let fruit of fruits) {
      if (fruit.correctlyPlaced && fruit.isCorrect(comp)) {
        isFilled = true;  // Mark as filled if the fruit is correctly placed
        break; // Move on to the next compartment once a fruit is placed correctly
      }
    }

    // If any compartment isn't filled, mark allFilled as false
    if (!isFilled) {
      allFilled = false;
      break;  // No need to check further if one is not filled
    }
  }

  // Return true if all compartments are filled correctly, else false
  return allFilled;*/
  return true;
}


function generateNewFruits() {
  if (berrycount < 6){
    fruits.push(new DraggableImage(elderberryImage,'Elder Berry',100,100));
    fruits.push(new DraggableImage(hollyberryImage,'Hollyberry', 150,150));
    fruits.push(new DraggableImage(jerusalemCherryImage,'Jerusalem Cherry',200,200));
    fruits.push(new DraggableImage(yewBerryImage,'Yew Berry',250,250));
    berrycount += 2;
  }
}

function button(x, y, label) {
  fill(255);
  rect(x, y, 200, 50, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(label, x + 100, y + 25);

  if (mouseX > x && mouseX < x + 200 && mouseY > y && mouseY < y + 50) {
    if (mouseIsPressed) {
      return true;
    }
  }
  return false;
}

function isTracingComplete(shape) {
  let threshold = 10; // Define a threshold for distance
  let completed = true;

  if (shape.type === 'circle') {
    for (let pt of trail) {
      let d = dist(pt.x, pt.y, shape.x, shape.y);
      if (d > shape.radius + threshold) {
        completed = false;
        break;
      }
    }
  } else if (shape.type === 'rectangle') {
    // Calculate the distances from each point of the triangle to the trail points
    for (let pt of trail) {
      let d1 = dist(pt.x, pt.y, shape.x1, shape.y1);
      let d2 = dist(pt.x, pt.y, shape.x2, shape.y2);
      let d3 = dist(pt.x, pt.y, shape.x3, shape.y3);
      if (d1 > threshold && d2 > threshold && d3 > threshold) {
        completed = false;
        break;
      }
    }
  }

  return completed;
}

function checkAllDotsCovered(dots) {
    return dots.every(dot => isDotTraced(dot));
}

function checkAllDotsCovered(dots) {
  return dots.every(dot => isDotTraced(dot)); // Check if every dot has been traced
}

function isDotCovered(dot) {
  // Check if the dot is covered by the tracing trail
  for (let pt of trail) {
    if (dist(pt.x, pt.y, dot.x, dot.y) < 10) { // Check if the distance is less than a threshold
      return true; // Dot is covered
    }
  }
  return false; // Dot is not covered
}


function mousePressed() {
  if (mouseX > 10 && mouseX < 60 && mouseY > 10 && mouseY < 40){
    trail = [];
    screen = 'menu'; // Go to home screen
    return;
  }
  for (let title of titlesScreen1) {
    title.mousePressed();
  }
  for (let title of titlesScreen2) {
    title.mousePressed();
  }
  for (let fruit of fruits) {
    fruit.startDragging();
  }
  isTracing = true;
  
}

function mouseReleased() {
  for (let title of titlesScreen1) {
    title.mouseReleased();
  }
  for (let title of titlesScreen2) {
    title.mouseReleased();
  }
  for (let fruit of fruits) {
    fruit.stopDragging();
  }
  isTracing = false;
}
