'use server'
import { createClient } from "@/utils/supabase/server";

export default async function useUsername(){
    const supabase = await createClient();
    const {data, error} = await supabase.from('userNames').select('user_name').single();
    return data?.user_name
}