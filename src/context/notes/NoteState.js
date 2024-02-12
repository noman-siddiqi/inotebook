import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
    const notesInitial = [
        [
            {
            "_id": "65c559f098ecaf72da616dc7",
            "user": "65c500c86aee6b24d9d636f8",
            "title": "Second Note",
            "description": "It's working great",
            "tag": "iNote 2",
            "date": "2024-02-08T22:47:12.252Z",
            "__v": 0
            },
            {
            "_id": "65c8418241e94d4407e825b0",
            "user": "65c500c86aee6b24d9d636f8",
            "title": "Third Note",
            "description": "wow great work",
            "tag": "iNote 3",
            "date": "2024-02-11T03:39:46.818Z",
            "__v": 0
            },
            {
                "_id": "65c559f098ecaf72da616dc7",
                "user": "65c500c86aee6b24d9d636f8",
                "title": "Second Note",
                "description": "It's working great",
                "tag": "iNote 2",
                "date": "2024-02-08T22:47:12.252Z",
                "__v": 0
                },
                {
                "_id": "65c8418241e94d4407e825b0",
                "user": "65c500c86aee6b24d9d636f8",
                "title": "Third Note",
                "description": "wow great work",
                "tag": "iNote 3",
                "date": "2024-02-11T03:39:46.818Z",
                "__v": 0
                },{
                    "_id": "65c559f098ecaf72da616dc7",
                    "user": "65c500c86aee6b24d9d636f8",
                    "title": "Second Note",
                    "description": "It's working great",
                    "tag": "iNote 2",
                    "date": "2024-02-08T22:47:12.252Z",
                    "__v": 0
                    },
                    {
                    "_id": "65c8418241e94d4407e825b0",
                    "user": "65c500c86aee6b24d9d636f8",
                    "title": "Third Note",
                    "description": "wow great work",
                    "tag": "iNote 3",
                    "date": "2024-02-11T03:39:46.818Z",
                    "__v": 0
                    },
                    {
                        "_id": "65c559f098ecaf72da616dc7",
                        "user": "65c500c86aee6b24d9d636f8",
                        "title": "Second Note",
                        "description": "It's working great",
                        "tag": "iNote 2",
                        "date": "2024-02-08T22:47:12.252Z",
                        "__v": 0
                        },
                        {
                        "_id": "65c8418241e94d4407e825b0",
                        "user": "65c500c86aee6b24d9d636f8",
                        "title": "Third Note",
                        "description": "wow great work",
                        "tag": "iNote 3",
                        "date": "2024-02-11T03:39:46.818Z",
                        "__v": 0
                        }
        ]
        ];

    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;