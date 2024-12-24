import { Database } from "@/database.types";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
export async function updateSession(request: NextRequest){
    let supabaseResponse = NextResponse.next({request});
    const supabase = createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies : {
                getAll(){
                    return request.cookies.getAll()
                },
                setAll(cookies){
                    cookies.forEach(({name, value}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({request})
                    cookies.forEach(({name, value, options}) => supabaseResponse.cookies.set(name, value, options))
                }
            }
        })
    const {
        data: {user}
    } = await supabase.auth.getUser()
    //User is not logged in and trying to access a private route
    if (
        !user &&
        request.nextUrl.pathname.startsWith("/private")
    ){
        const url = request.nextUrl.clone()
        url.pathname = "/login"
        return NextResponse.redirect(url.toString())
    }
    //Checks if user has a username and is trying to access a chatroom
    const { data } = await supabase.from('userNames').select('user_name').single()
    const user_name = data?.user_name
    if(!user_name && request.nextUrl.pathname.startsWith("/private/chatroom")){
        const url = request.nextUrl.clone()
        url.pathname = "/private/username"
        return NextResponse.redirect(url.toString())
    }
    //Checks if user is trying to access the username route but already has a username
    if(user_name && request.nextUrl.pathname.startsWith("/private/username")){
        const url = request.nextUrl.clone()
        url.pathname = "/private"
        return NextResponse.redirect(url.toString())
    }
    return supabaseResponse
}




