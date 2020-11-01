// Работа с заметками
const notes = document.querySelectorAll(`.note`);
let draggedNote = null;


// Обработчик `старт`
function dragstartNoteHandler(evt) {
    draggedNote = this;
    this.classList.add(`dragged`);
    evt.stopPropagation();
};

// Обработчик `end`
function dragendNoteHandler(evt) {
    draggedNote = null;
    this.classList.remove(`dragged`);

    document.querySelectorAll(`.note`)
        .forEach((note) => {
            note.classList.remove(`under`);
        });
};

// Обработчик `over`
function dragoverNoteHandler(evt) {
    if (this === draggedNote) {
        return;
    }
    evt.preventDefault();
};

// Обработчик `enter`
function dragenterNoteHandler(evt) {
    if (this === draggedNote) {
        return;
    }
    this.classList.add(`under`);
};

// Обработчик `leave`
function dragleaveNoteHandler(evt) {
    if (this === draggedNote) {
        return;
    }
    this.classList.remove(`under`);
};

// Обработчик `drop`
function dropNoteHandler(evt) {
    if (this === draggedNote) {
        return;
    }
    // console.log(1);

    if (this.parentElement === draggedNote.parentElement) {
        const allNotes = Array.from(this.parentElement.querySelectorAll(`.note`));
        const indexFirstEl = allNotes.indexOf(this);
        const indexSecondEl = allNotes.indexOf(draggedNote);

        if (indexFirstEl < indexSecondEl) {
            this.parentElement.insertBefore(draggedNote, this);
        } else {
            this.parentElement.insertBefore(draggedNote, this.nextElementSibling);
        }

    } else {
        this.parentElement.insertBefore(draggedNote, this);
    }
};

// ============================
// Обработчик клика по заметкам
const noteProcess = (note) => {
    note.addEventListener(`dblclick`, (evt) => {
        note.setAttribute(`contenteditable`, `true`);
        note.focus();
    });

    // При потере фокуса
    note.addEventListener(`blur`, (evt) => {
        note.removeAttribute(`contenteditable`, `true`);
    });

    // Навешиваем обработчики DND
    note.addEventListener(`dragstart`, dragstartNoteHandler);

    note.addEventListener(`dragend`, dragendNoteHandler);

    note.addEventListener(`dragover`, dragoverNoteHandler);

    note.addEventListener(`dragenter`, dragenterNoteHandler);

    note.addEventListener(`dragleave`, dragleaveNoteHandler);

    note.addEventListener(`drop`, dropNoteHandler);

};

// Добавляет обработчик dbl-клика заметкам
notes.forEach(noteProcess);