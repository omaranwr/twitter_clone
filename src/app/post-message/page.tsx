"use client";
import { postMessage } from "@/app/actions"
import { useActionState } from "react";

function MessagePostingPage() {
  const [state, action, pending] = useActionState(postMessage, undefined)
  return (
    <>
      <h1>Post a Message</h1>
      <form action={action}>
        <textarea name="message" placeholder="What's happening?" 
        className="block"/>
        <button type="submit" disabled={pending}>Post</button>
      </form>
    </>
  )
}

export default MessagePostingPage