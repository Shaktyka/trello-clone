// Работа с заметками
const notes = document.querySelectorAll(`.note`);

const Note = {
    noteIdCounter: 8,
    draggedNote: null, // Перетаскиваемый элемент

    // Обработчик клика по заметкам
    process(note) {
        note.addEventListener(`dblclick`, (evt) => {
            note.setAttribute(`contenteditable`, `true`);
            note.removeAttribute(`draggable`);
            note.closest(`.column`).removeAttribute(`draggable`);
            note.focus();
        });

        // При потере фокуса
        note.addEventListener(`blur`, (evt) => {
            note.removeAttribute(`contenteditable`, `true`);
            note.setAttribute(`draggable`, true);
            note.closest(`.column`).setAttribute(`draggable`, true);

            if (note.textContent.trim().length === 0) {
                note.remove();
            }
        });

        // Навешиваем обработчики DND
        note.addEventListener(`dragstart`, Note.dragstart);

        note.addEventListener(`dragend`, Note.dragend);

        note.addEventListener(`dragover`, Note.dragover);

        note.addEventListener(`dragenter`, Note.dragenter);

        note.addEventListener(`dragleave`, Note.dragleave);

        note.addEventListener(`drop`, Note.drop);
    },

    // Обработчик `старт`
    dragstart(evt) {
        Note.draggedNote = this;
        this.classList.add(`dragged`);
        evt.stopPropagation();
    },

    // Обработчик `end`
    dragend(evt) {
        Note.draggedNote = null;
        this.classList.remove(`dragged`);

        document.querySelectorAll(`.note`)
            .forEach((note) => {
                note.classList.remove(`under`);
            });
    },

    // Обработчик `over`
    dragover(evt) {
        if (this === Note.draggedNote) {
            return;
        }
        evt.preventDefault();
    },

    // Обработчик `enter`
    dragenter(evt) {
        if (this === Note.draggedNote) {
            return;
        }
        this.classList.add(`under`);
    },

    // Обработчик `leave`
    dragleave(evt) {
        if (this === Note.draggedNote) {
            return;
        }
        this.classList.remove(`under`);
    },

    // Обработчик `drop`
    drop(evt) {
        evt.stopPropagation();
        if (this === Note.draggedNote) {
            return;
        }

        if (this.parentElement === Note.draggedNote.parentElement) {
            const allNotes = Array.from(this.parentElement.querySelectorAll(`.note`));
            const indexFirstEl = allNotes.indexOf(this);
            const indexSecondEl = allNotes.indexOf(Note.draggedNote);

            if (indexFirstEl < indexSecondEl) {
                this.parentElement.insertBefore(Note.draggedNote, this);
            } else {
                this.parentElement.insertBefore(Note.draggedNote, this.nextElementSibling);
            }

        } else {
            this.parentElement.insertBefore(Note.draggedNote, this);
        }
    }
};

// Добавляет обработчик dbl-клика заметкам
notes.forEach(Note.process);