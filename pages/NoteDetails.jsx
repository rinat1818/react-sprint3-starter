const { Link } = ReactRouterDOM

import { keepsServis } from "../../../services/keep.js";

const { useParams } = ReactRouterDOM
const { useState, useEffect } = React

        export function NoteDetails() {
            const [note, setNote] = useState(null)
            const params = useParams()
            //  const [notes, setNotes] = useState(null)
            
    useEffect(() => {
        keepsServis.get(params.id).then(setNote)
    }, [params.id])

    function handleChange1({ target }) {
        const value = target.value

        const updatedNote = {
            ...note,
            info: { ...note.info, txt: value }
        }


        setNote(updatedNote)

        // שמירה אוטומטית
        keepsServis.save(updatedNote)
    }
    // function removeNotes(notekId) {
    //         return keepsServis.remove(notekId)
    //             .then(() => setNotes(prev => prev.filter(note=> note.id !== notekId)))
    //     }
    



    if (!note) return <div>loading...</div>

    return (
        <article className='book-list'>
            <Link to="/note">
            <button >←</button>
          
            </Link>
            
            
            {/* <Link to="/note" onClick={() => removeNotes(note.id,)}> */}
  {/* <button>←</button> */}
{/* </Link> */}

            <h1 className='title'>title</h1>
            {note.type === 'NoteTxt' && (
                <input className='note-input'
                    type="text"
                    value={note.info.txt || ''}
                    onChange={handleChange1}
                />
            )}


            <button className="menu-btn">⋮</button>

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
        
        
        
        
        ////////////////////////////////////