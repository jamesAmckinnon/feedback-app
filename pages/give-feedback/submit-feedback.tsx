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
  
    console.log(userName);

    if(object){
        return(
            <>
                <Link href={'/give-feedback/select-user'}>
                    <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                        Back
                    </h3>
                </Link>
                {!submitted &&
                    <div className="pt-4 px-6">
                        <h3>{object.request_title}</h3>
                        <h3>{object.request_note}</h3>
                        <div className="w-full h-full  items-center">
                            <div className="flex flex-col" >
                                <textarea  
                                    id="feedback_submission" 
                                    className="border-b border-black w-full" 
                                    placeholder="Feedback Submission"
                                    maxLength={150} 
                                    name="feedback_submission"
                                    value={feedback_submission}
                                    onChange={ (e) => {setFeedbackSubmission(e.target.value)}}
                                />
                                <button onClick={submitHandler}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                } 
                {submitted &&
                    <div>
                        Thank you for your feedback!
                    </div>
                }
        </>
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