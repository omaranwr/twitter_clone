"use client";
import { loginUser } from "@/app/actions"
import { useActionState } from "react";

function LogInPage() {
  const [state, action, pending] = useActionState(loginUser, {});
  return (
    <div className="flex justify-center items-center flex-col min-h-svh">
      <h1 className="title">Log-in</h1>
      <div className="wrapper">
        <form action={action}>
          <input type="text" placeholder="Username" name="username" 
          className="input"/>
          <input type="password" placeholder="Password" name="password" 
          className="input"/>

          {state?.message && (
            <p className="text-error">{state.message}</p>
          )}
          <button type="submit" disabled={pending} className="submit">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LogInPage