const header = document.querySelector(".header");

function showHeader() {
  if (window.scrollY > 100) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", showHeader);
