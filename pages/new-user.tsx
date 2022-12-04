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
    console.log("here")
    if (isNewUser == true) {
        return ( 
            <div className="w-full h-full flex items-center">
                <div>
                    <input 
                        id="first_name" 
                        type="text" 
                        className="border-b border-black mx-5 w-130px pl-2" 
                        placeholder="First Name"
                        maxLength={35} 
                        name="first_name"
                        value={first_name}
                        onChange={ (e) => {setFirstName(e.target.value)}}
                    />
                    <input 
                        id="last_name" 
                        type="text" 
                        className="border-b border-black mx-5 w-130px pl-2" 
                        placeholder="Last Name"
                        maxLength={35} 
                        name="last_name"
                        value={last_name}
                        onChange={ (e) => {setLastName(e.target.value)}}
                    />
                    <button onClick={newUser}>
                        Continue
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