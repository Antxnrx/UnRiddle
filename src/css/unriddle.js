const bubbles = document.querySelectorAll("#bubble");

        bubbles.forEach(bubble => {
            bubble.addEventListener("mouseenter", () => {
                for (let i = 0; i < 6; i++) { // Creates 6 small bubbles
                    let smallBubble = document.createElement("div");
                    smallBubble.classList.add("small-bubble");

                    // Ensure parent has position: relative for absolute positioning to work
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
            'https://www.freeiconspng.com/uploads/orange-fish-png-image-8.png'
        ];

        function createFish() {
            const fish = document.createElement('img');
            fish.style.position = 'absolute';
            fish.style.zIndex = -1;
            fish.style.width = '100px';
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

            let duration = Math.random() * 5 + 5;

            fish.animate([
                { transform: `translate(${startX}px, 0)` },
                { transform: `translate(${endX}px, 0)` }
            ], {
                duration: duration * 1000,
                iterations: 1
            }).onfinish = () => {
                fish.remove();
                createFish();
            };
        }

        for (let i = 0; i < 10; i++) {
            createFish();
        }