
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { deleteNote } from "../actions";
import { Modal } from "./modal";
export default async function NotePage({params}: {params: Promise<{note: string}>}) {
    const supabase = await createClient();
    const noteID = Number((await params).note);
    const {data, error} = await supabase.from('notes').select('note,created_at').eq('id', noteID).single();
    if(error){
        redirect('/error');
    }
    const date = new Date(data.created_at).toLocaleString();
    const deleteNoteWithID = deleteNote.bind(null, noteID)
    return (
        <main className='flex flex-col items-center p-2'>
            <h1>{data.note}</h1>
            <form action={deleteNoteWithID}>
                <button>Delete this!</button>
            </form>
            <h3>This note was created at {date}</h3>
            <Modal Note={{note: data.note, noteID: noteID}}/>
        </main>
    )
}