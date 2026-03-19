
// export function NoteImg({ note }) {
//   return (
//     <div className="note-img">
//       <img src={note.info.url} alt={note.info.title} />
//       {/* <h2>{note.info.title}</h2> */}
//         <h2>{note.info.noteTitle}</h2>
//     </div>
//   )
// }
export function NoteImg({ note }) {
  return (
    <div className="note-img">
      <h2>{note.info.noteTitle}</h2>
      <img src={note.info.url} alt={note.info.title} />
      <p>{note.info.txt}</p>
    </div>
  )
}