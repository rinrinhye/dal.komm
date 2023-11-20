const slide = document.querySelector(".new-items-slide-list");
const slideItems = document.querySelectorAll(".new-items-slide-item");

const defaultStartSlideItem = slideItems[3];
const defaultLastSlideItem = slideItems[8];

const nextButton = document.querySelector(".nav-wrapper .next");
const prevButton = document.querySelector(".nav-wrapper .prev");

let currentSlideItem = defaultStartSlideItem;

const MARGIN_RIGHT = 70;
const MAX_LENGTH = 6;

let windowInnerWidth = window.innerWidth;
let slideWidth = slide.clientWidth;
let currentSlideItemWidth = slideItems[0].clientWidth + MARGIN_RIGHT;

let offset = windowInnerWidth - slideWidth;
let currentIndex = 1;

function setSlidePosition() {
  // 남는 여백 공간 값
  // = windowInnerWidth - slideWidth
  windowInnerWidth = this.window.innerWidth;
  slideWidth = slide.clientWidth;

  offset = windowInnerWidth - slideWidth;

  // 각 슬라이드 아이템의 넓이 지정해주기
  slideItems.forEach((item) => {
    item.style.setProperty(
      "width",
      `${windowInnerWidth / MAX_LENGTH - MARGIN_RIGHT}px`
    );
  });

  // 슬라이드가 이동될 때 필요한 슬라이드 아이템의 넓이 구하기
  // margin 까지 포함해서 이동해야 하기 때문에 margin 값도 더해준다
  currentSlideItemWidth = slideItems[0].clientWidth + MARGIN_RIGHT;
  slide.style.setProperty("transition", "0ms");

  if (currentIndex === 1) {
    // 남는 여백 공간 값 만큼 translate 를 해준다
    // 그리고 transition 타이밍을 0 으로 해준다

    slide.style.setProperty("transform", `translate3d(-${offset}px,0,0)`);
  } else {
    slide.style.setProperty(
      "transform",
      `translate3d(-${
        offset + currentSlideItemWidth * (currentIndex - 1)
      }px,0,0)`
    );
  }
}

function moveNext() {
  let nextSlideItem = currentSlideItem.nextElementSibling;
  currentIndex++;
  if (currentIndex <= MAX_LENGTH) {
    currentSlideItem.classList.remove("is-active");
    nextSlideItem.classList.add("is-active");
    currentSlideItem = nextSlideItem;

    slide.style.setProperty(
      "transform",
      `translate3d(-${
        offset + currentSlideItemWidth * (currentIndex - 1)
      }px,0,0)`
    );
    slide.style.setProperty("transition", "300ms");
  } else {
    //currentIndex 가 7일 때
    currentIndex = 1;

    currentSlideItem.classList.remove("is-active");
    currentSlideItem = defaultStartSlideItem;
    currentSlideItem.classList.add("is-active");

    slide.style.setProperty("transition", "0ms");
    slide.style.setProperty(
      "transform",
      `translate3d(-${offset - currentSlideItemWidth}px,0,0)`
    );
    setTimeout(() => {
      slide.style.setProperty("transform", `translate3d(-${offset}px,0,0)`);
      slide.style.setProperty("transition", "300ms");
    }, 0);
  }
}

function movePrev() {
  let prevSlideItem = currentSlideItem.previousElementSibling;

  currentIndex--;
  if (currentIndex >= 1) {
    prevSlideItem.classList.add("is-active");
    currentSlideItem.classList.remove("is-active");
    currentSlideItem = prevSlideItem;

    slide.style.setProperty(
      "transform",
      `translate3d(-${
        windowInnerWidth -
        slideWidth +
        currentSlideItemWidth * (currentIndex - 1)
      }px,0,0)`
    );
    slide.style.setProperty("transition", "300ms");
  } else {
    //currentIndex가 0일 때
    currentIndex = 7;

    currentSlideItem.classList.remove("is-active");
    currentSlideItem = slideItems[9];
    currentSlideItem.classList.add("is-active");
    prevSlideItem = defaultLastSlideItem;
    prevSlideItem.classList.add("is-active");
    currentSlideItem = prevSlideItem;

    slide.style.setProperty("transition", "0ms");
    slide.style.setProperty(
      "transform",
      `translate3d(-${
        offset + currentSlideItemWidth * (currentIndex - 1)
      }px,0,0)`
    );

    currentIndex--;

    setTimeout(() => {
      slide.style.setProperty(
        "transform",
        `translate3d(-${
          offset + currentSlideItemWidth * (currentIndex - 1)
        }px,0,0)`
      );
      slide.style.setProperty("transition", "300ms");
    }, 0);
  }
}

nextButton.addEventListener("click", moveNext);
prevButton.addEventListener("click", movePrev);
window.addEventListener("load", setSlidePosition);
window.addEventListener("resize", setSlidePosition);
