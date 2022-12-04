import Link from "next/link";
import React from "react";
import ProfileImage from '@/components/profile-image'
import Seeking from '@/components/seeking'
import SelectAreasForGrowth from '@/components/select-areas-for-growth'
import { useSession } from "next-auth/client";
import { useName } from '@/lib/swr-hooks'
import Router from 'next/router'
import { withRouter } from 'next/router';

function User( { router: { query } } ) {
    const [session] = useSession();
    const userEmail = session?.user?.email;
    const name = useName(userEmail);
    const user_id = JSON.parse(query.user_id);
    

    if(!name.isLoading){
        return (
            <div className="py-4 px-6">
                <Link href={'/give-feedback/select-user'}>
                    <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                        Back
                    </h3>
                </Link>
                <div>
                    <ProfileImage/>
                    <div className="w-full text-2xl pt-4 flex justify-center">
                        {name.name[0].first_name}
                        {' '}
                        {name.name[0].last_name}
                    </div>
                    <Seeking/>
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