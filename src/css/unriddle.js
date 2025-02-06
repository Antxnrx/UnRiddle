const bubbles = document.querySelectorAll("#bubble");

        bubbles.forEach(bubble => {
            bubble.addEventListener("mouseenter", () => {
                for (let i = 0; i < 6; i++) { // Creates 6 small bubbles
                    let smallBubble = document.createElement("div");
                    smallBubble.classList.add("small-bubble");

                   
                    bubble.style.position = "relative";

                    // Random positions within the parent bubble
                    let offsetX = Math.random() * 120 - 60; // Random X position
                    let offsetY = Math.random() * 120 - 60; // Random Y position

                    smallBubble.style.left = `calc(50% + ${offsetX}px)`;
                    smallBubble.style.top = `calc(50% + ${offsetY}px)`;
                    smallBubble.style.animationDelay = `${Math.random() * 0.5}s`;
                    smallBubble.style.transition = `transform 0.8s ease`;

                    bubble.appendChild(smallBubble);

                    // Remove bubble after animation ends
                    setTimeout(() => {
                        smallBubble.remove();
                    }, 800);
                }
            });
        });



      
            
        

            const fishImages = [
                'https://pics.clipartpng.com/Blue_Fish_PNG_Clip_Art-3019.png',
            'https://www.freeiconspng.com/uploads/orange-fish-png-image-8.png',
            'https://pngimg.com/uploads/seahorse/small/seahorse_PNG15.png',
            'https://www.freeiconspng.com/uploads/bubbles-png-11.png'
            ];
    
            function createFish() {
                const fish = document.createElement('img');
                fish.src = fishImages[Math.floor(Math.random() * fishImages.length)];
                fish.classList.add('fish');
                document.body.appendChild(fish);
    
                let fromLeft = Math.random() < 0.5;
                let startX = fromLeft ? -100 : window.innerWidth + 100;
                let endX = fromLeft ? window.innerWidth + 100 : -100;
                let startY = Math.random() * window.innerHeight;
                
                fish.style.top = `${startY}px`;
                fish.style.left = `${startX}px`;
                fish.style.transform = fromLeft ? 'scaleX(1)' : 'scaleX(-1)';
                fish.style.width = '100px' ;
                fish.style.position = 'absolute';
                fish.style.zIndex = '-1';
    
                let duration = Math.random() * 5 + 5;
    
                let animation = fish.animate([
                    { transform: `translate(${startX}px, 0)` },
                    { transform: `translate(${endX}px, 0)` }
                ], {
                    duration: duration * 1000,
                    iterations: 1
                });
    
                animation.onfinish = () => {
                    if (fish.getBoundingClientRect().right < 0 || fish.getBoundingClientRect().left > window.innerWidth) {
                        fish.remove();
                    }
                    createFish();
                };
            }
    
            for (let i = 0; i < 10; i++) {
                createFish();
            }



            
            
            // const audio = document.getElementById("audio");
            // const playPauseBtn = document.getElementById("playPauseBtn");
    
         
            // window.addEventListener("load", () => {
            //     audio.play().then(() => {
            //         playPauseBtn.src = "https://cdn-icons-png.flaticon.com/512/4181/4181135.png"; 
            //     }).catch(error => {
            //         console.log("Autoplay blocked. User interaction required.");
            //         playPauseBtn.src = "https://cdn-icons-png.flaticon.com/512/2611/2611312.png"; 
            //     });
            // });
    
            // function togglePlayPause() {
            //     if (audio.paused || audio.ended) {
            //         audio.play();
            //         playPauseBtn.src = "https://cdn-icons-png.flaticon.com/512/4181/4181135.png";
            //     } else {
            //         audio.pause();
            //         playPauseBtn.src = "https://cdn-icons-png.flaticon.com/512/2611/2611312.png"; // Show play button
            //     }
            // }
    
            // // Prevent earphone media controls from affecting the player
            // document.addEventListener("keydown", function (event) {
            //     if (event.key === "MediaPlayPause" || event.key === "MediaTrackNext" || event.key === "MediaTrackPrevious") {
            //         event.preventDefault();
            //     }
            // });
    
            // // Reset button to play when music ends
            // audio.addEventListener("ended", () => {
            //     playPauseBtn.src = "https://cdn-icons-png.flaticon.com/512/2611/2611312.png";
            // });