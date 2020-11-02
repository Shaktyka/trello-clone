// Добавление заметки
let noteIdCounter = 8;
let draggedNote = null; // Перетаскиваемый элемент

// Все колонки
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
    note.setAttribute(`contenteditable`, true);
    note.focus();
};

// Для каждой колонки
const columnInit = (column) => {
    const addNoteBtn = column.querySelector(`[data-action-addNote]`);
    addNoteBtn.addEventListener(`click`, addNoteBtnClickHandler);

    const columnHeader = column.querySelector(`.column-header`);

    // Делаем заголовок колонки редактируемым
    columnHeader.addEventListener(`dblclick`, (evt) => {
        columnHeader.setAttribute(`contenteditable`, true);
        columnHeader.focus();
    });

    // При потере фокуса 
    columnHeader.addEventListener(`blur`, (evt) => {
        columnHeader.removeAttribute(`contenteditable`, `true`);
    });

    // Событие `over`
    column.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();
    });

    // Событие `drop`
    column.addEventListener(`drop`, (evt) => {
        if (draggedNote) {
            const notesBlock = column.querySelector(`[data-notes]`);
            return notesBlock.append(draggedNote);
        }
    });
};

columns.forEach(columnInit);