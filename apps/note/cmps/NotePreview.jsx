const { Link } = ReactRouterDOM
const { useEffect, useState } = React

import { NoteImg } from "./NoteImg.jsx";
// import { NotePreview } from "./NoteTxt.jsx"
import { NoteTxt } from "./NoteTxt.jsx";
import { keepsServis } from "../../../services/keep.js";

import { NoteEdit } from "./NoteEditing.jsx";
import { ColorPicker } from "./ColorPicker.jsx";


export function NotePreview({ notes, onRemoveNotes, onUpdateNoteColor, pinnedNotes, onPinNote }) {
  //  const [not, setNote] = useState(keepsServis.getEmptyNote())
  // const [showColors, setShowColors] = useState(nul

  const [openColorId, setOpenColorId] = useState(null)
  // const [pinnedNote, setPinnedNote] = useState([])  
  // const [pinnedNotes, setPinnedNotes] = useState([])
  {
    return (

      <section
        className="note-list">
        <div className="first-notes">
          {pinnedNotes.map(note => (
            <li key={note.id}
              style={{ backgroundColor: note.style.backgroundColor }}
              className="hte-note">
              <Link to={`/note/${note.id}`}>
                {note.type === 'NoteTxt' && <NoteTxt note={note} />}
                {note.type === 'NoteImg' && <NoteImg note={note} />}
              </Link>
              <button onClick={() => onRemoveNotes(note.id)} className="btn-remove">x</button>
{/*               
              <button type="button" onClick={() => onPinNote(note.id)}>📌</button>
            </li>
          ))}

        </div> */}
        <button type="button" onClick={() => onPinNote(note.id)}>📌</button>
            <div className="note-btn">
                hh
                <button type="button" onClick={() =>
                    setOpenColorId(prev => prev === note.id ? null : note.id)
                }>🎨</button>
                <button>ff</button>
                <button>ff</button>
                <button>ff</button>
                {openColorId === note.id && (
                    <ColorPicker onColorChange={(color) => {
                        onUpdateNoteColor(note.id, color)
                        setOpenColorId(null)
                    }} />
                )}
            </div>
        </li>
    ))}
</div>

        <ul className="note">
          {/* {notes.map(note => ( */}

          {notes.filter(note => !pinnedNotes.find(p => p.id === note.id)).map(note => (
            <li key={note.id}
              style={{ backgroundColor: note.style.backgroundColor }}
              className="hte-note"
            >

              <Link to={`/note/${note.id}`}>
                {note.type === 'NoteTxt' && <NoteTxt note={note} />}
                {note.type === 'NoteImg' && <NoteImg note={note} />}
              </Link>


              <button

                onClick={() => onRemoveNotes(note.id)}
                className="btn-remove">x</button>

              <button type="button" onClick={() => onPinNote(note.id)}>📌</button>
              {/* <button type="button" onClick={() => onPinNote(note.id)}>📌</button> */}
              <div className="note-btn">
                hh

                <button type="button" onClick={() =>
                  setOpenColorId(prev => prev === note.id ? null : note.id)
                }>🎨</button>

                <button>ff</button>
                <button>ff</button>

                <button>ff</button>
                {openColorId === note.id && (
                  <ColorPicker onColorChange={(color) => {
                    onUpdateNoteColor(note.id, color)
                    setOpenColorId(null) // סוגר אחרי בחירה
                  }} />
                )}
              </div>



            </li>
          ))}
        </ul>
        {/* <Link to="/note/edit">
  <button className="add-button">+</button>
  </Link> */}
      </section>
    )
  }


}

