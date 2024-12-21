let songIndex = 0;
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBXl_cplHvKffWc6KsJHqrRWiMQ8fFMql8pjy5k6xpXP4iQXg1qOK1UeDYVSPVRpAjhZ0ASErWGUVwYEp_192GwJtDmVEiFg6DesihkbuaN3_qfOjzg9kjXkOmifTtBFul8AHebxRYdLRC2yvH0joRWcE3aMgQhCbLgc2f_A7eYRW_vPkMcEARs8DipqeqwLZmZ5JEq38L6X9-64X5bM0mEnOFtdS1U16BIYeO1dyiF11CjtDTHGXpjwaR_KxtnDkxy8BXh0cvak1MyyoRCJZ0bW3y6dO7nksEO';

let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let masterPause = document.getElementById("masterPause");
let progressBar = document.getElementById("progressBar");
let songsList = document.getElementById("songsList");
let sidePauseBtn = document.getElementsByClassName("sidePauseBtn");
//left bar btns
let playButtons = document.querySelectorAll(".playSong");
let pauseButtons = document.querySelectorAll(".sidePauseBtn");
var rightPlayButtons = [];
var rightPauseButtons = [];


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

//playing from master btn
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


playButtons.forEach((playButton, index) => {
  //index  = 1,  2
  playButton.addEventListener("click", (e) => {
    // Hide play button and show pause button for the clicked song
    playButton.classList.add("hideSidePlayBtn");
    pauseButtons[index].classList.remove("sidePauseBtn"); //2 pause btn  will be displayed

    // Show play button for previously playing song (if any)
    playButtons.forEach((pb, i) => {
      // i == 0
      if (i !== index) {
        // 0 !== 1
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

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}


// Function to play the song
function playSong(url) {
  if (!url) {
    alert('No preview available for this track');
    return;
  }

  const audio = new Audio(url);  // Create a new audio element
  audio.play();  // Play the track
  
  // Optionally, you can add controls and events for the audio
  audio.addEventListener('ended', () => {
    console.log('Song has finished playing');
  });

  // Optional: Update UI or show a message when playing
  console.log('Playing song:', url);
}



async function getTopTracks() {
  // Fetching the top tracks from the Spotify Web API
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=20", "GET")
  ).items;
}

async function displayTopTracks() {
  const topTracks = await getTopTracks(); // Fetch the top tracks
  console.log(topTracks);

  // Get the container where cards will be added (assuming a container exists)
  const container = document.querySelector(".playLists__main"); // Replace with your actual container selector

  // Ensure there's a valid container
  if (container && topTracks?.length > 0) {
    // Loop through the tracks and create a new card for each
    for (let i = 0; i < topTracks.length; i++) {
      const track = topTracks[i]; // Get the current track
      const { name, artists, album } = track; // Destructure necessary details

      const trackDescription = `${name} by ${artists
        .map((artist) => artist.name)
        .join(", ")}`;

      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("playLists__card");

      // Add content to the card
      card.innerHTML = `
       <svg
                  class="playButton"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill="#1ed760"
                    rx="17"
                    ry="17"
                  />
                  <g transform="translate(5, 5)">
                    <!-- Apply 5px padding -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                        fill="black"
                        stroke="black"
                        stroke-width="1.0"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </g>
                </svg>
       
          ${
            album && album.images[0]
              ? `<img src="${album.images[0].url}" alt="${name}" class="playList__thumbnail">`
              : ""
          }
       
        <div class="desc">
          <h4>${name}</h4>
          <p>${trackDescription.substring(0,30)}</p>
        </div>
      `;

      // Append the new card to the container
      container.appendChild(card);
      const playButton = card.querySelector('.playButton');
      playButton.addEventListener('click', () => playSong(preview_url));


    }
  }
}

// Call the displayTopTracks function to populate the cards
displayTopTracks();



//right side btns
// setTimeout(()=> {
//   rightPlayButtons= document.querySelectorAll(".playButton");
//   rightPauseButtons = document.querySelectorAll(".sidePauseBtn");
//   console.log("playButtonClicked", rightPlayButtons)
  
// }, 2000)



// rightPlayButtons.forEach((playButton, index) => {
  
//   console.log("playButtonClicked", rightPlayButtons)
//   //index  = 1,  2
//   playButton.addEventListener("click", (e) => {
//     // Hide play button and show pause button for the clicked song
//     playButton.classList.add("hideSidePlayBtn");
//     pauseButtons[index].classList.remove("sidePauseBtn"); //2 pause btn  will be displayed

//     // Show play button for previously playing song (if any)
//     playButtons.forEach((pb, i) => {
//       // i == 0
//       if (i !== index) {
//         // 0 !== 1
//         pb.classList.remove("hideSidePlayBtn");
//         pauseButtons[i].classList.add("sidePauseBtn");
//       }
//     });

//     // Additional actions (if needed)
//     playSideSong(index); // Call play function
//     masterPlay.style.display = "none";
//     masterPause.style.display = "inline";
//   });
// });