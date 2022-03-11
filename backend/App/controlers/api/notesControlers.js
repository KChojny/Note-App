const Note = require('../../db/models/note');


class NoteControlers {

    //read all notes
    async getAllNotes(req, res){ 
        const doc = await Note.find({});

        res.status(200).json(doc);
    }

    //read the note
    async getNote(req, res){ 
        const id = req.params.id;
        const note = await Note.findOne({id: id});

        res.status(200).json(note);
    }

    //save note
    async saveNote(req, res){ 
        const id = (await Note.find({})).length;
        const title = req.body.title;
        const body = req.body.body;
        let note;
        try{
            note = new Note({id, title, body});
            await note.save().then();
        }catch(err){
            return res.status(422).json({message: err.message});
        }
        res.status(201).json(note);
    }

    //edit note
    async updateNote(req, res){ 
        const id = req.params.id;
        const title = req.body.title;
        const body = req.body.body;
        const note = await Note.findOne({id: id});
        note.title = title;
        note.body = body;
        await note.save();
        res.status(201).json(note);
    }

    //delete note
    async deleteNote(req, res){ 
        const id = req.params.id;
        await Note.deleteOne({id:id})
        res.sendStatus(204);
    }

    //synchronize indexes
    async syncId(req,res){
        const len = (await Note.find({})).length;
        const doc = await Note.find({});
        for(var i = 0;i < len; i++){
            const note = doc[i];
            if(i != note.id){
                note.id = i;
            } 
            await note.save().then();
        }
        res.sendStatus(204);
    }
}

module.exports = new NoteControlers();