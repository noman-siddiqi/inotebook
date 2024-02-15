import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login");
        }

        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({
        id: "",
        title: "",
        description: "",
        tag: "",
    });
    // Function to set the note being edited as the initial state of the form fields
    const setInitialNoteValues = (note) => {
        setNote({
            id: note._id,
            title: note.title,
            description: note.description,
            tag: note.tag,
        });
    };

    const handleClick = (note) => {
        // Set the note being edited as the initial state of the form fields
        setInitialNoteValues(note);
        // Trigger the modal to open
        ref.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Call the editNote function with updated note data
        editNote(note.id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Edited Note successfully", "success");
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Note
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        aria-describedby="title"
                                        value={note.title}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={note.description}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tag"
                                        name="tag"
                                        value={note.tag}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                disabled={note.title.length < 5 || note.description.length < 5}
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your iNotes</h2>
                <h6>{notes.length === 0 && "No notes to display"}</h6>
                {notes.map((note) => {
                    return (
                        <NoteItem
                            showAlert={props.showAlert}
                            key={note._id}
                            note={note}
                            updateNote={handleClick}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
