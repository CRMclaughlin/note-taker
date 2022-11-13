// import nodes 

import fs from 'fs';
import path from 'path';

// Function to create new note

function createNewNote (body, notesArray) {
    const note =  body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notesArray}, null, 2)
    );
    return note;
}