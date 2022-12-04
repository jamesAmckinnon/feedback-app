import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/client";
import { useUsers } from '@/lib/swr-hooks'
import { useState } from 'react'

function NewRequest() {
    const { users } = useUsers()
    const [session] = useSession()
    const userEmail = session?.user?.email
    const [request_title, setRequestTitle] = useState('');
    const [request_note, setRequestNote] = useState('');
  
    return(
        <div className="pt-4 px-6">
            <Link href={'/profile/home'}>
                <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                    Back
                </h3>
            </Link>
            <div className="w-full h-full  items-center">
                <form className="flex flex-col" onSubmit={submitHandler}>
                    <input 
                        id="request_title" 
                        type="text" 
                        className="border-b border-black w-130px" 
                        placeholder="Request Title"
                        maxLength={45} 
                        name="request_title"
                        value={request_title}
                        onChange={ (e) => {setRequestTitle(e.target.value)}}
                    />
                    <textarea  
                        id="request_note" 
                        className="border-b border-black w-full" 
                        placeholder="Request Note"
                        maxLength={150} 
                        name="request_note"
                        value={request_note}
                        onChange={ (e) => {setRequestNote(e.target.value)}}
                    />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )

    async function submitHandler(e) {
    
        if(request_title != '' && request_note != ''){
          console.log(request_title, request_note, userEmail);
            try {
            const res = await fetch('/api/add-request', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request_title,
                    request_note,
                    userEmail,
                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            } catch (e) {
            throw Error(e.message)
            }
        } else {
            document.getElementById("request_title").style.backgroundColor = "#f4afa4";
            document.getElementById("request_note").style.backgroundColor = "#f4afa4";
        }
      }

}
  

export default NewRequest