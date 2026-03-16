const { useState, useEffect } = React


import { keepsServis } from "../../../services/keep.js";

import { NotePreview } from "../cmps/NotePreview.jsx";
import { NoteDetails } from "../../../pages/NoteDetails.jsx";
import { NoteHeader } from "../../../cmps/NoteHeader.jsx";
import { NoteEdit } from "../cmps/NoteEditing.jsx";
export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(keepsServis.getDefaultFilter())
    const [pinnedNotes, setPinnedNotes] = useState([])

    function onUpdateNoteColor(noteId, color) {
    //     const updatedNotes = notes.map(note =>
    //         note.id === noteId
    //             ? { ...note, style: { ...note.style, backgroundColor: color } }
    //             : note
    //     )
    //     setNotes(updatedNotes)
    //     const noteToSave = updatedNotes.find(note => note.id === noteId)
    //     keepsServis.save(noteToSave)

    // }

 const updatedNotes = notes.map(note =>
        note.id === noteId
            ? { ...note, style: { ...note.style, backgroundColor: color } }
            : note
    )
    setNotes(updatedNotes)
    
    // ✅ תוסיפי את זה:
    setPinnedNotes(prev => prev.map(note =>
        note.id === noteId
            ? { ...note, style: { ...note.style, backgroundColor: color } }
            : note
    ))
    
    const noteToSave = updatedNotes.find(note => note.id === noteId)
    keepsServis.save(noteToSave)
}


    useEffect(() => {
        loadNotes()

    }, [filterBy])

    useEffect(() => {
    const saved = localStorage.getItem('pinnedNotes')
    if (saved) setPinnedNotes(JSON.parse(saved))
}, [])
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
    
    function onPinNote(noteId) {
        setPinnedNotes(prev => {
            const already = prev.find(n => n.id === noteId)
            if (already) return prev.filter(n => n.id !== noteId)  // הסר אם כבר נעוץ
            const note = notes.find(n => n.id === noteId)
            return [...prev, note]  // הוסף אם לא
            
        })
         const note = notes.find(n => n.id === noteId)
    keepsServis.save(note)
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
            onUpdateNoteColor={onUpdateNoteColor}
            onPinNote={onPinNote}
                pinnedNotes={pinnedNotes}


        //             onRemoveNotes={removeNotes}
        //  onChangeColor={onChangeColor}


        />


    </div>


}
