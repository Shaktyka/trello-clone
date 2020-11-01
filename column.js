// Добавление колонки
let columnIdCounter = 4;
const allColumns = document.querySelector(`.columns`);
const addColumnBtn = document.querySelector(`[data-action-addcolumn]`);

const createColumn = () => {
    const section = document.createElement(`section`);
    section.classList.add(`column`);
    section.setAttribute(`draggable`, `true`);
    section.setAttribute(`data-column-id`, columnIdCounter);

    section.innerHTML = `<h2 class="column-header" contenteditable="true">В плане</h2>
      <div data-notes></div>
      <p class="column-footer">
          <button data-action-addNote class="action">
          + Добавить карточку
        </button>
      </p>`;

    return section;
};

// Обработчик нажатия на кнопку добавления колонки
addColumnBtn.addEventListener(`click`, (evt) => {
    const column = createColumn();
    columnIdCounter++;
    columnInit(column);
    allColumns.appendChild(column);
});