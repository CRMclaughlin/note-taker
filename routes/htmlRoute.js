import path from 'path';
const router = require('express').Router();


router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..public.html"))
});

export default htmlRoute;