const { useState, useEffect } = React


import { keepsServis } from "../../../services/keep.js";
// import { NoteList } from "../cmps/NotePreview.jsx";
// import { NotePreview } from "../cmps/NoteTxt.jsx";
import { NotePreview } from "../cmps/NotePreview.jsx";
import { NoteDetails } from "../../../pages/NoteDetails.jsx";
import { NoteHeader } from "../../../cmps/NoteHeader.jsx";
import { NoteEdit } from "../cmps/NoteEditing.jsx";
export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(keepsServis.getDefaultFilter())

    

    useEffect(() => {
        loadNotes()

    }, [filterBy])

    function loadNotes() {

        return keepsServis.query(filterBy)
            .then(setNotes)
    }
    function onSaveNote(note) {

        return keepsServis.save(note)
            .then((savedNote) => {
                setNotes(prevNotes => ([...prevNotes, savedNote]))

                //   return savedNote
            })
    }

    function removeNotes(notekId) {
        return keepsServis.remove(notekId)
            .then(() => setNotes(prev => prev.filter(note => note.id !== notekId)))
    }


    if (!notes) return <div className="loader">yyy</div>


    return <div className="book-indx">
        {/* <NoteDetails /> */}

        < NoteHeader
            filterBy={filterBy}

            setFilterBy={setFilterBy} />
        <NoteEdit
            onSaveNote={onSaveNote} 

/>

        <NotePreview
            notes={notes}
            onRemoveNotes={removeNotes}


          
        />


    </div>


}
