'use server'
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import {redirect} from 'next/navigation';

export async function addNote(formData: FormData){
    const supabase = await createClient();
    const data = {
        note: formData.get("note") as string,
    }
    const {error} = await supabase.from('notes').insert(data)
    if (error){
        console.error(error)
        redirect('/error')
    }
    revalidatePath("/private/notes", 'layout')
}
export async function deleteNote(noteID: number, formData: FormData){
    const supabase = await createClient();
    const {error} = await supabase.from('notes').delete().eq('id', noteID)
    if (error){
        console.error(error)
        redirect('/error')
    }
    revalidatePath("/private/notes", 'layout')
}