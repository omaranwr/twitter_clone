"use client";
import { postMessage } from "@/app/actions"
import { useActionState } from "react";

function MessagePostingPage() {
  const [state, action, pending] = useActionState(postMessage, undefined)
  return (
    <div className="flex justify-center items-center h-svh flex-col">
      <h1 className="mb-4 font-bold text-2xl">Post a Message</h1>
      <div className="container">
        <form action={action}>
          <input type="text" name="message" placeholder="What's happening?" autoFocus
          className="block border border-foreground rounded-lg p-1 w-full"/>
          {state?.message && 
          (<p className="text-error">{state.message}</p>)}
          <button type="submit" disabled={pending}
          className="bg-foreground text-background p-2 rounded-lg w-full mt-3">Post</button>
        </form>
      </div>
    </div>
  )
}

export default MessagePostingPage