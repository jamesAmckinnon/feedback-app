import { useSession } from "next-auth/client";
import React from "react"
import { useState } from 'react'
import { useUsers } from '@/lib/swr-hooks'
import { useRouter } from 'next/router'
import Profile from 'pages/profile/home'

function Home() {
    const [dat, setData] = useState([])
    const [inp, setInp] = useState("")

    useEffect(() => {
        fetch('https://flask-api.herokuapp.com/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => console.log(data))
    },[])

    async function handleSubmit(event){
        event.preventDefault()
        const res = await fetch('https://flask-api.herokuapp.com/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content: inp
            })
        })
        const json = await res.text()
        console.log(json)
        if (!res.ok) throw Error(json.message)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    id="request_title"
                    type="text"
                    className="border-b border-gray-500 w-200px"
                    maxLength={45}
                    name="request_title"
                    value={inp}
                    onChange={(e) => setInp(e.target.value)}
                />
                <input type='submit'/>
            </form>
        </>
    )

}

export default NewUser