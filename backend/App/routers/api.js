const express = require('express');
const notesControlers = require('../controlers/api/notesControlers');
const router = express.Router();

const notesControler = require('../controlers/api/notesControlers');

//read all notes
router.get('/notes', notesControler.getAllNotes)
//read the note
router.get('/notes/:id', notesControler.getNote)
//save note
router.post('/notes', notesControler.saveNote)
//edit note
router.put('/notes/:id', notesControler.updateNote)
//delete note
router.delete('/notes/:id', notesControler.deleteNote)
//synchronize indexes
router.get('/sync', notesControlers.syncId)

module.exports = router