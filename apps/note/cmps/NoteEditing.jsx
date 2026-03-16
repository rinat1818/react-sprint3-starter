const { Link } = ReactRouterDOM

const { useEffect, useState } = React

import { ColorPicker } from "./ColorPicker.jsx";
import { keepsServis } from "../../../services/keep.js"
import { storageService } from "../../../services/async-storage.service.js";

export function NoteEdit({ onSaveNote }) {

    const [note, setNote] = useState(keepsServis.getEmptyNote())
    const [showColors, setShowColors] = useState(false)
 

    

    function changeColor(color) {
        setNote(prev => ({
            ...prev,
            style: {
                ...prev.style,
                backgroundColor: color
            }
            
        }))
        // console.log(color);
        setShowColors(false)
    }

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

    function firstNotes() {
        console.log('kkkk');


    }
    function saveNote(ev) {
        ev.preventDefault()
        onSaveNote(note)
            .then(() => setNote(keepsServis.getEmptyNote()))
        // .then(setNote(keepsServis.getEmptyNote()))

    }

    return (
        <div className='input-edit'
       
        >
            <form onSubmit={saveNote}>

                <div className="note-container"
                    style={{ backgroundColor: note.style.backgroundColor }}>

                    <div className='input-title none' >
                        {<h1>title</h1>}
                        <button   style={{ backgroundColor: note.style.backgroundColor }} type="button" onClick={firstNotes}>ddd</button>


                    </div>
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

                    <div className="note-extra none"
                     >
                        <button   style={{ backgroundColor: note.style.backgroundColor }} onClick={hideGallery}>Save</button>

                        <button
                            type="button"
                            onClick={() => setShowColors(prev => !prev)}
                            style={{ backgroundColor: note.style.backgroundColor }}
                        >🎨</button>
                        <button></button>
                    </div>

                    {showColors && (
                        <ColorPicker onColorChange={changeColor} />
                    )}
                  
                </div>
               

            </form>
        </div>
    )


}


