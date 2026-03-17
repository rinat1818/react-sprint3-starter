// const { Link } = ReactRouterDOM
const { useEffect, useState } = React

import { NoteImg } from "./NoteImg.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
import { keepsServis } from "../../../services/keep.js";
import { ColorPicker } from "./ColorPicker.jsx";


export function NotePreview({ notes, onRemoveNotes, onUpdateNoteColor, pinnedNotes, onPinNote, onSelectNote }) {
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

              {/* <Link to={`/note/${note.id}`}> */}
                {/* {note.type === 'NoteTxt' && <NoteTxt note={note} />} */}
                {/* {note.type === 'NoteImg' && <NoteImg note={note} />} */}
              {/* </Link> */}
            <div onClick={() => onSelectNote(note.id)} style={{ cursor: 'pointer' }}>
              {note.type === 'NoteTxt' && <NoteTxt note={note} />}
              {note.type === 'NoteImg' && <NoteImg note={note} />}
            </div>

              

              <button onClick={() => onRemoveNotes(note.id)} className="btn-remove">x</button>
              {/*               
              <button type="button" onClick={() => onPinNote(note.id)}>📌</button>
            </li>
          ))}

        </div> */}
              <button type="button" onClick={() => onPinNote(note)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
              </button>
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
                    onUpdateNoteColor(note, color)
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

              {/* <Link to={`/note/${note.id}`}>
                {note.type === 'NoteTxt' && <NoteTxt note={note} />}
                {note.type === 'NoteImg' && <NoteImg note={note} />}
              </Link> */}

  <div onClick={() => onSelectNote(note.id)} style={{ cursor: 'pointer' }}>
              {note.type === 'NoteTxt' && <NoteTxt note={note} />}
              {note.type === 'NoteImg' && <NoteImg note={note} />}
            </div>
              <button

                onClick={() => onRemoveNotes(note.id)}
                className="btn-remove">x</button>

              <button type="button" onClick={() => onPinNote(note)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg></button>
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
                    onUpdateNoteColor(note, color)
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

