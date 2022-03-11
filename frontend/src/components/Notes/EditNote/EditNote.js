import React, { useState } from "react";

export default function EditNote(props){
    
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    const changeTitleHandler = event => {
        const value = event.target.value;
        setTitle(value);
    }

    const changeBodyHandler = event => {
        const value = event.target.value;
        setBody(value);
    }

    const editNote = () => {
        const note = {
            id: props.id,
            title: title,
            body: body
        };
        props.onEdit(note);
    }
    
    // Modal form for edited note
    return(
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
        <button onClick={() => editNote()}>EDIT NOTE</button>
    </div>
    )
}