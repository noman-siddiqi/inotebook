import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3100/api/notes";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // TODO: API Call
    const endpoint = "/fetchallnotes";
    const response = await fetch(host + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setNotes(data[0]);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const endpoint = "/addnote";
    const response = await fetch(host + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const endpoint = "/deletenote/";
    await fetch(host + endpoint + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const endpoint = "/updatenote/";
    await fetch(host + endpoint + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let updateNote = JSON.parse(JSON.stringify(notes));
    // Add logic to update the note
    for (let i = 0; i < updateNote.length; i++) {
      const element = updateNote[i];
      if (element._id === id) {
        updateNote[i].title = title;
        updateNote[i].description = description;
        updateNote[i].tag = tag;
        break;
      }
    }
    setNotes(updateNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
