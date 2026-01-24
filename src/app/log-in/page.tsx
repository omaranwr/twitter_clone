import { loginUser } from "@/app/actions"

function LogInPage() {

  return (
    <>
      <h1>Log-in</h1>
      <form action={loginUser}>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default LogInPage