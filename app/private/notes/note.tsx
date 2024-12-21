'use client';
export function Note({note, noteID, deleteNote} : {note: string, noteID: number, deleteNote: (noteID: number, formData: FormData) => void}){
    const deleteNoteWithID = deleteNote.bind(null, noteID)

    return (
        <li key={noteID} className='border p-2 m-2'><p>{note}</p>
        <form action={deleteNoteWithID}>
            <button>Delete this!</button>
        </form>
        </li>
    )
}