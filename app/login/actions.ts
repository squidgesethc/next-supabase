'use server';
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import {redirect} from 'next/navigation';
export async function login(formData: FormData){
    const supabase = await createClient();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
    }
    console.log(data)
    const {error} = await supabase.auth.signInWithPassword(data)
    if (error){
        console.error(error)
        redirect(`/login?error=${error}`)
    }
    console.log("Should be logged in")
    revalidatePath("/", 'layout')
    redirect("/")


}
export async function signUp(formData: FormData){
    const supabase = await createClient();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
    }
    const {error} = await supabase.auth.signUp(data)
    if (error){
        console.log(error)
        if(error.message.includes('Invalid login')){
            redirect(`/error?error=Invalid login credentials`)
        }
        redirect(`/login?error=${error}`)
    }
    revalidatePath("/", 'layout')
    redirect("/")
}