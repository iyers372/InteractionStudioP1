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

    typeText(); 

   
    video.addEventListener("ended", function () {
        h1Element.classList.add("fade-out");
        h2Element.classList.add("fade-out");
        videoContainer.classList.add("fade-out");

        setTimeout(() => {
            h1Element.style.display = "none";
            h2Element.style.display = "none";
            videoContainer.style.display = "none";

           
            const newText = document.createElement("a");
            newText.id = "new-text";
            newText.href = "main/main.html"; 
            newText.textContent = "GO:AHEAD";

            document.body.appendChild(newText);

           
            setTimeout(() => {
                newText.classList.add("fade-in");
            }, 200);

            
            addLongPress(newText);

        }, 800);
    });

   
    function addLongPress(element) {
        let pressTimer;

    
        element.addEventListener("touchstart", (e) => {
            pressTimer = setTimeout(() => {
                element.classList.add("hover-effect"); 
            }, 500); 
        });

       
        element.addEventListener("touchend", (e) => {
            clearTimeout(pressTimer);
            element.classList.remove("hover-effect");
        });

        
        element.addEventListener("touchmove", () => clearTimeout(pressTimer));
    }
});
