const noticeSection = document.querySelector(".notice");
const noticeContent = document.querySelector(".notice-content");
function showNoticeContent() {
  // console.log(window.innerHeight - noticeSection.getBoundingClientRect().y);
  if (240 <= window.innerHeight - noticeSection.getBoundingClientRect().y) {
    noticeContent.classList.add("fade-down");
  } else {
    noticeContent.classList.remove("fade-down");
  }
}

window.addEventListener("scroll", showNoticeContent);
