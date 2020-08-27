const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const $body = $('body');
const $player = $('.player');
const $playerBtn = $('.player__btn');
const $video = $('.viewer');
const $progress = $('.progress');
const $progressBar = $('.progress__filled');

const $toggle = $('.toggle');
const $skipButtons = $$('[data-skip]');
const $ranges = $$('.player__slider');

const togglePlay = () => {
  $playerBtn.classList.toggle('player--isPaused');
  $video.paused ? $video.play() : $video.pause();
};

const updateIcon = () =>
  $video.paused ? ($toggle.textContent = '►') : ($toggle.textContent = '❚ ❚');

function skip() {
  $video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  $video[this.name] = this.value;
  console.log(this.value);
}

function handleProgress() {
  const percent = ($video.currentTime / $video.duration) * 100;
  $progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / $progress.offsetWidth) * $video.duration;
  $video.currentTime = scrubTime;
}

// Hook up the event listeners
let mousedown = false;
$progress.onmousedown = () => (mousedown = true);
$progress.onmouseup = () => (mousedown = false);

$video.onclick = togglePlay;
$toggle.onclick = togglePlay;
$video.onplay = updateIcon;
$video.onpause = updateIcon;
$video.ontimeupdate = handleProgress;
$playerBtn.onclick = togglePlay;
$progress.onclick = scrub;
$progress.onmousemove = (e) => mousedown && scrub(e);

$skipButtons.forEach((button) => (button.onclick = skip));
$ranges.forEach((range) => (range.oninput = handleRangeUpdate));

// PREVENT MOBILE SCROLLING;
window.onload = () => $video.currentTime = 1.5;
