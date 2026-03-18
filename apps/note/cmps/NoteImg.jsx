
export function NoteImg({ note }) {
  return (
    <div className="note-img">
      <img src={note.info.url} alt={note.info.title} />
      {/* <h2>{note.info.title}</h2> */}
        <h2>{note.info.noteTitle}</h2>
    </div>
  )
}