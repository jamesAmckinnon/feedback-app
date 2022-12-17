import { useSession } from "next-auth/client";
import Link from "next/link";
import MainHeader from '@/components/main-header'
import ProfileImage from '@/components/profile-image'
import Feedback from '@/components/feedback'
import AreasForGrowth from '@/components/areas-for-growth'
import { useName } from '@/lib/swr-hooks'
import React from "react"
import { useState } from 'react'

function Profile() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const name = useName(userEmail);
  
  if(!name.isLoading){
    console.log(name);
      return (
        <>
          <MainHeader/>
          <div className="p-6">
            <ProfileImage/>
            <div className="w-full text-2xl pt-4 flex text-customGrey6 font-semibold justify-center">
                {name.name[0].first_name}
                {' '}
                {name.name[0].last_name}
            </div>
            <Feedback first_name = {name.name[0].first_name} last_name = {name.name[0].last_name} />
            <AreasForGrowth/>
          </div>
        </>
      )
     
  } else {
    return (
      <>
      </>
    )
  }


  async function submitHandler(e) {
    
    if(first_name != '' && last_name != ''){
      console.log(first_name, last_name, userEmail);
        try {
        const res = await fetch('/api/add-name', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              first_name,
              last_name,
              userEmail,
            }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        } catch (e) {
        throw Error(e.message)
        }
    } else {
        document.getElementById("first_name").style.backgroundColor = "#f4afa4";
        document.getElementById("last_name").style.backgroundColor = "#f4afa4";
    }
  }
}
  

export default Profile