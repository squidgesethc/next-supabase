'use server';
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function addUsername(formData: FormData) {
    const data = {
        user_name: formData.get("user_name") as string,
    }
    const supabase = await createClient();
    const { error } = await supabase.from("userNames").insert(data)
    if (error) {
        console.error(error)
        redirect("/error")
    }
    redirect("/private")
}