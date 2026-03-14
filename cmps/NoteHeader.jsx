// import { NoteSearch } from "../apps/note/pages/NoteSearch"

const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteHeader({ filterBy, setFilterBy }) {
 const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    function handleChange(ev) {
        const { type, value, name } = ev.target

        setFilterByToEdit(prev => (
            { ...prev, [name]: type === 'text' ? value : +value }))
    }

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])
    return <header className="app-note-header">
       <p>Serch:</p>
        <input 
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            type="text" 
            name="txt"
            placeholder="Vendor"/>

      
    </header>
}
