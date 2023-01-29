import React from 'react';
import Link from 'next/link';
import {useFeedbackRequests} from '@/lib/swr-hooks'
import {useSession} from "next-auth/client";
import {useState} from 'react'

function Feedback(name) {
    const [session] = useSession();
    const userEmail = session?.user?.email;
    const {feedbackRequests} = useFeedbackRequests(userEmail);
    const [deleteBool, setDelete] = useState(false)

    function toggleDelete(toggle_delete) {
        if (!toggle_delete) {
            setDelete(true)
        } else {
            setDelete(false)
        }
    }

    async function deleteHandler(request_id) {
        document.getElementById(`${request_id}`).style.display = "none";
        let res = await fetch(`/api/delete-feedback-request?request_id=${request_id}`, {method: 'DELETE'})
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
    }


    if (feedbackRequests) {
        for (let i = 0; i < feedbackRequests.length; i++) {
            feedbackRequests[i].name = name;
        }

        return (
            <div className="w-full pt-24">
                <div className="flex flex-row w-full items-center">
                    <div className="flex flex-row w-full pr-6 justify-between">
                        <h3 className="text-3xl text-customGrey2 font-bold">Feedback Requests</h3>
                        <Link href={'/profile/new-request'}>
                            <img src="/add-icon.svg" style={{height: "auto", width: 30, cursor: 'pointer'}}/>
                        </Link>
                    </div>
                    <a className="flex items-center mr-1" onClick={() => toggleDelete(deleteBool)}>
                        <img src="/edit-icon.svg" style={{height: 24, width: 20, cursor: 'pointer'}}/>
                    </a>
                </div>
                {feedbackRequests.map((f) => (
                    <div className="flex flex-row w-full pt-6" id={f.request_id}>
                        <Link className="w-full" href={{pathname: '/profile/view-feedback', query: {object: JSON.stringify(f)}}}>
                            <div className="flex w-full justify-between text-lg cursor-pointer border-customGrey6 border-b text-prodigyOrange font-bold">
                                {f.request_title}
                                <h3 className="text-customGrey2 pr-2 font-light">{'>'}</h3>
                            </div>
                        </Link>
                        {deleteBool &&
                            <a onClick={() => deleteHandler(f.request_id)} className="flex deleteEntry ml-4 mr-2 items-center">
                                <img src="/delete-icon.svg" style={{height: 24, width: 20, cursor: 'pointer'}}/>
                            </a>
                        }
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default Feedback