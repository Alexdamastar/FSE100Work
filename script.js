let screen = 'menu'; // This will track which screen is active
let bgImage; // Variable to store the background image
let logImage; // Variable to store the log image
let customFont; // Variable to store the custom font

function preload() {
  bgImage = loadImage('Back1.jpg'); // Load your background image
  logImage = loadImage('file.png'); // Load the log image for buttons
  customFont = loadFont('KumarOne-Regular.ttf'); // Load your custom font
}

function setup() {
  createCanvas(400, 400); // Set the canvas size to 400x400
}

function draw() {
  background(255); // Default background

  if (screen === 'menu') {
    showMenu();
  } else if (screen === 'screen1') {
    showScreen1();
  } else if (screen === 'screen2') {
    showScreen2();
  } else if (screen === 'screen3') {
    showScreen3();
  }
}

function showMenu() {
  // Maintain the aspect ratio of the image while fitting it within the canvas
  let aspectRatio = bgImage.width / bgImage.height;
  let imgWidth, imgHeight;

  if (aspectRatio > 1) { // Image is wider than tall
    imgWidth = width;
    imgHeight = width / aspectRatio;
  } else { // Image is taller than wide or square
    imgHeight = height;
    imgWidth = height * aspectRatio;
  }

  // Center the image on the canvas
  let imgX = (width - imgWidth) / 2;
  let imgY = (height - imgHeight) / 2;
  image(bgImage, imgX, imgY, imgWidth, imgHeight); // Display the image while maintaining aspect ratio

  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont); // Set the custom font
  fill(255); // Change text color to white so it stands out against the background
  text("Menu", width / 2, height / 4 - 20); // Title (Adjusted y-coordinate)

  // Horizontal position for centered buttons
  let centerX = (width - 200) / 2; // 200 is the button width

  // Button 1
  if (button(centerX, 100, "Screen 1")) {
    screen = 'screen1';
  }

  // Button 2
  if (button(centerX, 200, "Screen 2")) {
    screen = 'screen2';
  }

  // Button 3
  if (button(centerX, 300, "Screen 3")) {
    screen = 'screen3';
  }
}

function button(x, y, label) {
  // Draw the log image as the button
  image(logImage, x, y, 200, 80); // Size the log image to fit as a button (200x80)

  // Draw text on top of the log image
  fill(255); // White text for better contrast
  textSize(18); // Smaller text size to fit the button
  textFont(customFont); // Set the custom font for the button text
  textAlign(CENTER, CENTER); // Center the text within the button
  text(label, x + 100, y + 40); // Center the text inside the log (200x80)

  // Check if the mouse is over the button and clicked
  if (mouseIsPressed && mouseX > x && mouseX < x + 200 && mouseY > y && mouseY < y + 80) {
    return true;
  } else {
    return false;
  }
}

// Screen 1
function showScreen1() {
  background(100, 150, 255);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont); // Set the custom font
  fill(255);
  text("Screen 1", width / 2, height / 2);
}

// Screen 2
function showScreen2() {
  background(150, 200, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont); // Set the custom font
  fill(255);
  text("Screen 2", width / 2, height / 2);
}

// Screen 3
function showScreen3() {
  background(255, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont); // Set the custom font
  fill(255);
  text("Screen 3", width / 2, height / 2);
}
