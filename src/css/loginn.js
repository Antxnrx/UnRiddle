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

// function  toggglePlayPause() {
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