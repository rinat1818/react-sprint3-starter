



// export function NoteImg({note}){
//      return <div>

  
//    <img src={note.info.url} alt={note.info.title} />
//    <h2>{note.title}</h2>
   
  
// </div>
// }

// export function NoteImg({ note }) {
//   return (
//     <div>
//       <img src={note.info.url} alt={note.info.title} />
//       <h2>{note.info.title}</h2>
//     </div>
//   )
// }


export function NoteImg({ note }) {
  return (
    <div className="note-img">
      <img src={note.info.url} alt={note.info.title} />
      <h2>{note.info.title}</h2>
    </div>
  )
}