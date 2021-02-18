const fs = require('fs');
const chalk = require('chalk');

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find(function (note) {
        return note.title === title;
    })

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        console.log(chalk.green('New note added.'));
    } else {
        console.log(chalk.red('Note title already in use.'));
    }
}

const removeNote = function (title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    })

    if (notesToKeep.length !== notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green('Note removed.'));
    } else {
        console.log(chalk.red('No note found with the given title.'));
    }
}

const listNotes = function () {
    const notes = loadNotes();

    if (notes.length == 0) {
        console.log(chalk.red("No notes found."));
    }
    else {
        console.log(chalk.green('Your notes : '));

        notes.forEach(function (note) {
            console.log(note.title);
        })
    }
}

const readNotes = function (title) {
    const notes = loadNotes();
    const note = notes.find(function (note) {
        return note.title === title;
    })

    if (note) {
        console.log("Title : " + chalk.green(note.title));
        console.log("Body : " + note.body);
    } else {
        console.log(chalk.red('No note found with the given title.'));
    }

}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}