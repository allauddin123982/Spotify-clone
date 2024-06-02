let songIndex = 0;

let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");

let masterPause = document.getElementById("masterPause");
let progressBar = document.getElementById("progressBar");
let songsList = document.getElementById("songsList");
let sidePauseBtn = document.getElementsByClassName("sidePauseBtn");

let songs = [
  {
    songName: "BASS BOOSTED CAR",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "If I Lose Myself",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Tokyo Drift (Fast & Furious",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Alone",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Gaming Music",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "In The Name Of Love",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Stronger",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Calm Down",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Best Remixes of Popular So",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Can’t Feel My Fact",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

function playSideSong(index) {
  if (audioElement.src !== songs[index].filePath) {
    audioElement.src = songs[index].filePath; // Update the audio source if it's different
    audioElement.load(); // Load the new audio source
  }
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
  } else {
    audioElement = null;
  }
}
function pauseSideSong() {
  if (audioElement.currentTime > 0 && !audioElement.paused) {
    audioElement.pause();
  }
}

function playSongFunc() {
  if (audioElement.pause || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.style.display = "none";
    masterPause.style.display = "inline";
  }
}

function pauseSongFunc() {
  if (audioElement.currentTime > 0 && !audioElement.paused) {
    audioElement.pause();
    masterPlay.style.display = "inline";
    masterPause.style.display = "none";
  }
}
//Handle play Pause
masterPlay.addEventListener("click", playSongFunc);

masterPause.addEventListener("click", pauseSongFunc);

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

let appendSongs = songs
  .map((s) => {
    return `<li>
    <div class="descSong">
    <img class="picSong" src="${s.coverPath}" alt="">
    <div class="">
        <h3>${s.songName}</h3>
        <p>hello worlds</p>
      </div>
    </div>
    <div class="songPlayButton">
      <img src="play.svg" alt="" class="invert playSong">
      <img src="pause.svg" alt="" class="invert sidePauseBtn"/>
    </div>
  </li>`;
  })
  .join("");

songsList.innerHTML = appendSongs;

let playButtons = document.querySelectorAll(".playSong");
let pauseButtons = document.querySelectorAll(".sidePauseBtn");

playButtons.forEach((playButton, index) => {//index  = 1,  2
  playButton.addEventListener("click", (e) => {
      // Hide play button and show pause button for the clicked song
      playButton.classList.add("hideSidePlayBtn");
      pauseButtons[index].classList.remove("sidePauseBtn");//2 pause btn  will be displayed 

      // Show play button for previously playing song (if any)
      playButtons.forEach((pb, i) => {  // i == 0
          if (i !== index) {// 0 !== 1 
              pb.classList.remove("hideSidePlayBtn");
              pauseButtons[i].classList.add("sidePauseBtn");
          }
      });

      // Additional actions (if needed)
      playSideSong(index); // Call play function
      masterPlay.style.display = "none";
      masterPause.style.display = "inline";
  });
});


pauseButtons.forEach((pauseButton, index) => {
  pauseButton.addEventListener("click", (e) => {
    // Hide pause button and show play button
    pauseButton.classList.add("sidePauseBtn");
    playButtons[index].classList.remove("hideSidePlayBtn");

    // Additional actions (if needed)
    pauseSideSong(); // Call pause function
    masterPlay.style.display = "inline";
    masterPause.style.display = "none";
  });
});
