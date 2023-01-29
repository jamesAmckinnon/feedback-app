import Link from "next/link";
import React from "react";
import { useUsers } from '@/lib/swr-hooks'
import {signOut, useSession} from "next-auth/client";

function SelectUser() {
    const [session] = useSession();
    const { users } = useUsers()
    const userEmail = session?.user?.email;
  
    if(users){
        return (
            <div className="pt-4 px-6">
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-row w-full justify-between">
                        <Link href={'/profile/home'}>
                            <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                                Home
                            </h3>
                        </Link>
                        <div className="text-customGrey3 flex items-center">
                            <button className="text-xl py-5px" onClick={() => { signOut() }}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
                {users.map((u) => {
                    if (u.user_id != userEmail) {
                    return (
                            <Link href={{pathname: '/give-feedback/user', query: {user_id: JSON.stringify(u.user_id)}}}>
                                <div className="flex justify-between cursor-pointer pt-6 border-b border-customGrey6 text-prodigyOrange font-bold">
                                    <h3> {u.first_name} {u.last_name} </h3>
                                    <h3 className="text-customGrey2 pr-2 font-light">
                                        {">"}
                                    </h3>
                                </div>
                            </Link>
                        )
                }})}
            </div>
        )
    } else {
        return (
            <>   
            </>
        )
    }

}
  

export default SelectUser