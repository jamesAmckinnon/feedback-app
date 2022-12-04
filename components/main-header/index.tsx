import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/client";

function MainHeader( ) {
  const [session, loading] = useSession();
  const path = document.location.pathname


  return (
    <div className="mainNav pt-4 px-6">
      <div className="flex w-full justify-between items-center">
          <div className="flex flex-row w-full justify-between">
            <Link href={'/give-feedback/select-user'}>
              <h3 className="text-xl py-5px text-customGrey3 cursor-pointer">Give Feedback</h3>
            </Link>
            <div className="px-2 text-customGrey3 flex items-center">
              <button className="text-xl py-5px" onClick={() => { signOut() }}>
                Sign Out
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MainHeader