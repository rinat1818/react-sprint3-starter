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
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    function onUpdateNoteColor(note, color) {

        note.style.backgroundColor = color
        keepsServis.save(note)
            .then(savedNote => {
                if (savedNote.isPinned) setPinnedNotes(prevNotes => prevNotes.map(n => n.id === note.id ? note : n))
                else setNotes(prevNotes => prevNotes.map(n => n.id === note.id ? note : n))
            })
    }

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        return keepsServis.query(filterBy)
            .then(notes => {
                setNotes(notes.filter(note => !note.isPinned))
                setPinnedNotes(notes.filter(note => note.isPinned))
            })
    }
    function onSaveNote(note) {

        return keepsServis.save(note)
            .then((savedNote) => {
                setNotes(prevNotes => ([...prevNotes, savedNote]))

            })
    }

    function removeNotes(noteId) {
        return keepsServis.remove(noteId)
            .then(() => setNotes(prev => prev.filter(note => note.id !== noteId)))
    }

    function onPinNote(note) {
        note.isPinned = !note.isPinned
        keepsServis.save(note)
            .then(savedNote => {
                setPinnedNotes(prevNotes => {
                    const already = prevNotes.find(n => n.id === savedNote.id)
                    if (already) return prevNotes.filter(n => n.id !== savedNote.id)
                    return [...prevNotes, savedNote]
                })

                setNotes(prevNotes => {
                    const already = prevNotes.find(n => n.id === savedNote.id)
                    if (already) return prevNotes.filter(n => n.id !== savedNote.id)
                    return [...prevNotes, savedNote]
                })
            })
    }



    if (!notes) return <div className="loader">yyy</div>


    return <div className="book-indx">

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
            onSelectNote={setSelectedNoteId}

        />
        {selectedNoteId && (
            <div className="note-overlay" onClick={() => {
                setSelectedNoteId(null)
                loadNotes()
            }}>
                <div className="note-modal" onClick={e => e.stopPropagation()}>
                    <NoteDetails
                        noteId={selectedNoteId}
                        onClose={() => {
                            setSelectedNoteId(null)
                            loadNotes()
                        }}
                    />
                </div>
            </div>
        )}
    </div>


}
