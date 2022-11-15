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

// API Routes

// Get api/notes will read the db.json and return all saved notes as json

app.get('/api.notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbData = JSON.parse(data);
        console.table(dbData)
        res.json(dbData)
    });
})

// Post /api/notes will recieve a new note to save on the request body, add it to db.json, and return new note to the client

app.post('/api.notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid()
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json
})

// Delete note

app.delete('/api/notes/:id', (req, res) => {
    const deleteDb = db.filter((note) =>
    note.id !== req.params.id)

    fs.writeFileSync('./db/db.json', JSON.stringify(deleteDb))

    res.json(deleteDb)

    res.redirect('api/notes')
})

// HTML routes

// HTML Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.listen(PORT , () => {
    console.log(`API server listening on ${PORT}`)
})