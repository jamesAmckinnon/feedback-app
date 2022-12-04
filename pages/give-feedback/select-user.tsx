import Link from "next/link";
import React from "react";
import { useUsers } from '@/lib/swr-hooks'

function SelectUser() {
    const { users } = useUsers()
  
    if(users){
        return (
            <div className="pt-4 px-6">
                <Link href={'/profile/home'}>
                    <h3 className="text-xl py-5px text-customGrey3 cursor-pointer" >
                        Home
                    </h3>
                </Link>
                {users.map((u) => (
                    <>
                        <div >
                            <Link href={{ pathname: '/give-feedback/user', query: { user_id: JSON.stringify(u.user_id) } }}>
                                {u.user_id}
                            </Link>
                        </div>
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
  

export default SelectUser