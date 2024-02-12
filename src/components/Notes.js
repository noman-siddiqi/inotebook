import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./Noteitem";


function Notes() {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    const item = notes[0];
    return (
        <div className="row my-3">
        <h2>Your iNotes</h2>
        {item.map((note,index) => {
                return <NoteItem key={index} note={note} />
            })}                
        </div>
    );
}

export default Notes;
