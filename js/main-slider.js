const mainSlide = document.querySelector(".main-slide-list");
const pagination = document.querySelectorAll(".main-slide span");
const slideItems = mainSlide.querySelectorAll(".slide-item");
let currentIndex = 1;
const MAX_LENGTH = slideItems.length;

const startSlideItem = slideItems[0];
const endSlideItem = slideItems[MAX_LENGTH - 1];

let currentSlideItem = startSlideItem;
let slideWidth = window.innerWidth;
let offset = slideWidth * currentIndex;
let currentButton = pagination[0];

// 엘리먼트 생성
const startElement = document.createElement(startSlideItem.tagName);
const endElement = document.createElement(endSlideItem.tagName);

// 엘리먼트에 클래스 적용 동일하게 하기
endSlideItem.classList.forEach((c) => endElement.classList.add(c));
endElement.innerHTML = endSlideItem.innerHTML;
startSlideItem.classList.forEach((c) => {
  startElement.classList.add(c);
});
startElement.innerHTML = startSlideItem.innerHTML;

// 각 복제한 엘리먼트를 각 위치에 추가하기
slideItems[0].before(endElement);
slideItems[slideItems.length - 1].after(startElement);

slideItems[0].classList.add("is-active");
endElement.classList.add("is-active");
currentButton.classList.add("is-active");

function moveNext() {
  let nextSlideItem = currentSlideItem.nextElementSibling;
  let nextButton;
  currentIndex++;
  if (currentIndex <= MAX_LENGTH) {
    offset = slideWidth * currentIndex;
    mainSlide.style.setProperty("left", `-${offset}px`);
    currentSlideItem.classList.remove("is-active");
    nextSlideItem.classList.add("is-active");
    currentSlideItem = nextSlideItem;

    currentButton.classList.remove("is-active");
    nextButton = pagination[currentIndex - 1];
    nextButton.classList.add("is-active");
    currentButton = nextButton;
  } else {
    currentIndex = 0;

    endElement.classList.remove("is-active");
    currentSlideItem.classList.remove("is-active");
    currentSlideItem = startSlideItem;
    currentButton.classList.remove("is-active");
    currentButton = pagination[0];
    currentButton.classList.add("is-active");
    currentSlideItem.classList.add("is-active");
    mainSlide.style.setProperty("transition", "0ms");
    mainSlide.style.setProperty("left", `-${slideWidth * currentIndex}px`);

    currentIndex++;

    setTimeout(() => {
      mainSlide.style.setProperty("transition", `300ms`);
      mainSlide.style.setProperty("left", `-${slideWidth * currentIndex}px`);
    }, 0);

    setTimeout(() => {
      endElement.classList.add("is-active");
    }, 200);
  }
}

setInterval(() => {
  moveNext();
}, 3000);

pagination.forEach((icon, index) => {
  icon.addEventListener("click", function () {
    let nextButton;
    currentButton.classList.remove("is-active");
    nextButton = pagination[index];
    nextButton.classList.add("is-active");
    currentButton = nextButton;

    currentSlideItem.classList.remove("is-active");
    slideItems[index].classList.add("is-active");
    currentSlideItem = slideItems[index];
    mainSlide.style.left = `-${slideWidth * (index + 1)}px`;
    mainSlide.style.transition = `opactiy ease-in-out 300ms`;

    currentIndex = index + 1;
  });
});

function setSlidePosition() {
  slideWidth = window.innerWidth;
  offset = slideWidth * currentIndex;
  mainSlide.style.setProperty("left", `-${offset}px`);
}

window.addEventListener("load", setSlidePosition);
window.addEventListener("resize", setSlidePosition);
