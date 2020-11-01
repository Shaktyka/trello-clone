// Добавление заметки
let noteIdCounter = 8;

const columns = document.querySelectorAll(`.column`);

// Создаёт заметку
const createNote = () => {
    const noteEl = document.createElement(`div`);
    noteEl.classList.add(`note`);
    noteEl.setAttribute(`draggable`, `true`);
    noteEl.setAttribute(`data-note-id`, noteIdCounter);
    noteIdCounter++;
    return noteEl;
};

// Обработчик клика по кнопке "Добавить заметку"
const addNoteBtnClickHandler = (evt) => {
    const target = evt.target;
    const column = target.closest(`.column`);
    const notesBlock = column.querySelector(`[data-notes]`);
    const note = createNote();
    noteProcess(note);
    notesBlock.appendChild(note);
};

// Для каждой колонки
const columnInit = (column) => {
    const addNoteBtn = column.querySelector(`[data-action-addNote]`);
    addNoteBtn.addEventListener(`click`, addNoteBtnClickHandler);
};

columns.forEach(columnInit);