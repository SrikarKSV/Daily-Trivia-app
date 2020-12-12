import categories from "../data/categories";

const selectCategoryInput = document.querySelector("#category");

export function renderCategories() {
  const optionsHTML = categories.map(
    (categories) =>
      `<option value="${categories.id}">${categories.name}</option>`
  );
  selectCategoryInput.insertAdjacentHTML("beforeend", optionsHTML);
}
