const { useState, useEffect } = React


import { keepsServis } from "../../../services/keep.js";
import { NoteList } from "../cmps/NoteList.jsx";


export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()

    }, [])

    function loadNotes() {

        return keepsServis.query()
            .then(setNotes)
    }


    if (!notes) return <div className="loader">yyy</div>


    return <div className="book-indx">

        <NoteList
            notes={notes} />


    </div>


}
