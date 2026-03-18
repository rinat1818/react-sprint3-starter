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
       
        setShowColors(false)
    }

    function handleChange({ target }) {
        const value = target.value
        setNote(prev => ({
            ...prev,
            info: {
                ...prev.info,
                ...(prev.type === 'NoteImg' ? { title: value } : { txt: value })  // ✅ לפי סוג הפתק
            }
        }))
    }
    function showBtn() {
        border1()
        const elBtn = document.querySelector('.note-extra')
        elBtn.classList.remove('none')
        const elH1 = document.querySelector('.input-title')
        elH1.classList.remove('none')
    }
    function hideGallery() {
        border2()
        const elBtn = document.querySelector('.note-extra')
        elBtn.classList.add('none')
        const elH1 = document.querySelector('.input-title')
        elH1.classList.add('none')
    }
    function border1() {
        const elBtn = document.querySelector('.note-input')
        elBtn.classList.remove('border')
        const elH1 = document.querySelector('.note-container')
        elH1.classList.add('border')
    }
    function border2() {
        const elBtn = document.querySelector('.note-input')
        elBtn.classList.add('border')
        const elH1 = document.querySelector('.note-container')
        elH1.classList.remove('border')
    }

    function firstNotes() {
        console.log('kkkk');


    }
    function saveNote(ev) {
        ev.preventDefault()
        onSaveNote(note)
            .then(() => setNote(keepsServis.getEmptyNote()))

    }

    return (
        <div className='input-edit '

        >
            <form onSubmit={saveNote}>

                <div className="note-container "
                    style={{ backgroundColor: note.style.backgroundColor }}>

                    <div className='input-title none' >
                        {<h1>Title</h1>}
                        {/* <button   style={{ backgroundColor: note.style.backgroundColor }} type="button" onClick={firstNotes}>ddd</button> */}


                    </div>
                    {note.type === 'NoteImg' && note.info.url && (
                        <img src={note.info.url} alt="" style={{ width: '100%', borderRadius: '8px' }} />
                    )}

                    <input
                        className="note-input border"
                        type="text"
                        id="txt"
                        name="txt"
                        placeholder="write note"
                        // value={note.info.txt}
                        value={note.type === 'NoteImg' ? note.info.title || '' : note.info.txt}
                        onChange={handleChange}
                        onClick={showBtn}
                        style={{ backgroundColor: note.style.backgroundColor }}
                    />

                    <div className="note-extra none"
                    >

                        <button
                            type="button"
                            onClick={() => setShowColors(prev => !prev)}
                            style={{ backgroundColor: note.style.backgroundColor }}
                        ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-177 23q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120-160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm200 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120 160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" /></svg>

                        </button>
                        {/* <button>#</button> */}

                        <button type="button" onClick={() => document.getElementById('img-upload').click()} 
                             style={{ backgroundColor: note.style.backgroundColor }} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
                            </svg>
                        </button>

                        <input
                            id="img-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onClick={(ev) => { ev.target.value = null }}

                            onChange={(ev) => {
                                const file = ev.target.files[0]
                                if (!file) return
                                const reader = new FileReader()
                                reader.onload = (e) => {
                                    setNote(prev => ({
                                        ...prev,
                                        type: 'NoteImg',
                                        info: { ...prev.info, url: e.target.result, title: '' }
                                    }))
                                }
                                reader.readAsDataURL(file)
                            }}
                        //                             onChange={(ev) => {
                        //     const file = ev.target.files[0]
                        //     if (!file) return
                        //     const reader = new FileReader()
                        //     reader.onload = (e) => {
                        //         const img = new Image()
                        //         img.onload = () => {
                        //             const canvas = document.createElement('canvas')
                        //             const MAX = 400
                        //             const ratio = Math.min(MAX / img.width, MAX / img.height)
                        //             canvas.width = img.width * ratio
                        //             canvas.height = img.height * ratio
                        //             canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
                        //             const compressed = canvas.toDataURL('image/jpeg', 0.5)
                        //             setNote(prev => ({
                        //                 ...prev,
                        //                 type: 'NoteImg',
                        //                 info: { ...prev.info, url: compressed, title: '' }
                        //             }))
                        //         }
                        //          img.src = e.target.result
                        //     }
                        //     reader.readAsDataURL(file)
                        // }}
                        />

                        <button style={{ backgroundColor: note.style.backgroundColor }} onClick={hideGallery} className="save">Save</button>
                        {/* <button></button> */}
                    </div>

                    {showColors && (
                        <ColorPicker onColorChange={changeColor} />
                    )}

                </div>


            </form>
        </div>
    )


}


