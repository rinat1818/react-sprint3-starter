const { useState, useEffect } = React


import { keepsServis } from "../../../services/keep.js";
// import { NoteList } from "../cmps/NotePreview.jsx";
// import { NotePreview } from "../cmps/NoteTxt.jsx";
import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()

    }, [])

    function loadNotes() {

        return keepsServis.query()
            .then(setNotes)
    }

      function removeNotes(notekId) {
        return keepsServis.remove(notekId)
            .then(() => setNotes(prev => prev.filter(note=> note.id !== notekId)))
    }


    if (!notes) return <div className="loader">yyy</div>


    return <div className="book-indx">

        <NotePreview
            notes={notes} 
             onRemoveNotes={removeNotes}
            />


    </div>


}
