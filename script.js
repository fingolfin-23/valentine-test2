const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Variable to track the scale of the Yes button
let yesScale = 1;

// Initialize Yes button styles
yesBtn.style.position = "relative";
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";

// Initialize No button styles - FIXED
noBtn.style.position = "absolute"; // Change from relative to absolute
noBtn.style.transition = "transform 0.2s ease";
noBtn.style.left = "50%"; // Center it initially
noBtn.style.top = "50%";
noBtn.style.transform = "translate(-50%, -50%)";

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
        // Reset No button position when letter opens
        setTimeout(() => {
            noBtn.style.transform = "translate(-50%, -50%)";
        }, 600);
    }, 50);
});

// Function to move No button safely
function moveNoButton() {
    // Grow the YES button
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Get container dimensions
    const letterWindow = document.querySelector(".letter-window");
    const containerRect = letterWindow.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries (stay inside letter window)
    const padding = 20;
    const maxX = containerRect.width - noBtnRect.width - padding;
    const maxY = containerRect.height - noBtnRect.height - padding;
    const minX = padding;
    const minY = padding;

    // Generate random position within bounds
    let randomX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    let randomY = Math.floor(Math.random() * (maxY - minY + 1) + minY);

    // Convert to position relative to letter window
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.transform = "none"; // Remove translate
}

// Move NO button on hover
noBtn.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    moveNoButton();
});

// Move NO button on click
noBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    moveNoButton();
});

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});

// Reset No button position if Yes is clicked (just in case)
yesBtn.addEventListener("click", () => {
    noBtn.style.left = "50%";
    noBtn.style.top = "50%";
    noBtn.style.transform = "translate(-50%, -50%)";
});

// Make sure No button starts centered
window.addEventListener("load", () => {
    noBtn.style.left = "50%";
    noBtn.style.top = "50%";
    noBtn.style.transform = "translate(-50%, -50%)";
    noBtn.style.position = "absolute";
});