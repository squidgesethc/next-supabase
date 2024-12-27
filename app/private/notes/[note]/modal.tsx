'use client';

import { createClient } from "@/utils/supabase/client";
import { useRef, useState } from "react";
import styles from './modal.module.css'
export function Modal({Note} : {Note: {note: string, noteID: number}}){
    const modal = useRef<HTMLDialogElement>(null);
    const [formValue, setFormValue] = useState('');
    const updateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value);
    }
    const toggleModal = (open : boolean) => {
        if (open) modal.current?.showModal();
        else modal.current?.close();
    }
    const editNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const supabase =  createClient();
        const { error } = await supabase.from('notes').update({note: formValue}).eq('id', Note.noteID);
        if (error) console.error(error);
    }
    return (
        <>
            <dialog ref={modal} className="backdrop-filter backdrop-blur z-50">
                <button onClick={() => toggleModal(false)}>Close</button>
                <form className="flex flex-col gap-3" onSubmit={editNote}>
                    <label htmlFor="note">Edit note</label>
                    <input type="text" name="note" id="note" value={formValue} onChange={updateHandler} className="text-background p-3 " required/>
                    <button type="submit">Change!</button>
                </form>
            </dialog>
            <button onClick={() => toggleModal(true)}>Edit note!</button>
        </>
    ) 
}