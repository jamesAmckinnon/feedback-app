import React from 'react';
import Link from 'next/link';
import { useFeedbackRequests } from '@/lib/swr-hooks'
import { useSession } from "next-auth/client";

function Feedback( name ) {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { feedbackRequests } = useFeedbackRequests(userEmail);


  if(feedbackRequests){
    for(var i = 0 ; i < feedbackRequests.length ; i++){
      feedbackRequests[i].name = name;
    }
  
    return (
      <div className="w-full pt-24">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-3xl text-customGrey2 font-bold">Feedback</h3>
            <Link href={'/profile/new-request'}>
                <img src="/add-icon.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/> 
            </Link>
          </div>
          {feedbackRequests.map((f) => (
              <Link href={{ pathname: '/profile/view-feedback', query: { object: JSON.stringify(f) } }}>
                <div className="w-full flex flex-row justify-between cursor-pointer">
                  {f.request_title}
                  <h3 className="text-2xl pr-1">{'>'}</h3>
                </div>
              </Link>
          ))}
      </div>
    )
  } else {
    return(
      <>
      </>
    )
  }
}

export default Feedback