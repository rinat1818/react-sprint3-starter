const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"



export function NoteList({ notes }) {
    console.log(notes);

    return <section className="note-list">

        <ul className="fluid-grid">
            {notes.map(note => (
                <li key={note.id}>

                    <Link to={`/note/${note.id}`}>
                    <NotePreview note={note} />
                </Link>


                </li>
            ))}

        </ul >
<button className="add-button">+</button>
    </section >
}