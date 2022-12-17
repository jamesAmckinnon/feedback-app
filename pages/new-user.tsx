import { useSession } from "next-auth/client";
import React from "react"
import { useState } from 'react'
import { useUsers } from '@/lib/swr-hooks'
import { useRouter } from 'next/router'
import Profile from 'pages/profile/home'

function NewUser() {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { users } = useUsers();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  let isNewUser = true;
  const router = useRouter();

  if(users){
    users.map((u) => {
        if(u.user_id === userEmail){
          isNewUser = false
        }
    })

    if (isNewUser == true) {
        return ( 
            <div className="flex flex-col w-full h-screen flex items-center justify-center">
                <div className="flex flex-col">
                    <h1 className="text-xl text-prodigyOrange font-semibold">First Name</h1>
                    <input 
                        id="first_name" 
                        type="text" 
                        className="border-b border-black w-200px"
                        maxLength={35} 
                        name="first_name"
                        value={first_name}
                        onChange={ (e) => {setFirstName(e.target.value)}}
                    />
                    <h1 className="text-xl pt-4 text-prodigyOrange font-semibold">Last Name</h1>
                    <input 
                        id="last_name" 
                        type="text" 
                        className="border-b border-black w-200px"
                        maxLength={35} 
                        name="last_name"
                        value={last_name}
                        onChange={ (e) => {setLastName(e.target.value)}}
                    />
                    <button className="flex mt-8 justify-left" onClick={newUser}>
                        Continue &nbsp;&nbsp;{">"}
                    </button>
                </div>
            </div>
        )
    } else {
        return(
            <Profile/>
        )
    }
  } else {
      return (
          <></>
      )
  }
  

  function newUser() {
    addNewUser();
    return(
        <Profile/>
    )
  }

  async function addNewUser() {
    try {
        const res = await fetch('/api/add-new-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userEmail,
            first_name,
            last_name
        }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        router.push("/profile/home");
    } catch (e) {
        return;
    }
  }

} 

export default NewUser