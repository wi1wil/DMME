// These are the images used in the game and the bit depth for each one.
const guessImages = [
    { file: "assets/images/8bit.png", bits: 8 },
    { file: "assets/images/4bit.png", bits: 4 },
    { file: "assets/images/2bit.png", bits: 2 }
];

let currentImage = 0;
let hasAnswered = false;

// Keep references to the parts of the page that the game needs to update.
const guessImage = document.querySelector("#guess-image");
const guessMessage = document.querySelector("#guess-message");
const nextImageButton = document.querySelector("#next-image");
const bitButtons = document.querySelectorAll(".bit-button");

// Reset the game area when a new image is shown.
function showImage() {
    guessImage.src = guessImages[currentImage].file;
    guessMessage.textContent = "Pick a number to lock in your guess.";
    nextImageButton.disabled = true;
    hasAnswered = false;

    bitButtons.forEach(function (button) {
        button.disabled = false;
    });
}

// Check the button the player picked and show whether it was correct.
function checkAnswer(button) {
    if (hasAnswered) {
        return;
    }

    const answer = Number(button.dataset.answer);
    const correctAnswer = guessImages[currentImage].bits;
    const isCorrect = answer === correctAnswer;

    hasAnswered = true;

    if (isCorrect) {
        guessMessage.textContent = "Correct!";
    } else {
        guessMessage.textContent = "Wrong!";
    }

    nextImageButton.disabled = false;

    bitButtons.forEach(function (bitButton) {
        bitButton.disabled = true;
    });
}

// Wait for the player to choose a bit-depth answer.
bitButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        checkAnswer(button);
    });
});

// Move to the next image after the player has answered.
nextImageButton.addEventListener("click", function () {
    currentImage = (currentImage + 1) % guessImages.length;
    showImage();
});

// Show the first image when the page loads.
showImage();

const soundPlayer = document.querySelector("#sound-player");
const soundButtons = document.querySelectorAll(".sound-bit-button");

// Play the sound associated with the button that was clicked.
soundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        soundPlayer.src = button.dataset.audio;
        soundPlayer.play();
    });
});

