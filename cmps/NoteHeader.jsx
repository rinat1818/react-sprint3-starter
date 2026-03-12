// import { NoteSearch } from "../apps/note/pages/NoteSearch"

const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {

    return <header className="app-note-header">
        <Link to="/">
            <h3>LOGO ✨</h3>
        </Link>
          
        <nav>
       
    <section className="container about">
      <input
        type="text"
        className="note-search-input"
        placeholder="Search notes..."
      />
    </section>
  
           
        </nav>
    </header>
}
