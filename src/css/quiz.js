const progressBarFill = document.getElementById('progressBarFill');
        const questionElement = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        const nextButton = document.getElementById('nextButton');

        let currentQuestionIndex = 0;
        const totalQuestions = 10;

        
        async function fetchQuestion() {
            return {
                question: `Question ${currentQuestionIndex + 1}?`,
                options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            };
        }

        function updateProgressBar() {
            const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
            progressBarFill.style.width = progress + '%';
        }

        function loadQuestion() {
            fetchQuestion().then(data => {
                questionElement.textContent = data.question;
                optionsContainer.innerHTML = '';
        
                data.options.forEach((option, index) => {
                    const button = document.createElement('div');
                    button.className = 'option';
                    button.style.fontSize = '25px';
                    button.style.color = 'crimson';      
                    // Add images as indicators
                    const img = document.createElement('img');
                    const images = ['./assets/gian.png', './assets/nobita.png', './assets/shizuka.png', './assets/suneo.png'];
                    img.src = images[index];
                    img.alt = `Indicator ${index + 1}`;
                    img.style.width = '50px';
                    img.style.marginRight = '10px';
        
                    // Add image and option text to the button
                    button.appendChild(img);
                    button.appendChild(document.createTextNode(option));
                    button.onclick = () => {
                        selectOption(index);
                    };
                    optionsContainer.appendChild(button);
                });
        
                nextButton.disabled = true;
            });
        }
        
        

        function selectOption(selectedIndex) {
            
            const options = document.querySelectorAll('.option');
            options.forEach((option, index) => {
                option.style.backgroundColor = index === selectedIndex ? '#aed581' : '#f0f0f0';
            });
            nextButton.disabled = false;
        }

        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                updateProgressBar();
                loadQuestion();
            } else {
                alert('Quiz Completed!');
            }
        });

       
        updateProgressBar();
        loadQuestion();

        function createStar() {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            document.body.appendChild(star);
        
            setTimeout(() => {
                star.remove();
            }, 1000);
        }
        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                updateProgressBar();
                loadQuestion();
        
                
                for (let i = 0; i < 10; i++) {
                    setTimeout(createStar, i * 100);
                }
            } else {
                alert('Quiz Completed!');
            }
        });
        