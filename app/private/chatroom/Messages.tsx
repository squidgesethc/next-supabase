'use client';

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState, useRef } from "react";
import styles from './messages.module.css'
import useUsername from "../username";
import { useRouter } from "next/navigation";
interface Message {
    id: number | null;
    content: string | null;
    user_id: string | null;
    created_at: string | null;
    username: string | null;
}
export function Messages(
    {messages, user}: 
    {messages: Message[], user: User | null}
){
    const supabase = createClient();
    const [messageList, setMessageList] = useState<Message[]>(messages);
    const [username, setUsername] = useState<string | null | undefined>("");
    useEffect(() => {
        
        const channel = supabase.channel('messages_insert').on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table : 'messages'
        }, (payload) => {
            const newMessage = payload.new as Message
            setMessageList([...messageList, newMessage])
        }).subscribe()
        const delete_channel = supabase.channel('messages_delete').on('postgres_changes', {
            event: 'DELETE',
            schema: 'public',
            table : 'messages'
        }, (payload) => {
            const deletedMessage = payload.old as Message
            setMessageList(messageList.filter(message => message.id !== deletedMessage.id))
        }).subscribe()
        return () => {
            supabase.removeChannel(channel)
            supabase.removeChannel(delete_channel)
        }
        
    }, [supabase, messageList, setMessageList])
    useEffect(() => {
        dummy.current?.scrollIntoView({behavior: 'smooth'})
    }, [messageList])
    useEffect(() => {
        const getUsername = async () => {
            const userName = await useUsername();
            setUsername(userName);
        }
        getUsername();
        
    }, [])
    const deleteMessage = async (id: number) => {
        const {error} = await supabase.from('messages').delete().eq('id', id) 
    }
    const getCurrentDate = (date : string | null) => {
        const currentDate = new Date(date ?? "")
        return currentDate.toLocaleString()
    }
    const dummy = useRef<HTMLDivElement>(null);
    const router = useRouter()
    return (
        <>
        <header className={styles.chatheader}>
            <h1 className="text-2xl">Welcome to the Chatroom {username}</h1>
            <button onClick={() => router.back()}>Back</button>
        </header>
        <ul className={styles.chat_room}>
            {
                
                messageList.map(message => 
                    <li key={message.id} className="flex flex-col items-center w-full">
                        <button className={`${styles.message} ${message.user_id === user?.id ? styles.sent : styles.received}`}
                    onClick={() => deleteMessage(message.id!)}>
                        <p className="self-end">{message.content}</p>
                        
                    </button>
                    <p className={`${message.user_id === user?.id ? 'self-end' : 'self-start'}`}>sent at {getCurrentDate(message.created_at)} by {message.user_id === user?.id ? 'You' : message.username}</p>
                    </li>
                )
            }
            <span ref={dummy}></span>
        </ul>
        </>
    )
    
}