import express from 'express';
import fs from 'fs';
import path from 'path';
import db from './db/db.json';
import uuid  from 'uuidv4';

const app = express();
const PORT = process.env.port || 3000;

app.use(express.static("public"));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`listening on http:localhost:${PORT}`)
})

