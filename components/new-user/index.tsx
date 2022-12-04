import { signIn, useSession } from "next-auth/client";
import { useUsers } from '@/lib/swr-hooks'

export default function NewUser ({children}) {
    const { users } = useUsers()
    const [session, loading] = useSession();
    const userEmail = session?.user?.email;
    let isNewUser = true;

    if(users){
        users.map((u) => {
            if(u.user_id === userEmail){
              isNewUser = false
            }
        })

        if (isNewUser == true) {
            newUser();
        }
    }

    async function newUser() {
        try {
            const res = await fetch('/api/new-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail,
            }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
        } catch (e) {
            return;
        }
    }

    return (
        <>
            {children}
        </>
    )
}    
