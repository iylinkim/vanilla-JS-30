const keyGroup = document.querySelectorAll(".key");

function removePlaying(e) {
    if(e.propertyName !== 'transform')return; //skip it it's not a transform
  e.currentTarget.classList.remove("playing");
}

function playSound(e) {
  const keyCode = e.keyCode;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio) return; //stop the function from running all together
  audio.currentTime = 0; //rewind to the start
  audio.play();

  key.classList.add("playing");
}

function init() {
  window.addEventListener("keyup", playSound);

  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => key.addEventListener("transitionend", removePlaying));
}

init();
