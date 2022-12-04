import React from 'react';
import Link from 'next/link';
import { useFeedbackRequests } from '@/lib/swr-hooks'
import { useSession } from "next-auth/client";

function Seeking( ) {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { feedbackRequests } = useFeedbackRequests(userEmail);

  if(feedbackRequests){
    console.log(feedbackRequests, "seeking2");
    return (
      <div className="w-full pt-24">
          <div className="flex flex-row justify-between items-center">
              <h3 className="text-3xl text-customGrey2 font-bold">Seeking Feedback On</h3>
          </div>
          {feedbackRequests.map((u) => (
              <>
              <Link href={{ pathname: '/give-feedback/submit-feedback', query: { object: JSON.stringify(u) } }}>
                
                <div className="w-full flex flex-row justify-between cursor-pointer">
                  {u.request_title}
                  {u.request_id}
                  <h3 className="text-2xl pr-1">{'>'}</h3>
                </div>
              </Link>
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

export default Seeking