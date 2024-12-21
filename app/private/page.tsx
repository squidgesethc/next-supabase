import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "./logout";
import { SupabaseClient } from "@supabase/supabase-js";
import { addUsername } from "./actions";
import Link from "next/link";
async function useUsername(){
  const supabase = await createClient();
  const {data, error} = await supabase.from('userNames').select('user_name').single();
  return data?.user_name 
}

export default async function Home() {
  const supabase = await createClient();
  const {data : {user}} = await supabase.auth.getUser();
  const username = await useUsername();
  return (
    <>
      <header>
        <h1>Hello {user?.email}</h1>
      </header>
      <main>
        <LogoutButton />
        { username ? <h1>Hello {username}</h1> : 
        <form className="flex flex-col gap-3 w-72 align-center">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" name="username" className="text-background p-3" required />
          <button formAction={addUsername}>Add Username</button>
        </form>
        }
        <Link href="/private/notes">Go to Your Notes</Link>
      </main>
    </>
  );
}