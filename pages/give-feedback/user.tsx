import Link from "next/link";
import React from "react";
import ProfileImage from '@/components/profile-image'
import Seeking from '@/components/seeking'
import SelectAreasForGrowth from '@/components/select-areas-for-growth'
import {signOut, useSession} from "next-auth/client";
import { useName } from '@/lib/swr-hooks'
import Router from 'next/router'
import { withRouter } from 'next/router';

function User( { router: { query } } ) {
    const [session] = useSession();
    const userEmail = session?.user?.email;
    const user_id = JSON.parse(query.user_id);
    const name = useName(user_id);


    if(!name.isLoading){
        return (
            <div className="py-4 px-6">
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-row w-full justify-between">
                        <Link href={'/give-feedback/select-user'}>
                            <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                                Back
                            </h3>
                        </Link>
                        <div className="px-2 text-customGrey3 flex items-center">
                            <button className="text-xl py-5px" onClick={() => { signOut() }}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <ProfileImage/>
                    <div className="w-full text-2xl pt-4 text-customGrey6 flex font-semibold justify-center">
                        {name.name[0].first_name}
                        {' '}
                        {name.name[0].last_name}
                    </div>
                    <Seeking user_id={user_id}/>
                    <SelectAreasForGrowth user_id={user_id}/>
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }        
}
  

export default withRouter(User);