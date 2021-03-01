const sliderImages = document.querySelectorAll(".slide-in");

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function handleSlides(e) {
  sliderImages.forEach((sliderImage) => {
    const slideAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const halfShown = slideAt > sliderImage.offsetTop;
    const notScrolledPast = window.scrollY < imageBottom;
    console.log(notScrolledPast);
    if (halfShown && notScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

function init() {
  window.addEventListener("scroll", debounce(handleSlides));
}

init();
