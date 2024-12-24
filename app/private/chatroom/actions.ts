'use server'
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import useUsername from '../username';
export async function sendMessage(formData: FormData){
    const supabase = await createClient();
    const username = await useUsername();
    const data = {
        content: formData.get('message') as string,
        username
    }
    if(data.content.trim() === ""){
        return
    }
    const {error} = await supabase.from('messages').insert(data);
    if(error){
        redirect('/error');
        console.error(error);
    }
}