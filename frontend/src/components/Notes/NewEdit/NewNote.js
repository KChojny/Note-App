import React, { useState } from "react";
import '../Notes.css';

function NewNote(props){

    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const changeTitleHandler = event => {
        const value = event.target.value;
        setTitle(value);
    }

    const changeBodyHandler = event => {
        const value = event.target.value;
        setBody(value);
    }

    const addNote = () => {
        const note = {
            title: title,
            body: body
        };
        props.onAdd(note);

        setTitle('');
        setBody('');
        setShowForm(false);
    }
    
    //form for new note and hide it
    return(
        showForm ? (
        <div className="note">
            <p>
                <label>Tilte: </label>
                <input 
                    type="text"
                    value={title}
                    onChange={changeTitleHandler}
                />
            </p>
            <p>
                <label>Content: </label>
                <input
                    type="text"
                    value={body}
                    onChange={changeBodyHandler}
                />
            </p>
            <button onClick={() => addNote()}>ADD NOTE</button>
            <button className="delete" onClick={() => toggleForm()}>CANCEL</button>
        </div>
        ) : (
            <button className="note" onClick={() => toggleForm()}>NEW NOTE</button>
        )
    );
}

export default NewNote;