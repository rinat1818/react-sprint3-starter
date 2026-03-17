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
            <img className="logo-img" src="img/logo.png" alt=""></img>
       {/* <p>Serch:</p> */}
        <input 
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            type="text" 
            name="txt"
            placeholder="Vendor"/>
           <Link to="/">
        </Link>
        <nav>
           <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {/* <NavLink to="/mail">Mail</NavLink> */}
            <NavLink to="/note">Note</NavLink>
        </nav>

      
    </header>
}
