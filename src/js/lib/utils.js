import categories from "../data/categories";
import {
  gameContainer,
  countDownContainer,
  menuContainer,
  spanCountDown,
  selectCategoryInput,
  circles,
  progressBar,
} from "./elements";

export function renderCategories() {
  const optionsHTML = categories.map(
    (categories) =>
      `<option value="${categories.id}">${categories.name}</option>`
  );
  selectCategoryInput.insertAdjacentHTML("beforeend", optionsHTML);
}

export function restartGame() {
  menuContainer.classList.toggle("not-active");
  setTimeout(() => {
    gameContainer.classList.remove("expand");
  }, 500);
}

export function startCountdown() {
  countDownContainer.classList.add("active");
  let count = 3;
  const countDownInterval = setInterval(() => {
    // Fading the countdown
    spanCountDown.classList.add("go-up");
    spanCountDown.addEventListener(
      "transitionend",
      () => {
        spanCountDown.innerText = --count;
        spanCountDown.classList.remove("go-up");
      },
      { once: true }
    );
    if (count < 2) {
      clearInterval(countDownInterval);
      // Resetting the countdown for restart
      spanCountDown.innerText = 3;
      spanCountDown.classList.remove("go-up");
      countDownContainer.classList.remove("active");
    }
  }, 1000);
}

export function updateProgressBar() {
  circles.forEach((circle, idx) => {
    if (idx <= index) {
      circle.classList.add("active");
    }
  });
  const actives = document.querySelectorAll(".active");
  progressBar.style.width = `${
    ((actives.length - 1) / (circles.length - 1)) * 100
  }%`;
}
