const mainSlide = document.querySelector(".main-slide-list");
const pagination = document.querySelectorAll(".main-slide span");
const slideItems = mainSlide.querySelectorAll(".slide-item");
let currentIndex = 1;
const MAX_LENGTH = 5;

// setInterval(() => {}, 300);

const startSlide = slideItems[0];
const endSlide = slideItems[MAX_LENGTH - 1];

console.log(startSlide);

// 엘리먼트 생성
const startElement = document.createElement(startSlide.tagName);
const endElement = document.createElement(endSlide.tagName);

console.log(startSlide.tagName);

// 엘리먼트에 클래스 적용 동일하게 하기
endSlide.classList.forEach((c) => endElement.classList.add(c));
endElement.innerHTML = endSlide.innerHTML;
startSlide.classList.forEach((c) => startElement.classList.add(c));
startElement.innerHTML = startSlide.innerHTML;

// 각 복제한 엘리먼트를 각 위치에 추가하기
slideItems[0].before(endElement);
slideItems[slideItems.length - 1].after(startElement);

function moveNext() {}

console.log(pagination);

// pagination[1].addEventListener("click", function () {
//   let mainSlideWidth = mainSlide.clientWidth;
//   console.log(mainSlideWidth);
//   slideItems[1].classList.add("is-active");
//   mainSlide.style.left = `-${mainSlideWidth}px`;
//   // mainSlide.style.opactiy = `0.5`;
//   // mainSlide.style.transition = `opactiy ease-in-out 300ms`;
// });
