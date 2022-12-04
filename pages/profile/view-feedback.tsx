import Link from "next/link";
import React from "react";
import { withRouter } from 'next/router';
import { useFeedback } from '@/lib/swr-hooks'
import { useSession } from "next-auth/client";

function ViewFeedback( { router: { query } } ) {
    const object = JSON.parse(query.object);
    const [session] = useSession()
    const userEmail = session?.user?.email
    const { feedback } = useFeedback(object.request_id);

    
  
    if(feedback && object){
        console.log(feedback, "here");
        return (
            <div className="pt-4 px-6">
                <Link href={'/profile/home'}>
                    <h3 className="text-xl text-customGrey3 cursor-pointer" >
                        Back
                    </h3>
                </Link>
                <h3>{object.request_title}</h3>
                {feedback.map((f) => (
                    <>
                        <h3 className="text-xl py-5px text-customGrey3 cursor-pointer">
                            {f.first_name}
                            {' '}
                            {f.last_name}
                        </h3>
                        <p>{f.feedback_submission}</p>
                    </>
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
  

export default withRouter(ViewFeedback);