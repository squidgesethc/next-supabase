import { createClient } from "@/utils/supabase/server";
import Link from "next/link";



export default async function Home() {
  const supabase = await createClient();
  const {data : {user}} = await supabase.auth.getUser();
  return (
    <>
      <header className="flex flex-col align-center">
        <h1 className="text-center">Welcome To My App, Hope You are having a brilliant day!</h1>
        <h2 className="text-center">Look how many fake features we have</h2>
        {user
        ?<h1 className="text-center"><Link href="/private">Go To your page</Link></h1> 
        : <h1 className="text-center"><Link href="/login">Login!</Link></h1>}
      </header>
    </>
  );
}
