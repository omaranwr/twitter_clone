"use client";
import { createUser } from "@/app/actions";
import { useActionState } from "react";

function SignUpPage() {
  const [state, action, pending] = useActionState(createUser, undefined);
  return (
    <div className="flex flex-col justify-center items-center min-h-svh">
      <h1 className="title">Sign-up</h1>
      <div className="wrapper">
        <form action={action}> 

          {state?.errors?.name && (
            <ul>
              {state.errors.name.map((err, idx) => (
                <li key={idx} className="text-error">{err}</li>
              ))}
            </ul>
          )}
          <input type="text" placeholder="Name" name="name" 
          className="input"/>

          {state?.errors?.username && (
            <ul>
              {state.errors.username.map((err, idx) => (
                <li key={idx} className="text-error">{err}</li>
              ))}
            </ul>
          )}
          <input type="text" placeholder="Username" name="username" 
          className="input"/>

          {state?.errors?.password && (
            <ul>
              {state.errors.password.map((err, idx) => (
                <li key={idx} className="text-error">{err}</li>
              ))}
            </ul>
          )}
          <input type="password" placeholder="Password" name="password" 
          className="input"/>

          <button type="submit" disabled={pending} className="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage