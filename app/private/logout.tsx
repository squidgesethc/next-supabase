"use client";
import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export function LogoutButton() {
  return <button onClick={logout} className="duration-300 bg-slate-200 rounded-xl text-background hover:bg-slate-50 hover:rounded-2xl active:bg-slate-400 px-10 py-4 m-3">Logout</button>;
}