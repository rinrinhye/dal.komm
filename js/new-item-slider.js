const slideWrapper = document.querySelector(".new-items-wrapper");
const slide = document.querySelector(".new-items-slide-list");
const slideItems = document.querySelectorAll(".new-items-slide-item");
const defaultStartSlideItem = document.querySelector(
  ".new-items-slide-item.is-active"
);
const defaultLastSlideItem = slideItems[8];

const nextButton = document.querySelector(".nav-wrapper .next");
const prevButton = document.querySelector(".nav-wrapper .prev");

let currentSlideItem = document.querySelector(
  ".new-items-slide-item.is-active"
);

const MARGIN_RIGHT = 70;
const MAX_LENGTH = 6;

let windowInnerWidth;
let slideWidth;

let currentSlideItemWidth;

let currentIndex = 1;

function getDefaultSlidePosition() {}

function setSlidePosition() {
  if (currentIndex === 1) {
    // 남는 여백 공간 값
    // = windowInnerWidth - slideWidth

    windowInnerWidth = this.window.innerWidth;
    slideWidth = slide.clientWidth;

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

    // 남는 여백 공간 값 만큼 translate 를 해준다
    // 그리고 transition 타이밍을 0 으로 해준다
    slide.style.setProperty("transition", "0ms");
    slide.style.setProperty(
      "transform",
      `translate3d(-${windowInnerWidth - slideWidth}px,0,0)`
    );
  } else {
    windowInnerWidth = this.window.innerWidth;
    slideWidth = slide.clientWidth;
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
    slide.style.setProperty(
      "transform",
      `translate3d(-${
        windowInnerWidth -
        slideWidth +
        currentSlideItemWidth * (currentIndex - 1)
      }px,0,0)`
    );
  }
}

function moveNext() {
  let nextSlideItem;

  if (currentIndex <= MAX_LENGTH) {
    /* 처음 인덱스 1 에서
     마지막 슬라이드 아이템인 인덱스 6까지의 경우
  */
    nextSlideItem = currentSlideItem.nextElementSibling;

    currentSlideItem.classList.remove("is-active");
    nextSlideItem.classList.add("is-active");
    currentSlideItem = nextSlideItem;

    slide.style.setProperty(
      "transform",
      `translate3d(-${
        windowInnerWidth - slideWidth + currentSlideItemWidth * currentIndex
      }px,0,0)`
    );
    slide.style.setProperty("transition", "300ms");

    currentIndex++;
  } else {
    currentIndex = 2;
    /* 
    마지막으로 보여져야 할 슬라이드 아이템에서 
    다시 처음 아이템으로 이동하는 경우

    - 바로 첫 슬라이드 아이템이 보여지는 위치로 이동하는 것이 아닌
      7번째(첫 슬라이드 아이템 그림)로 간 후 
      transform 으로 처음 위치로 이동하면서 
      transition-duration을 0으로 해 이동하는 게 보여지지 않게 한다
  */
    currentSlideItem.classList.remove("is-active");
    currentSlideItem = defaultStartSlideItem;

    nextSlide = currentSlideItem.nextElementSibling;
    currentSlideItem.classList.remove("is-active");
    nextSlide.classList.add("is-active");

    currentSlideItem = nextSlide;

    slide.style.setProperty("transition", "0ms");
    slide.style.setProperty(
      "transform",
      `translate3d(-${windowInnerWidth - slideWidth}px,0,0)`
    );

    setTimeout(() => {
      slide.style.setProperty(
        "transform",
        `translate3d(-${
          windowInnerWidth - slideWidth + currentSlideItemWidth
        }px,0,0)`
      );
      slide.style.setProperty("transition", "300ms");
    }, 0);
  }
}

function movePrev() {
  let prevSlideItem;
  if (currentIndex >= 1) {
    prevSlideItem = currentSlideItem.previousElementSibling;
    prevSlideItem.classList.add("is-active");
    currentSlideItem.classList.remove("is-active");
    currentSlideItem = prevSlideItem;

    slide.style.setProperty(
      "transform",
      `translate3d(-${
        windowInnerWidth -
        slideWidth +
        currentSlideItemWidth * (currentIndex - 2)
      }px,0,0)`
    );
    slide.style.setProperty("transition", "300ms");

    currentIndex--;
  } else {
    currentIndex = 5;

    currentSlideItem.classList.remove("is-active");
    defaultLastSlideItem.classList.add("is-active");
    currentSlideItem = defaultLastSlideItem;
    prevSlideItem = currentSlideItem.previousElementSibling;

    currentSlideItem.classList.remove("is-active");
    prevSlideItem.classList.add("is-active");
    currentSlideItem = prevSlideItem;

    slide.style.setProperty("transition", "0ms");
    slide.style.setProperty(
      "transform",
      `translate3d(-${
        windowInnerWidth - slideWidth + currentSlideItemWidth * currentIndex
      }px,0,0)`
    );

    setTimeout(() => {
      slide.style.setProperty(
        "transform",
        `translate3d(-${
          windowInnerWidth -
          slideWidth +
          currentSlideItemWidth * (currentIndex - 1)
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
