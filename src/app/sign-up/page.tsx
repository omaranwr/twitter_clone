import { createUser } from "@/app/actions";

function SignUpPage() {
  return (
    <>
      <h1>Sign-up</h1>
      <form action={createUser}>
        <input type="text" placeholder="Name" name="name" />
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default SignUpPage