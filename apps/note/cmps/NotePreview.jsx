const { useEffect, useState } = React

import { NoteImg } from "./NoteImg.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
import { ColorPicker } from "./ColorPicker.jsx";


export function NotePreview({ notes, onRemoveNotes, onUpdateNoteColor, pinnedNotes, onPinNote, onSelectNote }) {

  const [openColorId, setOpenColorId] = useState(null)

  {
    return (

      <section
        className="note-list">
        <div className="first-notes">
          {pinnedNotes.map(note => (

            <li key={note.id}
              style={{ backgroundColor: note.style.backgroundColor }}
              className="hte-note">

              <div onClick={() => onSelectNote(note.id)} style={{ cursor: 'pointer' }}>
                {note.type === 'NoteTxt' && <NoteTxt note={note} />}
                {note.type === 'NoteImg' && <NoteImg note={note} />}
              </div>

              <div className="note-btn">
                <div className="note-btn-left">
                  <button type="button" onClick={() => onPinNote(note)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg>
                  </button>

                  <button type="button" onClick={() =>
                    setOpenColorId(prev => prev === note.id ? null : note.id)
                  }><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-177 23q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120-160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm200 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120 160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" /></svg></button>
                </div>
                <button onClick={() => onRemoveNotes(note.id)} className="btn-remove">x</button>


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

          {notes.filter(note => !pinnedNotes.find(p => p.id === note.id)).map(note => (
            <li key={note.id}
              style={{ backgroundColor: note.style.backgroundColor }}
              className="hte-note"
            >

              <div onClick={() => onSelectNote(note.id)} style={{ cursor: 'pointer' }}>
                {note.type === 'NoteTxt' && <NoteTxt note={note} />}
                {note.type === 'NoteImg' && <NoteImg note={note} />}
              </div>


              <div className="note-btn">
                <div className="note-btn-left">
                  <button type="button" onClick={() => onPinNote(note)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg></button>


                  <button type="button" onClick={() =>
                    setOpenColorId(prev => prev === note.id ? null : note.id)
                  }><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-177 23q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120-160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm200 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120 160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" /></svg></button>

                </div>
                <button onClick={() => onRemoveNotes(note.id)}
                  className="btn-remove">x</button>
                {openColorId === note.id && (
                  <ColorPicker onColorChange={(color) => {
                    onUpdateNoteColor(note, color)
                    setOpenColorId(null)
                  }} />
                )}
              </div>

            </li>
          ))}
        </ul>
      </section>
    )
  }


}

