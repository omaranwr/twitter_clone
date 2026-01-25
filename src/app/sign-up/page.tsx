"use client";
import { createUser } from "@/app/actions";
import { useActionState } from "react";

function SignUpPage() {
  const [state, action, pending] = useActionState(createUser, undefined);
  return (
    <>
      <h1>Sign-up</h1>
      <form action={action}> 

        {state?.errors?.name && (
          <ul>
            {state.errors.name.map((err, idx) => (
              <li key={idx} className="text-red-950 dark:text-red-400">{err}</li>
            ))}
          </ul>
        )}
        <input type="text" placeholder="Name" name="name" 
        className="block"/>

        {state?.errors?.username && (
          <ul>
            {state.errors.username.map((err, idx) => (
              <li key={idx} className="text-red-950 dark:text-red-400">{err}</li>
            ))}
          </ul>
        )}
        <input type="text" placeholder="Username" name="username" 
        className="block"/>

        {state?.errors?.password && (
          <ul>
            {state.errors.password.map((err, idx) => (
              <li key={idx} className="text-red-950 dark:text-red-400">{err}</li>
            ))}
          </ul>
        )}
        <input type="password" placeholder="Password" name="password" 
        className="block"/>

        <button type="submit" disabled={pending}>Sign Up</button>
      </form>
    </>
  )
}

export default SignUpPage