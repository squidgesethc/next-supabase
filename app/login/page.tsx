import { JSX } from 'react'
import {login, signUp} from './actions'

function HandleError({error} : {error: string | null}){
    if(error === null || error === undefined || error === '') return <></>
    const cleanError = error.replace('AuthApiError:', '')
    return <p>{cleanError}</p>
}

export default  async function LoginPage({searchParams} : 
    {searchParams : Promise<{error: string | null}>}) {
    const sp = await searchParams
    return (
        <main className="flex flex-col items-center m-3">
        <form className='flex flex-col gap-3 w-72 justify-center'>
            <label htmlFor="email">Email:</label>
            <input id="email"type='email' name="email" className='text-background p-3 ' required/>
            <label htmlFor="password">Password:</label>
            <input id="password"type='password' name="password" className='text-background p-3 ' required/>
            <button formAction={login}>Login</button>
            <button formAction={signUp}>Sign Up</button>
        </form>
        <HandleError error={sp.error}/>
        </main>
    )
}