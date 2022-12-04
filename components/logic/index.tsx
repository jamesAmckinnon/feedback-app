import { signIn, signOut, useSession } from "next-auth/client";


export default function Logic ({children}) {
    const [session, loading] = useSession();

    if(!loading){
        return (
            <>    
                {session && (
                    <>
                        <div className="childCont h-full overflow-y-scroll">
                            {children}
                        </div>
                    </>
                )} 
                {!session && (
                    <>
                        <div className="w-full h-full">          
                            <div className="signInWrapper">
                                <div className="shadow-lg border-4 border-customBlue rounded-md h-280px w-340px flex p-4 justify-center">
                                    <div className="flex flex-col items-center ">
                                        <h1 className="text-3xl font-bold">Feedback App</h1>
                                        <div className="signIn mt-10">
                                            <button className="font-bold border border-black px-2 py-2px hover:border-gray-600 rounded-sm" onClick={() => signIn( 'auth0', { callbackUrl: '/profile/home' } )}>Log In / Sign up {' >'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }   
}
