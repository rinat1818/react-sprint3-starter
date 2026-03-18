// const { Link } = ReactRouterDOM


// const { useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { keepsServis } from "../services/keep.js";
import { ColorPicker } from "../apps/note/cmps/ColorPicker.jsx";

// export function NoteDetails() {
export function NoteDetails({ noteId, onClose }) {
    const [note, setNote] = useState(null)
     const [showColors, setShowColors] = useState(false)
    // const params = useParams()

    useEffect(() => {
        // if(!params.id )return
        if(!noteId) return
        // keepsServis.get(params.id).then(setNote)
         keepsServis.get(noteId).then(setNote)
         }, [noteId])
    // }, [params.id])

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
    // return <h1>hhh</h1>

    if (!note) return <div>loading...</div>

    return (
        <article className='single-note'
            style={{ backgroundColor: note.style.backgroundColor }}>

            {/* <Link to="/note">
                <button >←</button>
            </Link> */}
            <button onClick={onClose}>←</button>

            <h1 className='title'>title</h1>
            {note.type === 'NoteTxt' && (
                <input className='note-input'
                    type="text"
                    value={note.info.txt || ''}
                    onChange={handleChange1}
                    />
                )
            }
                <button type="button" onClick={() => setShowColors(prev => !prev)}>
                🎨
            </button>
            {showColors && <ColorPicker onColorChange={changeColor} />}

            {/* <button className="menu-btn">⋮</button> */}
       
    
            {/* {<h1>eeee</h1>} */}

            {/* <button
    type="button"
    onClick={() => setShowColors(prev => !prev)}
>
    🎨
</button> */}

{/* <ColorPicker
    colors={colors}
    showColors={showColors}
    onChangeColor={changeColor}
/> */}

            {/* {colors.map(color => (
                <button
                    className="Color-changer-button"
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => changeColor(color)}
                ></button>
            ))} */}

            {/* <button className="menu-btn">⋮</button> */}

        </article>
    )
}



//       function handleChange2({ target }) {
//   const value = target.value

//   const updatedNote = {
//     ...note,
//     info: { ...note.info, title: value }
//   }

//   setNote(updatedNote)
//   keepsServis.save(updatedNote)
// }


{/* {note.type === 'NoteImg' && (
                <input
                    type="text"
                    value={note.info.title || ''}
                    onChange={handleChange2}
                />
            )} */}
{/* <input
        type="text"
        // value={note.info.txt || ''||note.info.title}
        value={note.info.txt ||''}
        onChange={handleChange}
      />
      <input
        type="text"
        // value={note.info.txt || ''||note.info.title}
        value={note.info.title ||''}
        onChange={handleChange}
      /> */}
//  export function NoteDetails(){
// const [note, setNotes] = useState(null)

// const params = useParams()
// console.log(params);

// useEffect(() => {
//          keepsServis.get(params.id)
//              .then(setNotes)
//      }, [params.id])

//      if (!note) return <div className="loader"></div>

//      return <article className='book-list'>
// <h1 className='title' >title</h1>
// <h2>{note.info.txt}</h2>
//     <h2>{note.info.title}</h2>
// <button className="menu-btn">⋮</button>
//      </article>
//  }

{/* <button
  className="pinki"
  onClick={() => changeColor('pink')}
></button> */}


////////////////////////////////////
// function removeNotes(notekId) {
//         return keepsServis.remove(notekId)
//             .then(() => setNotes(prev => prev.filter(note=> note.id !== notekId)))
//     }  //  const [notes, setNotes] = useState(null)