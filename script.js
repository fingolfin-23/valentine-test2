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

// Initialize No button styles
noBtn.style.position = "relative";
noBtn.style.left = "0";
noBtn.style.top = "0";
noBtn.style.transition = "transform 0.3s ease";

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn on hover
noBtn.addEventListener("mouseover", () => {
    // Grow the YES button on hover
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Move the NO button - but keep it within screen bounds
    const letterWindow = document.querySelector(".letter-window");
    const letterRect = letterWindow.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate safe movement bounds
    const maxX = (letterRect.width / 2) - 50;
    const maxY = (letterRect.height / 2) - 50;

    const moveX = (Math.random() * maxX * 2) - maxX;
    const moveY = (Math.random() * maxY * 2) - maxY;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Also grow YES button when NO is clicked
noBtn.addEventListener("click", () => {
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Move NO button to a random position instead of resetting
    const letterWindow = document.querySelector(".letter-window");
    const letterRect = letterWindow.getBoundingClientRect();

    const maxX = (letterRect.width / 2) - 50;
    const maxY = (letterRect.height / 2) - 50;

    const moveX = (Math.random() * maxX * 2) - maxX;
    const moveY = (Math.random() * maxY * 2) - maxY;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});

// Reset No button position when Yes is clicked (for next time)
yesBtn.addEventListener("click", function resetNoButton() {
    // This runs when Yes is clicked, but we hide the buttons anyway
    // So no need to reset since buttons disappear
});

// Make sure No button starts normal on page load
window.addEventListener("load", () => {
    noBtn.style.transform = "translate(0, 0)";
    noBtn.style.left = "0";
    noBtn.style.top = "0";
});