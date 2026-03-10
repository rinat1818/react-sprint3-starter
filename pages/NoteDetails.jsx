 const {Link} =ReactRouterDOM
 
 import { keepsServis } from "../../../services/keep.js";
 
 const{useParams}=ReactRouterDOM 
const { useState, useEffect } = React

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




////////////////////////////////////
export function NoteDetails() {
  const [note, setNote] = useState(null)
  const params = useParams()

  useEffect(() => {
    keepsServis.get(params.id).then(setNote)
  }, [params.id])

  function handleChange({ target }) {
    const value = target.value

    const updatedNote = {
      ...note,
      info: { ...note.info, txt: value }
    }

    setNote(updatedNote)

    // שמירה אוטומטית
    keepsServis.save(updatedNote)
  }

  if (!note) return <div>loading...</div>

  return (
    <article className='book-list'>
<Link to="/note"><button>←</button></Link>

      <h1 className='title'>title</h1>

      <input
        type="text"
        // value={note.info.txt || ''||note.info.title}
        value={note.info.txt || note.info.title || ''}
        onChange={handleChange}
      />

      <button className="menu-btn">⋮</button>
      {/* {note.info.title && <h2>{note.info.title}</h2>} */}
      {/* <button className="menu-btn">⋮</button> */}
    </article>
  )
}