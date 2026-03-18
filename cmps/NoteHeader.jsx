

const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteHeader({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [showSearch, setShowSearch] = useState(false)

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
        {showSearch && (
            <div className="search-wrapper">
                <input
                    value={filterByToEdit.txt}
                    onChange={ev => handleChange(ev)}
                    type="text"
                    name="txt"
                    placeholder="Vendor"
                    autoFocus
                />
                <button onClick={() => {
                    setShowSearch(false)
                    setFilterByToEdit(prev => ({ ...prev, txt: '' }))  
                }}>✕</button>
            </div>
        )}

        <nav>
            <svg onClick={() => setShowSearch(prev => !prev)}
                style={{ cursor: 'pointer' }}
                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>

    </header>
}
