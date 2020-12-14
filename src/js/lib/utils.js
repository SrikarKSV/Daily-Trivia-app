import categories from "../data/categories";
import {
  gameContainer,
  countDownContainer,
  menuContainer,
  spanCountDown,
  selectCategoryInput,
  circles,
  progressBar,
  gameWinContainer,
  inputChoicesEls,
  nextBtn,
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
  // Resetting all the sequence after menu is fully open
  menuContainer.addEventListener(
    "transitionend",
    () => {
      gameContainer.classList.remove("expand");
      gameWinContainer.classList.remove("active");
      nextBtn.innerHTML = "Next";
      circles.forEach((circle, index) => {
        if (index > 0) {
          circle.classList.remove("active");
        }
      });
      inputChoicesEls.forEach((inputChoicesEl) => {
        inputChoicesEl.checked = false;
      });
      progressBar.style.width = 0;
    },
    { once: true }
  );
}

export function startCountdown() {
  countDownContainer.classList.add("active");
  let count = 3;
  const countDownInterval = setInterval(() => {
    // Fading the countdown
    spanCountDown.classList.add("fade-out");
    spanCountDown.addEventListener(
      "transitionend",
      () => {
        spanCountDown.innerText = --count;
        spanCountDown.classList.remove("fade-out");
      },
      { once: true }
    );
    if (count < 2) {
      clearInterval(countDownInterval);
      // Resetting the countdown for restart
      spanCountDown.innerText = 3;
      spanCountDown.classList.remove("fade-out");
      countDownContainer.classList.remove("active");
    }
  }, 1000);
}

export function updateProgressBar(index) {
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
