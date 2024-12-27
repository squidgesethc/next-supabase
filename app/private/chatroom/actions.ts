'use server'
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import useUsername from '../username';
export async function sendMessage(formData: FormData){
    const supabase = await createClient();
    const username = await useUsername();
    const fiveSecondsAgo = new Date(Date.now() - 5000);
    const fiveSecondsAgoPostgres = fiveSecondsAgo.toISOString();
    const {data: {user}} = await supabase.auth.getUser();
    const id = user?.id as string
    const {data: messages } = await supabase.from('messages').select('*').eq('user_id', id).gt('created_at', fiveSecondsAgoPostgres);
    console.log(messages)
    if(messages && messages.length > 5){
        console.log("Too many messages")
        return
    }
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
    }
}