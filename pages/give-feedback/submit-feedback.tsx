import Link from "next/link";
import React from "react";
import { useName } from '@/lib/swr-hooks'
import { useState } from 'react'
import { useSession } from "next-auth/client";
import Router from 'next/router'
import { withRouter } from 'next/router';

function SubmitFeedback( { router: { query } } ) {
    const object = JSON.parse(query.object);
    const [session] = useSession()
    const userEmail = session?.user?.email
    const userName = useName(userEmail);
    const [feedback_submission, setFeedbackSubmission] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const receiveEmail = object.user_id;

    if(object){
        console.log(receiveEmail)
        object
        return(
            <div className="py-4">
                <Link href={{pathname: '/give-feedback/user', query: {user_id: JSON.stringify(receiveEmail)}}}>
                    <h3 className="text-xl py-5px px-6 text-customGrey3 cursor-pointer" >
                        Back
                    </h3>
                </Link>
                {!submitted &&
                    <div className="pt-8 px-6">
                        <h1 className="text-xl text-prodigyOrange font-semibold">Request</h1>
                        <h3 className="text-customGrey7">{object.request_title}</h3>
                        <h1 className="pt-2 text-prodigyOrange font-bold">Details</h1>
                        <h3 className="text-customGrey7">{object.request_note}</h3>
                        <div className="w-full h-full pt-12 items-center">
                            <div className="flex w-full flex-col" >
                                <textarea  
                                    id="feedback_submission" 
                                    className="border-2 border-customGrey6 rounded-md w-full"
                                    maxLength={150} 
                                    name="feedback_submission"
                                    value={feedback_submission}
                                    onChange={ (e) => {setFeedbackSubmission(e.target.value)}}
                                />
                                <div className="w-full flex pt-4 text-prodigyOrange font-bold justify-start">
                                    <button onClick={submitHandler}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                } 
                {submitted &&
                    <div className="text-2xl px-6 pt-8 mb text-prodigyOrange font-semibold">
                        Thank you for your feedback!
                    </div>
                }
        </div>
        )
    } else {
        return (
            <>
            </>
        )
    }

    async function submitHandler(e) {
        if(feedback_submission != '' ){
            let request_id = object.request_id;
            let first_name = userName.name[0].first_name;
            let last_name = userName.name[0].last_name;
            console.log(first_name, last_name);
            try {
            const res = await fetch('/api/add-feedback-submit', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request_id,
                    userEmail,
                    receiveEmail,
                    feedback_submission,
                    first_name,
                    last_name,
                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            else setSubmitted(true)
            } catch (e) {
                throw Error(e.message)
            }
        } else {
            document.getElementById("feedback_submission").style.backgroundColor = "#f4afa4";
        }
      }

}
  

export default withRouter(SubmitFeedback);