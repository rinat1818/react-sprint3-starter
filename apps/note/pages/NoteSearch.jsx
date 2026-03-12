const { useState } = React
export function NoteSearch() {
//  const [filterBy, setFilterBy] = useState(booksServis.getDefaultFilter())

 return (
    <section className="container about">
      <input
        type="text"
        className="note-search-input"
        placeholder="Search notes..."
      />
    </section>
  )
}
