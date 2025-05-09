let startTime, updatedTime, difference, interval;
let paused = true;
let laps = [];

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');
const aboutButton = document.getElementById('aboutBtn');
const aboutContent = document.getElementById('aboutContent');

function startTimer() {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTimer, 1000 / 60);
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(interval);
    }
}

function resetTimer() {
    clearInterval(interval);
    paused = true;
    difference = 0;
    timerDisplay.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    laps = [];
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let time = new Date(difference);
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();
    let milliseconds = Math.floor(time.getUTCMilliseconds() / 10);

    timerDisplay.innerHTML = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds) + ":" + 
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function recordLap() {
    if (!paused) {
        laps.push(timerDisplay.innerHTML);
        let lapItem = document.createElement("li");
        lapItem.textContent = "Tour " + laps.length + ": " + timerDisplay.innerHTML;
        lapsList.appendChild(lapItem);
    }
}

function toggleAbout() {
    if (aboutContent.style.display === "none") {
        aboutContent.style.display = "block";
    } else {
        aboutContent.style.display = "none";
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
aboutButton.addEventListener('click', toggleAbout);
