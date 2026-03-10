const { Link } = ReactRouterDOM

import { NoteImg } from "./NoteImg.jsx";
// import { NotePreview } from "./NoteTxt.jsx"
import { NoteTxt } from "./NoteTxt.jsx";


// export function NotePreview({ notes }) {
//     console.log(notes);

//     return <section className="note-list">

//         <ul className="fluid-grid">
//             {notes.map(note => (
//                 <li key={note.id}>

//                     <Link to={`/note/${note.id}`}>
//                         <NoteTxt note={note} />
//                     </Link>
//                     {note.type === 'NoteImg' && <NoteImg note={note} />}
//                     <Link to={`/note/${note.id}`}>
//                         <NoteImg note={note} />
//                     </Link>



//                 </li>
//             ))}

//         </ul >
//         <button className="add-button">+</button>
//     </section >
// }

export function NotePreview({ notes }) {
  return (
    <section className="note-list">
      <ul className="fluid-grid">
        {notes.map(note => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              {note.type === 'NoteTxt' && <NoteTxt note={note} />}
              {note.type === 'NoteImg' && <NoteImg note={note} />}
            </Link>
          </li>
        ))}
      </ul>

      <button className="add-button">+</button>
    </section>
  )
}