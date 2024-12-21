import {login, signUp} from './actions'
export default function LoginPage() {
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
        </main>
    )
}