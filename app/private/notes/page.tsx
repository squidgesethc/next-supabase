import useUsername from '@/app/private/username';
import { createClient } from '@/utils/supabase/server';
import { addNote, deleteNote } from './actions';
import { Note } from './note';
async function useNotes(){
    const supabase = await createClient();
    const {data, error} = await supabase.from('notes').select('id,note').order('id');
    return data ?? []

}

export default async function NotePage() {
    const notes = await useNotes();
    const username = await useUsername();
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    return <>
        <main className='flex flex-col items-center'>
            <h1>Notes for {username ? username : user?.email}</h1>
            <ul className='flex flex-col items-center'>
                {
                notes.map(note => 
                //<div>
                    //<li key={note.id} className='border p-2 m-2'>{note.note}</li>
                    //<form>
                        //<button >Delete this!</button>
                        //<input type='hidden' name='noteID' value={note.id}/>
                    //</form>
                //</div>
                <Note note={note.note} noteID={note.id} deleteNote={deleteNote} />
            )
                }
            </ul>
            <form className='flex flex-col items-center gap-3'>
                <label htmlFor='note'>Add a note</label>
                <input id='note' name='note' type='text' className='text-background'/>
                <button formAction={addNote}>Add A Note!</button>
            </form>
        </main>
    </>
}