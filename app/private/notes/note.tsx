'use client';
import { useRouter } from "next/navigation";
export function Note({note, noteID, deleteNote} : {note: string, noteID: number, deleteNote: (noteID: number, formData: FormData) => void}){
    const deleteNoteWithID = deleteNote.bind(null, noteID)
    const router = useRouter();
    return (
        <li key={noteID} className='border p-2 m-2'><p>{note}</p>
        <form action={deleteNoteWithID}>
            <button>Delete this!</button>
        </form>
        <button onClick={() => {router.push(`/private/notes/${noteID}`)}}>See more!</button>
        </li>
    )
}