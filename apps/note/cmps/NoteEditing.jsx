const { Link } = ReactRouterDOM

const { useEffect, useState } = React

import { keepsServis } from "../../../services/keep.js"
import { storageService } from "../../../services/async-storage.service.js";

export function NoteEdit() {

    const [note, setNote] = useState(keepsServis.getEmptyNote())
    // console.log(note);
    const colors = [
        '#ffffff',
        '#faafa8',
        '#f39f76',
        '#fff8b8',
        '#e2f6d3',
        '#b4ddd3',
        '#d4e4ed',
        '#aeccdc',
        '#d3bfdb',
        '#f6e2dd',
        '#e9e3d4',
        '#efeff1',
        
    ]



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
    // console.log('saved')
    // function changeColor(color) {
    //         const updatedNote = {
    //             ...note,
    //             style: {
    //                 ...note.style,
    //                 backgroundColor: color
    //             }
    //         }

    //         setNote(updatedNote)
    //         keepsServis.save(updatedNote)
    //     }
    function changeColor(color) {
        setNote(prev => ({
            ...prev,
            style: {
                ...prev.style,
                backgroundColor: color
            }
        }))
    }

    return (
        <div className='input-edit'>
            {/* <Link to="/note">
            <button >←</button>
          
            </Link> */}
            <form onSubmit={onSaveNote}
            >
                <label htmlFor="txt">Note:</label>
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="write note"
                    value={note.info.txt}
                    onChange={handleChange}
                    style={{ backgroundColor: note.style.backgroundColor }}

                />

                <button>Save</button>
                {colors.map(color => (
                    <button
                        type="button"
                        className="Color-changer-button"
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={() => changeColor(color)}
                    ></button>
                ))}
                {/* { <Link to="/note">
            <button >←</button>
          
            </Link>} */}
            </form>
        </div>
    )


}


