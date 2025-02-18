document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.querySelector("h1");
    const h2Element = document.querySelector("h2");
    const video = document.getElementById("intro-video");
    const videoContainer = document.getElementById("video-container");

    function typeText() {
        const title = "THE TIME YOU WON'T REMEMBER"; 
        let index = 0;
        let isDeleting = false;

        function updateText() {
            if (!isDeleting) {
                h1Element.textContent = title.substring(0, index);
                index++;
                if (index > title.length) {
                    setTimeout(() => { isDeleting = true; updateText(); }, 1000);
                    return;
                }
            } else {
                h1Element.textContent = title.substring(0, index);
                index--;
                if (index === 1) { 
                    isDeleting = false;
                }
            }
            setTimeout(updateText, isDeleting ? 70 : 120);
        }

        updateText();
    }

    typeText(); // Start the typing animation

    // ✅ Fade out h1, h2, and video after the video ends
    video.addEventListener("ended", function () {
        h1Element.classList.add("fade-out");
        h2Element.classList.add("fade-out");
        videoContainer.classList.add("fade-out");

        setTimeout(() => {
            h1Element.style.display = "none";
            h2Element.style.display = "none";
            videoContainer.style.display = "none";

            // ✅ Create a clickable link for "GO:AHEAD"
            const newText = document.createElement("a");
            newText.id = "new-text";
            newText.href = "../main/main.html"; // ✅ Change this to your actual next page
            newText.textContent = "GO:AHEAD";

            document.body.appendChild(newText);

            // ✅ Add fade-in effect after a slight delay
            setTimeout(() => {
                newText.classList.add("fade-in");
            }, 200);

            // ✅ Add long-press functionality for mobile
            addLongPress(newText);

        }, 800);
    });

    // ✅ Function to Handle Long Press for Mobile
    function addLongPress(element) {
        let pressTimer;

        // ✅ Start long-press detection
        element.addEventListener("touchstart", (e) => {
            pressTimer = setTimeout(() => {
                element.classList.add("hover-effect"); // ✅ Mimic hover effect
            }, 500); // ✅ Long press duration (500ms)
        });

        // ✅ Remove effect on touch end
        element.addEventListener("touchend", (e) => {
            clearTimeout(pressTimer);
            element.classList.remove("hover-effect");
        });

        // ✅ Prevent accidental activation when scrolling
        element.addEventListener("touchmove", () => clearTimeout(pressTimer));
    }
});
