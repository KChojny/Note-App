const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    id:
    {
        type: Number,
        unique: true,
        index: true,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;