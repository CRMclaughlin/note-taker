import express from 'express';
import fs from 'fs';
import path from 'path';
import db from './db/db.json' assert { type: 'json' };
import uuid  from 'uuidv4';

const app = express();
const PORT = process.env.port || 3001;

app.use(express.static("public"));
app.use(express.json());


// function to create new note

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db.db.json'),
        JSON.stringify({ notesArray }, null, 2)
        );
        return body;
}


