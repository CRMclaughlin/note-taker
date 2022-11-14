const router = require('express').Router();
import db from '../db/db.json';

router.get('/notes', (req, res) => {
    db.getNote().then((note) => {
        return res.json(note)
    }).catch((err) => res.status(500).json(err))
});

router.post('/notes', (req, res) => {
    db.addNote(req.body).then((note) => res.join(note))
    .catch((err) => res.status(500).json(err));
})

router.delete('/notes/:id', (req, res) => {
    db.removeNote(req.params.id).then(() => res.json ({ ok: true }))
    .catch((err) => res.status(500).json(err))
})

export default apiRoute