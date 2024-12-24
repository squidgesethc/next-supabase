import { createClient } from "@/utils/supabase/server";
import { sendMessage } from "./actions";
import { Messages } from "./Messages";
import styles from './messages.module.css'
async function useChatMessages(){
    const supabase = await createClient();
    const {data, error} = await supabase.from('messages').select('*').order('created_at');
    return data ?? []
}

export default async function ChatroomPage() {
    const messages = await useChatMessages();
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    return ( 
    <main className="flex flex-col items-center gap-0">

        <Messages messages={messages} user={user}/>
            <form className={styles.chat_form}>
                <input className={styles.chat_input} type="text" name="message" id="message" placeholder="What would you like to tell the world?"/>
                <button formAction={sendMessage} className={styles.chat_send}>Send</button>
            </form>
            
    </main>)
}