const { Link } = ReactRouterDOM

const { useEffect, useState } = React

import { keepsServis } from "../../../services/keep.js"
import { storageService } from "../../../services/async-storage.service.js";

export function NoteEdit() {

    const [note, setNote] = useState(keepsServis.getEmptyNote())
    console.log(note);


    function handleChange({ target }) {
        const value = target.value

        setNote(prev => ({
            ...prev,
            info: {
                ...prev.info,
                txt: value
            }
        }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()

        keepsServis.save(note)
            .then(() => console.log('saved'))
    }

    return (
        <div>
           <Link to="/note">
            <button >←</button>
          
            </Link>
            <form onSubmit={onSaveNote}>
                <label htmlFor="txt">Note:</label>
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="write note"
                    value={note.info.txt}
                    onChange={handleChange}
                />

                <button>Save</button>
                {/* { <Link to="/note">
            <button >←</button>
          
            </Link>} */}
            </form>
        </div>
    )

    
}


