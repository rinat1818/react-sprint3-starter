const { useState, useEffect } = React

import { keepsServis } from "../services/keep.js";
import { ColorPicker } from "../apps/note/cmps/ColorPicker.jsx";


export function NoteDetails({ noteId, onClose }) {
    const [note, setNote] = useState(null)
     const [showColors, setShowColors] = useState(false)
  

    useEffect(() => {
      
        if(!noteId) return
         keepsServis.get(noteId).then(setNote)
         }, [noteId])
   

    function handleChange1({ target }) {
        const value = target.value

        const updatedNote = {
            ...note,
            info: { ...note.info, txt: value }
        }
        setNote(updatedNote)
        keepsServis.save(updatedNote)
    }

    function changeColor(color) {
        const updatedNote = {
            ...note,
            style: {
                ...note.style,
                backgroundColor: color
            }
        }

        setNote(updatedNote)
        keepsServis.save(updatedNote)
    }
    function handleChangeTitle({ target }) {
    const value = target.value
    const updatedNote = {
        ...note,
        info: { ...note.info, title: value }
    }
    setNote(updatedNote)
    keepsServis.save(updatedNote)
}

    if (!note) return <div>loading...</div>

    return (
        <article className='single-note'
            style={{ backgroundColor: note.style.backgroundColor }}>

            <button onClick={onClose}>←</button>

            <h1 className='title'>title</h1>
            {note.type === 'NoteTxt' && (
                <input className='note-input'
                    type="text"
                    value={note.info.txt || ''}
                    onChange={handleChange1}
                     style={{ backgroundColor: note.style.backgroundColor }}
                    />
                )
            }
             {note.type === 'NoteImg' && (
            <div>
                <img src={note.info.url} alt={note.info.title} />
                <input
                    className='note-input'
                    type="text"
                    value={note.info.title || ''}
                    onChange={handleChangeTitle}  
                     style={{ backgroundColor: note.style.backgroundColor }}
                />
            </div>
        )}
                <button type="button" onClick={() => setShowColors(prev => !prev)}
                    style={{ backgroundColor: note.style.backgroundColor }}
                    className="btn-d">
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-177 23q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120-160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm200 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120 160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>
            </button>
            {showColors && <ColorPicker onColorChange={changeColor} />}

        </article>
    )
}