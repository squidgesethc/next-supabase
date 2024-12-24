import { addUsername } from "./actions"
export default function Username(){
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1>A username is required to access many features of this website!</h1>
            <form className="flex flex-col space-y-4">
                <label htmlFor="user_name">Enter your username below:</label>
                <input type="text" name="user_name" required className="text-background"/>
                <button formAction={addUsername}>Submit</button>
            </form>
        </main>
    )
}