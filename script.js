// ============================================================
// FOR YOU, AS ALWAYS
// JavaScript
// ============================================================


// ============================================================
// 1. ELEMENTS
// ============================================================

const entrance = document.getElementById("entrance");
const mainContent = document.getElementById("mainContent");
const beginButton = document.getElementById("beginButton");

const revealButton = document.getElementById("revealButton");
const secretText = document.getElementById("secretText");

const fallingEffects = document.getElementById("fallingEffects");


// ============================================================
// 2. WEBSITE STARTUP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // Hide the main website when the page first loads
    mainContent.style.display = "none";

    // Create the falling atmosphere
    createFallingEffects();

    // Create background particles
    createBackgroundParticles();

    // Prepare scroll animations
    prepareScrollAnimations();

});


// ============================================================
// 3. OPENING HEART
// ============================================================

beginButton.addEventListener("click", () => {

    // Prevent multiple clicks
    beginButton.disabled = true;

    // Add the opening animation
    entrance.classList.add("opening");

    // Future sound effect goes here
    //
    // Example later:
    //
    // const clickSound = new Audio("sounds/click.mp3");
    // clickSound.play();

    // Wait for the entrance animation
    setTimeout(() => {

        entrance.style.display = "none";

        mainContent.style.display = "block";

        // Small delay allows CSS animations to start properly
        setTimeout(() => {

            mainContent.classList.add("visible");

            // Start observing scroll animations
            startScrollAnimations();

        }, 100);

    }, 1500);

});


// ============================================================
// 4. EIGHT DIFFERENT FALLING EFFECTS
// ============================================================
//
// Each effect has its own symbol, movement and behavior.
//
// 1. Hearts
// 2. Roses
// 3. Sparkles
// 4. Stars
// 5. Dots
// 6. Petals
// 7. Lavender diamonds
// 8. Tiny glowing particles
//
// CSS will control most of the visual appearance.
//


// Available falling objects
const fallingObjects = [

    {
        type: "heart",
        symbols: ["♥", "♡"]
    },

    {
        type: "rose",
        symbols: ["🌹"]
    },

    {
        type: "sparkle",
        symbols: ["✦", "✧", "✨"]
    },

    {
        type: "star",
        symbols: ["★", "☆"]
    },

    {
        type: "dot",
        symbols: ["•", "·"]
    },

    {
        type: "petal",
        symbols: ["❀", "❁", "✿"]
    },

    {
        type: "diamond",
        symbols: ["◆", "◇"]
    },

    {
        type: "particle",
        symbols: ["."]
    }

];


// Generate one falling object
function createFallingObject(effect) {

    const element = document.createElement("span");

    const randomSymbol =
        effect.symbols[
            Math.floor(Math.random() * effect.symbols.length)
        ];

    element.classList.add(
        "falling-object",
        `falling-${effect.type}`
    );

    element.textContent = randomSymbol;


    // Random horizontal starting position
    element.style.left =
        Math.random() * 100 + "vw";


    // Random size
    const size =
        Math.random() * 14 + 8;

    element.style.fontSize =
        size + "px";


    // Random animation duration
    const duration =
        Math.random() * 7 + 6;

    element.style.animationDuration =
        duration + "s";


    // Random delay
    element.style.animationDelay =
        Math.random() * 2 + "s";


    // Random horizontal movement
    const drift =
        (Math.random() - 0.5) * 250;

    element.style.setProperty(
        "--drift",
        drift + "px"
    );


    // Random rotation
    const rotation =
        Math.random() * 720 - 360;

    element.style.setProperty(
        "--rotation",
        rotation + "deg"
    );


    fallingEffects.appendChild(element);


    // Remove it after the animation
    setTimeout(() => {

        element.remove();

    }, (duration + 3) * 1000);

}


// Create all eight effects
function createFallingEffects() {

    fallingObjects.forEach(effect => {

        // Number of objects for each type
        let amount = 3;

        if (effect.type === "dot") {
            amount = 5;
        }

        if (effect.type === "particle") {
            amount = 7;
        }

        for (let i = 0; i < amount; i++) {

            createFallingObject(effect);

        }

    });


    // Continue generating objects
    setTimeout(createFallingEffects, 2500);

}


// ============================================================
// 5. BACKGROUND PARTICLES
// ============================================================

function createBackgroundParticles() {

    const particleContainer =
        document.querySelector(".background-effects");


    // Create 60 tiny particles
    for (let i = 0; i < 60; i++) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            "background-particle"
        );


        // Random position
        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";


        // Random size
        const size =
            Math.random() * 4 + 1;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        // Random animation delay
        particle.style.animationDelay =
            Math.random() * 5 + "s";


        // Random animation speed
        particle.style.animationDuration =
            Math.random() * 5 + 4 + "s";


        particleContainer.appendChild(
            particle
        );

    }

}


// ============================================================
// 6. SCROLL REVEAL SYSTEM
// ============================================================

function prepareScrollAnimations() {

    const elements =
        document.querySelectorAll(".reveal-text");


    elements.forEach(element => {

        element.classList.add(
            "hidden-before-reveal"
        );

    });

}


// Start watching elements
function startScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".hidden-before-reveal"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        // Stop observing after revealing
                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


// ============================================================
// 7. HIDDEN MESSAGE
// ============================================================

revealButton.addEventListener("click", () => {

    // Reveal the secret text
    secretText.classList.toggle(
        "show-secret"
    );


    // Change button text
    if (
        secretText.classList.contains(
            "show-secret"
        )
    ) {

        revealButton.textContent =
            "♥ A little more...";

    } else {

        revealButton.textContent =
            "There is something else...";

    }


    // Future sound effect
    //
    // const revealSound =
    //     new Audio("sounds/reveal.mp3");
    //
    // revealSound.play();

});


// ============================================================
// 8. CLICKABLE HEART EFFECT
// ============================================================

document.addEventListener("click", (event) => {

    // Don't create the effect when clicking
    // the opening heart itself
    if (
        event.target.closest(
            "#beginButton"
        )
    ) {
        return;
    }


    createClickHeart(
        event.clientX,
        event.clientY
    );

});


function createClickHeart(x, y) {

    const heart =
        document.createElement("span");


    heart.classList.add(
        "click-heart"
    );


    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    heart.style.left =
        x + "px";

    heart.style.top =
        y + "px";


    document.body.appendChild(
        heart
    );


    // Remove after animation
    setTimeout(() => {

        heart.remove();

    }, 1200);

}


// ============================================================
// 9. SMOOTH SCROLL
// ============================================================

document.addEventListener("click", (event) => {

    const readOn =
        event.target.closest(".read-on");


    if (!readOn) return;


    const confession =
        document.getElementById(
            "confession"
        );


    confession.scrollIntoView({
        behavior: "smooth"
    });

});


// ============================================================
// 10. FINAL ROSE INTERACTION
// ============================================================

const finalRose =
    document.getElementById(
        "finalRose"
    );


if (finalRose) {

    finalRose.addEventListener(
        "click",
        () => {

            finalRose.classList.add(
                "rose-clicked"
            );


            // Create a burst of hearts
            for (let i = 0; i < 12; i++) {

                createRoseHeart(
                    finalRose
                );

            }

        }
    );

}


function createRoseHeart(rose) {

    const heart =
        document.createElement("span");


    heart.classList.add(
        "rose-heart"
    );


    heart.textContent =
        "♥";


    // Position around the rose
    const rect =
        rose.getBoundingClientRect();


    heart.style.left =
        rect.left +
        rect.width / 2 +
        "px";


    heart.style.top =
        rect.top +
        rect.height / 2 +
        "px";


    // Random direction
    const angle =
        Math.random() *
        Math.PI *
        2;


    const distance =
        Math.random() * 100 + 50;


    heart.style.setProperty(
        "--x",
        Math.cos(angle) *
        distance +
        "px"
    );


    heart.style.setProperty(
        "--y",
        Math.sin(angle) *
        distance +
        "px"
    );


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 1200);

}


// ============================================================
// 11. RANDOM GLOW PULSE
// ============================================================
//
// Gives the background a subtle "alive" feeling.
//


// Occasionally create a glow
setInterval(() => {

    const glow =
        document.createElement("div");


    glow.classList.add(
        "ambient-glow"
    );


    glow.style.left =
        Math.random() * 100 + "vw";

    glow.style.top =
        Math.random() * 100 + "vh";


    document.body.appendChild(
        glow
    );


    setTimeout(() => {

        glow.remove();

    }, 4000);

}, 3000);


// ============================================================
// 12. PREVENT ACCIDENTAL CONTEXT MENU
// ============================================================
//
// Disabled for now.
//
// If you eventually publish the website, DON'T rely on this
// as copyright protection. It doesn't actually protect files.
//
// document.addEventListener("contextmenu", e => {
//     e.preventDefault();
// });


// ============================================================
// END OF SCRIPT
// ============================================================

console.log(
    "💜 For You, As Always — website initialized."
);
