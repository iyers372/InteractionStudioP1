document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded - Preparing Countdown and GIF Background");

    const countdownContainer = document.getElementById("countdown-container");
    const countdownText = document.getElementById("countdown");
    const mainContainer = document.getElementById("main-container");
    const timerColumn = document.querySelectorAll("#timer-column .timestamp");
    const poemLines = document.querySelectorAll("#poem-column .poem-line");

    let countdown = 3;

    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownText.textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownContainer.style.opacity = "0";
            setTimeout(() => {
                countdownContainer.style.display = "none";
                mainContainer.style.display = "block";
                startPoemSequence(); 
            }, 1000);
        }
    }, 1000);

    
    function typeText(element, text, speed, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

  
    function startPoemSequence() {
        let index = 0;

        function showNextTimestamp() {
            if (index < timerColumn.length) {
                const timestamp = timerColumn[index];
                timestamp.style.opacity = "1";
                timestamp.textContent = "";
                typeText(timestamp, timestamp.dataset.time, 10, () => {
                    index++;
                    setTimeout(showNextTimestamp, 2);
                });

                if (index % 500 === 0 && (index / 500) < poemLines.length) {
                    const poemIndex = index / 500;
                    const poemLine = poemLines[poemIndex];

                    poemLine.style.opacity = "1";
                    poemLine.textContent = "";
                    typeText(poemLine, poemLine.dataset.text, 30);
                }
            }
        }
        showNextTimestamp();
    }
});




function triggerFinalAnimation() {
    console.log("Triggering Final Animation...");

    const timestamps = document.querySelectorAll(".timestamp");
    const poemLines = document.querySelectorAll(".poem-line");
    const background = document.getElementById("main-container");

    
    setTimeout(() => {
        timestamps.forEach((timestamp) => {
            timestamp.style.transition = "transform 1s ease-in-out, opacity 1s ease-in-out";
            timestamp.style.transform = "translateX(-100px)";
            timestamp.style.opacity = "0";
        });

        poemLines.forEach((poemLine) => {
            poemLine.style.transition = "transform 1s ease-in-out, opacity 1s ease-in-out";
            poemLine.style.transform = "translateX(-100px)";
            poemLine.style.opacity = "0";
        });

        
        setTimeout(() => {
            background.style.transition = "opacity 1.5s ease-in-out";
            background.style.opacity = "0";
        }, 1000);

        
        setTimeout(() => {
            const instructionMessage = document.createElement("div");
            instructionMessage.id = "instruction-message";
            document.body.appendChild(instructionMessage);

            let messageText = "Click and rearrange the poem lines";
            let index = 0;
            let isDeleting = false;

            function typeMessage() {
                if (!isDeleting && index < messageText.length) {
                    instructionMessage.innerHTML = messageText.substring(0, index + 1);
                    index++;
                    setTimeout(typeMessage, 50); 
                } else if (!isDeleting) {
                    
                    setTimeout(() => {
                        isDeleting = true;
                        typeMessage();
                    }, 3000);
                } else if (isDeleting && index > 0) {
                    instructionMessage.innerHTML = messageText.substring(0, index - 1);
                    index--;
                    setTimeout(typeMessage, 50); 
                } else {
                    
                    showDraggablePoem();
                }
            }
            typeMessage();
        }, 2000);
    }, 15000);
}


function showDraggablePoem() {
    console.log("Displaying final poem lines...");
    
    let poemContainer = document.getElementById("final-poem");
    
    if (!poemContainer) {
        poemContainer = document.createElement("div");
        poemContainer.id = "final-poem";
        poemContainer.style.opacity = "0";
        poemContainer.style.transition = "opacity 1.5s ease-in-out";
        poemContainer.style.position = "absolute";
        poemContainer.style.top = "10px";  
        poemContainer.style.left = "50%";
        poemContainer.style.transform = "translateX(-50%)";
        poemContainer.style.textAlign = "center";
        poemContainer.style.fontSize = "0.9rem";
        poemContainer.style.color = "white";
        poemContainer.style.lineHeight = "2.6"; 
        poemContainer.style.width = "80%"; 
        poemContainer.style.margin = "0 auto"; 
        document.body.appendChild(poemContainer);
    }

    const poemLinesArray = [
        "The hours pass like distant trains",
        "Each carrying what we lose and gain",
        "Time like a river flows away",
        "Echoes remain, but not to stay",
        "Memories flicker in dimming light",
        "Chasing the past into the night",
        "Seconds unravel, threads of fate",
        "Too soon we realize it's too late",
        "Digital ghosts whisper and fade",
        "Lost in the code our minds have made",
        "Numbers shift, the system hums",
        "The future calls, the past succumbs",
        "Tick, glitch, a moment dies",
        "Reborn anew in data’s eyes"
    ];

    poemLinesArray.forEach((line, index) => {
        let lineElement = document.createElement("p");
        lineElement.classList.add("draggable-line");
        lineElement.textContent = line;
        lineElement.setAttribute("draggable", "true");
        lineElement.style.position = "absolute";
        lineElement.style.left = "50%";
        lineElement.style.top = `${10 + index * 30}px`; 
        lineElement.style.transform = "translateX(-50%)";
        poemContainer.appendChild(lineElement);
    });

    setTimeout(() => {
        poemContainer.style.opacity = "1";
        makeDraggable();
    }, 500);

    setTimeout(() => {
        document.getElementById("repeat-experience").style.opacity = "1"; 
    }, 1000);
    
}


    setTimeout(() => {
        poemContainer.style.opacity = "1";
        makeDraggable();
    }, 500);



function makeDraggable() {
    console.log("Making poem lines draggable...");
    
    const lines = document.querySelectorAll(".draggable-line");

    lines.forEach((line) => {
        let isDragging = false;

        line.addEventListener("mousedown", (e) => {
            isDragging = true;
            let offsetX = e.clientX - line.getBoundingClientRect().left;
            let offsetY = e.clientY - line.getBoundingClientRect().top;

            document.onmousemove = (event) => {
                if (!isDragging) return;
                line.style.left = `${event.clientX - offsetX}px`;
                line.style.top = `${event.clientY - offsetY}px`;
            };

            document.onmouseup = () => {
                isDragging = false;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        });

        
        line.addEventListener("touchstart", (e) => {
            isDragging = true;
            let touch = e.touches[0];
            let offsetX = touch.clientX - line.getBoundingClientRect().left;
            let offsetY = touch.clientY - line.getBoundingClientRect().top;

            document.ontouchmove = (event) => {
                if (!isDragging) return;
                let moveTouch = event.touches[0];
                line.style.left = `${moveTouch.clientX - offsetX}px`;
                line.style.top = `${moveTouch.clientY - offsetY}px`;
            };

            document.ontouchend = () => {
                isDragging = false;
                document.ontouchmove = null;
                document.ontouchend = null;
            };
        });
    });
}


