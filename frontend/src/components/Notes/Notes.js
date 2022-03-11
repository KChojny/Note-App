import React, {Component} from "react";
import Modal from 'react-modal';
import axios from '../../axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Notes.css';
import Note from './Note/Note'
import NewNote from "./NewEdit/NewNote";
import EditNote from "./EditNote/EditNote";


class Notes extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes : [],
            showEditModal: false,
            editNote : {},
        };
    }


    componentDidMount(){
        this.fetchNotes();
    }
    
    //fetching notes from db
    async fetchNotes(){
        const res = await axios.get('/notes');
        const notes = res.data;
        this.setState({notes});
    }

    //delete note
    async deleteNote(id){
        const notes = [...this.state.notes].filter(note => note.id !== id);
        await axios.delete('/notes/' + id);
        await axios.get('/sync');
        this.setState({notes});
    }

    //add note
    async addNote(note){
        const notes = [...this.state.notes];
        try{
            //adding note to backend
            const res = await axios.post('/notes', note);
            const NewNote = res.data;
            //adding note to frontend
            notes.push(NewNote);
            this.setState({notes});
        } catch(err){
            NotificationManager.error('Complete all fields');
        }
    }

    //edit note
    async editNote(note){
        //editing note to backend
        await axios.put('/notes/' + note.id, note);

        //editing note to frontend
        const notes = [...this.state.notes];
        const index = notes.findIndex(x => x.id === note.id);
        if (index >= 0) {
            notes[index] = note;
             this.setState({notes}); 
        }
        this.toggleModal();
    }
    
    toggleModal(){
        this.setState({
            showEditModal: !this.state.showEditModal
        });
    }
    
    //view modal edit form
    editNoteHandler(note){
        this.toggleModal();
        this.setState({editNote: note});
    }

    render(){
        return(
            <div>
                <NotificationContainer />

                <p>Notes App</p>

                <NewNote onAdd = {(note) => this.addNote(note)}/>

                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="EDIT NOTE"
                    ariaHideApp={false}>

                    <EditNote
                        id={this.state.editNote.id}
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        onEdit = {(note) => this.editNote(note)}/>
                    <div className="note"><button className="delete" onClick={() => this.toggleModal()}>CANCEL</button></div>
                </Modal>

                {this.state.notes.map(note => (
                    <Note 
                        key = {note.id}
                        id={note.id}
                        title={note.title}
                        body={note.body}
                        onEdit={(note) => this.editNoteHandler(note)}
                        onDelete={(id) => this.deleteNote(id)}
                    />
                ))};
            </div>
        );
    }
}
export default Notes;