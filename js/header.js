const header = document.querySelector(".header");

let lastScroll = window.scrollY;

function showAndHideHeader() {
  let currentScroll = window.scrollY;

  if (lastScroll === 0 || lastScroll === currentScroll) {
    header.classList.remove("is-scrolled");
    lastScroll = currentScroll;
  } else if (currentScroll - lastScroll > 0) {
    header.classList.add("is-scrolled");
    lastScroll = currentScroll;
  } else if (currentScroll - lastScroll < 0) {
    header.classList.remove("is-scrolled");
    lastScroll = currentScroll;
  }
}

window.addEventListener("scroll", _.throttle(showAndHideHeader, 400));
