// Работа с заметками
const notes = document.querySelectorAll(`.note`);

// Обработчик клика по заметкам
const noteProcess = (note) => {
    note.addEventListener(`dblclick`, (evt) => {
        note.setAttribute(`contenteditable`, `true`);
        note.focus();
    });

    note.addEventListener(`blur`, (evt) => {
        note.removeAttribute(`contenteditable`, `true`);
    });

};

// Добавляет обработчик dbl-клика заметкам
notes.forEach(noteProcess);