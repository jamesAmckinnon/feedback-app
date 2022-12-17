import React from 'react';
import Link from 'next/link';
import { useFeedbackRequests } from '@/lib/swr-hooks'
import { useSession } from "next-auth/client";

function Seeking(user_id) {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { feedbackRequests } = useFeedbackRequests(user_id.user_id);

  if(feedbackRequests){
    Object.assign(feedbackRequests, {user_id:user_id.user_id})
    return (
      <div className="w-full">
          { feedbackRequests.length != 0 &&
            <div className="flex flex-row justify-between items-center  pt-24">
              <h3 className="text-3xl text-customGrey2 font-bold">Seeking Feedback On</h3>
            </div>
          }
          {feedbackRequests.map((u) => (
              <>
              <Link href={{ pathname: '/give-feedback/submit-feedback', query: { object: JSON.stringify(Object.assign(u, {user_id:user_id.user_id})) } }}>
                <div className="flex justify-between text-lg cursor-pointer pt-6 border-b text-prodigyOrange font-bold">
                  {u.request_title}
                  <h3 className="text-customGrey2 pr-2 font-light">{'>'}</h3>
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