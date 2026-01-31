"use client";
import { loginUser } from "@/app/actions"
import { useActionState } from "react";

function LogInPage() {
  const [state, action, pending] = useActionState(loginUser, {});
  return (
    <>
      <h1>Log-in</h1>
      <form action={action}>
        <input type="text" placeholder="Username" name="username" 
        className="block"/>
        <input type="password" placeholder="Password" name="password" 
        className="block"/>

        {state?.message && (
          <p className="text-error">{state.message}</p>
        )}
        <button type="submit" disabled={pending}>Sign Up</button>
      </form>
    </>
  )
}

export default LogInPage