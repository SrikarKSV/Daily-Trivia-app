import { renderCategories, restartGame } from "./lib/utils";
import { handleMenuSubmit } from "./triviaMenu";

const gameMenuForm = document.querySelector(".setup__form");
const restartBtns = document.querySelectorAll(".restart-btn");

gameMenuForm.addEventListener("submit", handleMenuSubmit);
restartBtns.forEach((restartBtn) => {
  restartBtn.addEventListener("click", restartGame);
});

renderCategories();
