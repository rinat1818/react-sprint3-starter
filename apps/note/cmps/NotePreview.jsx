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

export function NotePreview({ notes,onRemoveNotes }) {
  return (
    <section className="note-list">
      <ul className="fluid-grid">
        {notes.map(note => (
          <li key={note.id}
            style={{ backgroundColor: note.style.backgroundColor }}>
           
            <Link to={`/note/${note.id}`}>
              {note.type === 'NoteTxt' && <NoteTxt note={note} />}
              {note.type === 'NoteImg' && <NoteImg note={note} />}
            </Link>
            <button
           
              onClick={() => onRemoveNotes(note.id)}
              className="btn-remove">x</button>
          </li>
        ))}
      </ul>
{/* <button className="add-button">+</button> */}
<Link to="/note/edit">
  <button className="add-button">+</button>
</Link>
    </section>
  )
}