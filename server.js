import express from 'express';
import fs from 'fs';
import path from 'path';
import db from './db/db.json' assert { type: 'json' };
import { v4 as uuidv4 } from 'uuid';
import url from 'url'

// Output path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());


// API Routes

// Get api/notes will read the db.json and return all saved notes as json

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        
        //Returns new database
        res.json(dbData)
    });   
})

// Post /api/notes will recieve a new note to save on the request body, add it to db.json, and return new note to the client

app.post('/api/notes', (req, res) => {
    // Grabs notes from the body
    const newNote = req.body;

    // Adds a unique id to each note
    newNote.id = uuidv4()

    // Pushes the note into array
    db.push(newNote)

    // Updates the json file with new object
    fs.writeFileSync('./db/db.json', JSON.stringify(db))

    // Responds with the note object
    res.json(db)
})

// Delete note

app.delete('/api/notes/:id', (req, res) => {
    const deleteNote = db.filter((note) =>
    note.id !== req.params.id)

    // Updates the json file to show modified array
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote))

    res.json(deleteNote)

    
})



// HTML Routes
// need to change this to *, but index.js needs to be modified?
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.listen(PORT , () => {
    console.log(`API server listening on ${PORT}`)
})