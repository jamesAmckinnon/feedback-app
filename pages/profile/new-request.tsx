import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/client";
import { useUsers } from '@/lib/swr-hooks'
import { useState } from 'react'
import { useRouter } from 'next/router'

function NewRequest() {
    const { users } = useUsers()
    const [session] = useSession()
    const userEmail = session?.user?.email
    const [request_title, setRequestTitle] = useState('');
    const [request_note, setRequestNote] = useState('');
    const [inp, setInp] = useState("");
    const router = useRouter()

  
    return(
        <div className="pt-4 px-6">
            <Link href={'/profile/home'}>
                <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                    Back
                </h3>
            </Link>
            <div className="w-full h-full pt-8 items-center">
                <form className="flex flex-col" onSubmit={submitHandler}>
                    <h1 className="text-xl text-prodigyOrange font-semibold">Request Title</h1>
                    <input
                        id="request_title" 
                        type="text" 
                        className="border-b border-gray-500 w-200px"
                        maxLength={45}
                        name="request_title"
                        value={request_title}
                        onChange={ (e) => {setRequestTitle(e.target.value)}}
                    />
                    <h1 className="pt-10 text-prodigyOrange font-bold">Details</h1>
                    <textarea  
                        id="request_note" 
                        className="border-2 border-gray-500 mt-3 rounded-md w-full"
                        maxLength={150}
                        name="request_note"
                        value={request_note}
                        onChange={ (e) => {setRequestNote(e.target.value)}}
                    />
                    <div className="w-full flex pt-3 text-prodigyOrange font-bold justify-start">
                        <button onClick={submitHandler}>
                            Create
                        </button>
                    </div>
                </form>
                {/*<form onSubmit={handleSubmit}>*/}
                {/*    <input*/}
                {/*        id="request_title"*/}
                {/*        type="text"*/}
                {/*        className="border-b border-gray-500 w-200px"*/}
                {/*        maxLength={45}*/}
                {/*        name="request_title"*/}
                {/*        value={inp}*/}
                {/*        onChange={(e) => setInp(e.target.value)}*/}
                {/*    />*/}
                {/*    <input type='submit'/>*/}
                {/*</form>*/}
            </div>
        </div>
    )

   // async function handleSubmit(event){
   //      event.preventDefault()
   //      const res = await fetch('/api/create', {
   //          method: 'POST',
   //          body: JSON.stringify({
   //              content: inp
   //          })
   //      })
   //      const json = await res.text()
   //      console.log(json)
   //      if (!res.ok) throw Error(json)
   //  }

    async function submitHandler(e) {
        e.preventDefault()
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
            router.push('/profile/home')
        } else {
            document.getElementById("request_title").style.backgroundColor = "#ffd5b8";
            document.getElementById("request_note").style.backgroundColor = "#ffd5b8";
        }
      }

}
  

export default NewRequest