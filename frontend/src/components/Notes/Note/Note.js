import React, { useState } from "react";
import '../Notes.css';

function Note(props){

    const [showBody, setShowBody] = useState(false);
    const toggleBody = () => {
        setShowBody(!showBody);
    }

    const editHandler = () => {
        props.onEdit({
            id: props.id,
            title: props.title, 
            body: props.body, 
            
        });
    }
    
    //form for note
    return(
        <div className="note">
             <p onClick={toggleBody}>{props.title}</p>
                {showBody && (
                    <div className="description">{props.body}</div>
                 )}
            <button
                onClick={editHandler}
                >EDIT</button>
            <button 
                 className="delete"
                 onClick={() => {props.onDelete(props.id)}}
            >DELETE</button>
        </div>
    );
}

export default Note;