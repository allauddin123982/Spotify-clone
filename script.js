let songIndex = 0;

let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let masterPause = document.getElementById("masterPause");
let progressBar = document.getElementById("progressBar");
let songsList = document.getElementById("songsList");

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

//Handle play Pause
masterPlay.addEventListener("click", () => {
  if (audioElement.pause || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.add("playBtn");
    masterPause.style.display = "block";
  }
});
masterPause.addEventListener("click", () => {
  if (audioElement.play || audioElement.currentTime > 0) {
    audioElement.pause();
    masterPause.style.display = "none";
    masterPlay.classList.remove("playBtn");
  }
});

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
    </div>
  </li>`;
  })
  .join("");

songsList.innerHTML = appendSongs;

let sidePauseBtn = document.getElementsByClassName('PauseBtn');

Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        e.target.classList.add("playBtn");
        masterPause.classList.add("showBtn")
    });
});

