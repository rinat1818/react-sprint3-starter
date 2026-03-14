const { Link } = ReactRouterDOM

const { useEffect, useState } = React

import { keepsServis } from "../../../services/keep.js"
import { storageService } from "../../../services/async-storage.service.js";

export function NoteEdit({ onSaveNote }) {

    const [note, setNote] = useState(keepsServis.getEmptyNote())
    // console.log(note);

    const [showColors, setShowColors] = useState(false)
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
    function showBtn() {
        const elBtn = document.querySelector('.note-extra')
        elBtn.classList.remove('none')
        const elH1 = document.querySelector('.input-title')
        elH1.classList.remove('none')
    }
    function hideGallery() {
        const elBtn = document.querySelector('.note-extra')
        elBtn.classList.add('none')
        const elH1 = document.querySelector('.input-title')
        elH1.classList.add('none')
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

    function saveNote(ev) {
        ev.preventDefault()
        onSaveNote(note)
            .then(setNote(keepsServis.getEmptyNote()))

    }

    return (
        <div className='input-edit'>
            {/* <Link to="/note">
            <button >←</button>
          
            </Link> */}
            <form onSubmit={saveNote}

            >
                {/* <label htmlFor="txt">Note:</label> */}
                <div className="note-container"
                    style={{ backgroundColor: note.style.backgroundColor }}>

                    <div className='input-title none' >{<h1>title</h1>}</div>

                    {/* {hideGallery()} */}
                    <input
                        className="note-input"
                        type="text"
                        id="txt"
                        name="txt"
                        placeholder="write note"
                        value={note.info.txt}
                        onChange={handleChange}
                        onClick={showBtn}

                    />

                    <div className="note-extra none">
                        {/* {var nite = d} */}
                        <button onClick={hideGallery}>Save</button>
                        {/* <button >🎨</button> */}
                        <button type="button" onClick={() => setShowColors(prev => !prev)}>
                            🎨
                        </button>
                        <button></button>

                    </div>
                </div>



                {showColors && (
                    <div className="color-picker">
                        {colors.map(color => (
                            <button
                                type="button"
                                className="Color-changer-button"
                                key={color}
                                style={{ backgroundColor: color }}
                                onClick={() => changeColor(color)}
                            ></button>
                        ))}
                    </div>
                )}
                {/* {colors.map(color => (
                    <button
                        type="button"
                        className="Color-changer-button"
                        key={color}
                        style={{ backgroundColor: color }}
                        // onClick={() => changeColor(color)}
                    ></button>
                ))} */}
                {/* { <Link to="/note">
            <button >←</button>
          
            </Link>} */}
            </form>
        </div>
    )


}


