const yargs = require('yargs');
const notesUtilities = require('./notes.js');


// add command
yargs.command({
    command: 'add',
    describe: 'Description : Add a new note.',
    builder: {
        title: {
            describe: 'Title of the note to be added',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note to be added',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notesUtilities.addNote(argv.title, argv.body);
    }
})

// remove command
yargs.command({
    command: 'remove',
    describe: 'Description : Remove a saved note.',
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notesUtilities.removeNote(argv.title);
    }
})

// list command
yargs.command({
    command: 'list',
    describe: 'Description : List all of your note titles.',
    handler: function () {
       notesUtilities.listNotes();
    }
})

// read command
yargs.command({
    command: 'read',
    describe: 'Description : Read a specific note.',
    builder: {
        title: {
            describe: 'Title of the note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notesUtilities.readNotes(argv.title);
    }
})

// add, remove, read, list notes
yargs.parse();