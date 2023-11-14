const header = document.querySelector(".header");

let lastScroll = window.scrollY;

function showAndHideHeader() {
  let currentScroll = window.scrollY;

  if (lastScroll === 0 || lastScroll === currentScroll) {
    console.log("로드 or 새로고침");
    header.classList.remove("is-scrolled");
    lastScroll = currentScroll;
  } else if (currentScroll - lastScroll > 0) {
    console.log("내린다");
    header.classList.add("is-scrolled");
    lastScroll = currentScroll;
  } else if (currentScroll - lastScroll < 0) {
    console.log("올린다");
    header.classList.remove("is-scrolled");
    lastScroll = currentScroll;
  }
}

window.addEventListener("scroll", _.throttle(showAndHideHeader, 400));
