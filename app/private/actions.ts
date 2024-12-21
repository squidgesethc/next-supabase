'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function addUsername(formData:FormData) {
    const supabase = await createClient();
    const username = formData.get("username") as string;
    const {error} = await supabase.from('userNames').insert({user_name: username})
    if(error){
        console.error(error)
    }
    revalidatePath("/private", 'layout')
}