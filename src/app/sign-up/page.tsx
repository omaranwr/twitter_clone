import db from "@/db"
import { user } from "@/db/schema"
import { redirect } from "next/navigation"

function SignUpPage() {
  const handleSubmit = async (formData: FormData) => {
    'use server'
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    db.insert(user).values({ name, username, password }).run()
    redirect('/')
  }
  return (
    <>
      <h1>Sign-up</h1>
      <form action={handleSubmit}>
        <input type="text" placeholder="Name" name="name" />
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default SignUpPage