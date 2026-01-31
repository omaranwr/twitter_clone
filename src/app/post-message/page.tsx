"use client";
import { postMessage } from "@/app/actions"
import { useActionState } from "react";

function MessagePostingPage() {
  const [state, action, pending] = useActionState(postMessage, undefined)
  return (
    <div className="flex justify-center items-center min-h-svh flex-col">
      <h1 className="title">Post a Message</h1>
      <div className="wrapper">
        <form action={action}>
          <input type="text" name="message" placeholder="What's happening?" autoFocus
          className="input"/>
          {state?.message && 
          (<p className="text-error">{state.message}</p>)}
          <button type="submit" disabled={pending}
          className="submit-button">Post</button>
        </form>
      </div>
    </div>
  )
}

export default MessagePostingPage