export function NoteTxt({note}){
     return <div>
 {note.info.noteTitle && <h2 className="text">{note.info.noteTitle}</h2>}
    <h2 className="text">{note.info.txt}</h2>
</div>

}