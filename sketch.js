document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.color = "#333";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.position = "relative";


const initialTheme = localStorage.getItem('theme') || 'normal';
applyTheme(initialTheme);


function createYouTubeBackground(videoId) {
   const iframe = document.createElement('iframe');
   iframe.setAttribute('id', 'video-background');
   iframe.setAttribute('frameborder', '0');
   iframe.setAttribute('allow', 'autoplay; encrypted-media');
   iframe.setAttribute('allowfullscreen', '');
   iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0&rel=0`);


   iframe.style.position = "fixed";
   iframe.style.top = "0";
   iframe.style.left = "0";
   iframe.style.width = "100vw";
   iframe.style.height = "100vh";
   iframe.style.zIndex = "-1"; 
   iframe.style.pointerEvents = "none"; 


   document.body.appendChild(iframe);
}


function createCornerVideos() {
   const videoIds = ["Q7n2BQ4zZik", "NY152bj4VO0", "melsHDqi0YA", "k9QSISkevg8"];
   const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];


   positions.forEach((position, index) => {
       const videoDiv = document.createElement('iframe');
       videoDiv.src = `https://www.youtube.com/embed/${videoIds[index]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoIds[index]}&modestbranding=1&showinfo=0&rel=0`;
       videoDiv.style.position = "fixed";
       videoDiv.style.width = "30vw";
       videoDiv.style.height = "30vh";
       videoDiv.style.zIndex = "-1";
       videoDiv.style.pointerEvents = "none";


       switch (position) {
           case "top-left":
               videoDiv.style.top = "0";
               videoDiv.style.left = "0";
               break;
           case "top-right":
               videoDiv.style.top = "0";
               videoDiv.style.right = "0";
               break;
           case "bottom-left":
               videoDiv.style.bottom = "0";
               videoDiv.style.left = "0";
               break;
           case "bottom-right":
               videoDiv.style.bottom = "0";
               videoDiv.style.right = "0";
               break;
       }
       document.body.appendChild(videoDiv);
   });
}


function applyTheme(theme) {
    const menu = document.getElementById('menu');
    const videoBackground = document.getElementById('video-background');
    const content = document.getElementById('content'); 

    if (theme === 'dark') {
        document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
        document.body.style.color = "#FFFFFF";

        if (content) {
            content.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        }

        if (videoBackground) {
            videoBackground.style.display = 'block';
        }

        if (menu) {
            menu.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
            menu.style.color = "#FFFFFF";
            Array.from(menu.getElementsByTagName('button')).forEach(button => {
                button.style.backgroundColor = "red";
                button.style.color = "#FFFFFF";
            });
        }
    } else {
        document.body.style.backgroundColor = "rgba(255, 255, 255, 1)";
        document.body.style.color = "#333333";

        if (content) {
            content.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        }

        if (videoBackground) {
            videoBackground.style.display = 'block';
        }

        if (menu) {
            menu.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
            menu.style.color = "#333333";
            Array.from(menu.getElementsByTagName('button')).forEach(button => {
                button.style.backgroundColor = "#000c66";
                button.style.color = "#FFFFFF";
            });
        }
    }

    document.body.offsetHeight;
}
const currentTheme = localStorage.getItem('theme') || 'normal';
applyTheme(currentTheme);


function createMenu() {
    const menu = document.createElement('div');
    menu.setAttribute('id', 'menu');
    menu.style.position = "absolute"; // Position the menu at the top of the page
    menu.style.top = "20px"; // Adjust the position to have a gap from the top
    menu.style.left = "50%"; // Center horizontally
    menu.style.transform = "translateX(-50%)"; // Ensure it's centered
    menu.style.borderRadius = "15px";
    menu.style.padding = "30px 50px";
    menu.style.textAlign = "center";
    menu.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    menu.style.display = "flex";
    menu.style.flexDirection = "column"; // Align buttons vertically
    menu.style.alignItems = "center";
    menu.style.justifyContent = "space-around";
    menu.style.gap = "20px";

    const header = document.createElement('h1');
    header.textContent = "Main Menu";
    header.style.marginBottom = "20px";
    header.style.fontSize = "32px";
    menu.appendChild(header);

    const buttons = [
        { name: 'Games', key: ' ' },
        { name: 'Accessibility', key: ' ' },
        { name: 'About', key: ' ' }
    ];

    buttons.forEach(({ name, key }) => {
        const button = document.createElement('button');
        button.textContent = `${name} ${key}`;
        button.style.backgroundColor = "#008B8B";
        button.style.color = "#FFFFFF";
        button.style.border = "none";
        button.style.borderRadius = "10px";
        button.style.padding = "12px 20px";
        button.style.margin = "10px auto";
        button.style.cursor = "pointer";
        button.style.fontSize = "18px";
        button.style.transition = "background-color 0.3s";

        button.onmouseover = function() {
            button.style.backgroundColor = "#FF5722";
        };
        button.onmouseout = function() {
            button.style.backgroundColor = "#008B8B";
        };

        button.addEventListener('click', () => {
            if (name === 'Games') {
                showGameSelection();
            } else if (name === 'About') {
                showSection('About');
            } else if (name === 'Accessibility') {
                showAccessibilityMenu();
            } else {
                alert(`${name} section is coming soon!`);
            }
        });

        menu.appendChild(button);
    });

    document.body.appendChild(menu);
}


function showGameSelection() {
    const theme = localStorage.getItem('theme') || 'normal';
    document.body.innerHTML = '';
    const sectionDiv = document.createElement('div');
    sectionDiv.style.display = "flex";
    sectionDiv.style.flexDirection = "column";
    sectionDiv.style.alignItems = "center";
    sectionDiv.style.justifyContent = "center";
    sectionDiv.style.height = "100vh";
    sectionDiv.style.backgroundColor = theme === 'dark' ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)";
    /*sectionDiv.style.backgroundImage = "url('NewBack1.jpg')";
    sectionDiv.style.backgroundSize = "cover"; // Ensure the image covers the entire div
    sectionDiv.style.backgroundRepeat = "no-repeat";
    sectionDiv.style.backgroundPosition = "center";
    This is to add an image into the game selection page if we wanted to, its current implementation is broken*/


    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = "Game Selection";
    sectionTitle.style.color = theme === 'dark' ? "#FFFFFF" : "#333333";
    sectionDiv.appendChild(sectionTitle);


   const games = [
       { name: 'Fruit Game', file: 'game1.html' },
       { name: 'Trace Game', file: 'game2.html' },
       { name: 'Dangerous Fruit Game', file: 'game3.html' }
   ];


   games.forEach(({ name, file }) => {
       const gameButton = document.createElement('button');
       gameButton.textContent = name;
       gameButton.style.backgroundColor = "#008B8B";
       gameButton.style.color = "#FFFFFF";
       gameButton.style.border = "none";
       gameButton.style.borderRadius = "10px";
       gameButton.style.padding = "12px 20px";
       gameButton.style.margin = "10px auto";
       gameButton.style.cursor = "pointer";
       gameButton.style.fontSize = "18px";


       gameButton.addEventListener('click', () => {
           window.location.href = file;
       });


       sectionDiv.appendChild(gameButton);
   });


   const backButton = document.createElement('button');
   backButton.textContent = "Back to Menu";
   backButton.style.backgroundColor = "#008B8B";
   backButton.style.color = "#FFFFFF";
   backButton.style.border = "none";
   backButton.style.borderRadius = "10px";
   backButton.style.padding = "12px 20px";
   backButton.style.cursor = "pointer";
   backButton.style.fontSize = "18px";
   backButton.style.marginTop = "20px";


   backButton.addEventListener('click', () => {
       document.body.innerHTML = '';
       createYouTubeBackground("RzVvThhjAKw");
       createMenu();
   });


   sectionDiv.appendChild(backButton);
   document.body.appendChild(sectionDiv);
}


function showAccessibilityMenu() {
    const currentTheme = localStorage.getItem('theme') || 'normal';
    document.body.innerHTML = '';
    const sectionDiv = document.createElement('div');
    sectionDiv.style.display = "flex";
    sectionDiv.style.flexDirection = "column";
    sectionDiv.style.alignItems = "center";
    sectionDiv.style.justifyContent = "center";
    sectionDiv.style.height = "100vh";
    sectionDiv.style.backgroundColor = currentTheme === 'dark' ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)";

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = "Accessibility Settings";
    sectionTitle.style.color = currentTheme === 'dark' ? "#FFFFFF" : "#333333";
    sectionDiv.appendChild(sectionTitle);

   const darkModeButton = document.createElement('button');
   darkModeButton.textContent = "Toggle Dark Mode";
   darkModeButton.style.backgroundColor = "#008B8B";
   darkModeButton.style.color = "#FFFFFF";
   darkModeButton.style.border = "none";
   darkModeButton.style.borderRadius = "10px";
   darkModeButton.style.padding = "12px 20px";
   darkModeButton.style.margin = "10px auto";
   darkModeButton.style.cursor = "pointer";
   darkModeButton.style.fontSize = "18px";

   darkModeButton.addEventListener('click', () => {
       const newTheme = currentTheme === 'dark' ? 'normal' : 'dark';
       localStorage.setItem('theme', newTheme);
       applyTheme(newTheme); // Apply the new theme immediately
       document.body.innerHTML = ''; // Reset the body after theme change
       showAccessibilityMenu(); // Recreate the accessibility menu after theme change
   });

   sectionDiv.appendChild(darkModeButton);

   const backButton = document.createElement('button');
   backButton.textContent = "Back to Menu";
   backButton.style.backgroundColor = "#008B8B";
   backButton.style.color = "#FFFFFF";
   backButton.style.border = "none";
   backButton.style.borderRadius = "10px";
   backButton.style.padding = "12px 20px";
   backButton.style.cursor = "pointer";
   backButton.style.fontSize = "18px";
   backButton.style.marginTop = "20px";

   backButton.addEventListener('click', () => {
       document.body.innerHTML = '';
       createYouTubeBackground("RzVvThhjAKw");
       createMenu();
   });

   sectionDiv.appendChild(backButton);
   document.body.appendChild(sectionDiv);
}
// Show a specific section (like About)
function showSection(section) {
    document.body.innerHTML = '';
 
    const sectionDiv = document.createElement('div');
    sectionDiv.style.display = "flex";
    sectionDiv.style.flexDirection = "column";
    sectionDiv.style.alignItems = "center";
    sectionDiv.style.justifyContent = "center";
    sectionDiv.style.height = "100vh";
    sectionDiv.style.position = "relative";
 
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = `${section} Section`;
 
    const currentTheme = localStorage.getItem('theme') || 'normal';
    if (currentTheme === 'dark') {
        sectionTitle.style.color = "#FFFFFF";  
    } else {
        sectionTitle.style.color = "#333333";  
    }
 
    sectionDiv.appendChild(sectionTitle);
 
    if (section === 'About') {
        // Contributors
        const contributors = ['Alexander Lumala', 'Holy Hill', 'Shaune Shelby', 'Christopher Phillips'];
        const contributorsList = document.createElement('ul');
        contributors.forEach(contributor => {
            const listItem = document.createElement('li');
            listItem.textContent = contributor;
            contributorsList.appendChild(listItem);
        });
        sectionDiv.appendChild(contributorsList);
        
        // Game Descriptions
        const gamesDescription = document.createElement('div');
        gamesDescription.innerHTML = `
            <ul>
                <li><strong>Fruit and Vegetable Matching Game:</strong> Match the names of the fruits and vegetables with their corresponding images. Drag and drop the name onto the image. Each level gets harder, with less time and more matches. Good luck!</li>
                <li><strong>Trace Game:</strong> Trace a shape along a dotted line to reach a randomized goal within the time limit. Complete the shape accurately to move to the next round.</li>
                <li><strong>Dangerous Fruit Game:</strong> Match the berries to their corresponding names by dragging them into the boxes. Avoid the poisonous berries! Each round, more berries and poisonous berries will appear. If two poisonous berries are placed in the boxes, the game ends. Complete all matches to move to the next round. You have 20 seconds per round. Good luck!</li>
            </ul>
        `;
        sectionDiv.appendChild(gamesDescription);
        
        createCornerVideos();  // Assuming this is a function you use to add corner videos
    }
 
    // Back Button
    const backButton = document.createElement('button');
    backButton.textContent = "Back to Menu";
    backButton.style.backgroundColor = "#008B8B";
    backButton.style.color = "#FFFFFF";
    backButton.style.border = "none";
    backButton.style.borderRadius = "10px";
    backButton.style.padding = "12px 20px";
    backButton.style.cursor = "pointer";
    backButton.style.fontSize = "18px";
    backButton.style.marginTop = "20px";
 
    backButton.addEventListener('click', () => {
        document.body.innerHTML = '';
        createYouTubeBackground("RzVvThhjAKw"); // Assuming you want to play this video in the background
        createMenu(); // Assuming this is a function to recreate the main menu
    });
 
    sectionDiv.appendChild(backButton);
    document.body.appendChild(sectionDiv);
}



// Initialize background video and menu
createYouTubeBackground("RzVvThhjAKw");
createMenu();



