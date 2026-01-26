import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-svh flex flex-col">
      <header className="py-6 bg-blue-400 dark:bg-amber-800">
        <h1 className="text-center text-4xl">Home Page</h1>
      </header>
      <nav className="h-full flex justify-center items-center flex-1">
        <ul className="h-69 flex flex-col justify-between items-center 
        bg-blue-400 dark:bg-amber-800 p-10 rounded-lg">
          <li className="text-2xl"><Link href="/post-message">Post a message</Link></li>
          <li className="text-2xl"><Link href="/posts">See posts</Link></li>
        </ul>
      </nav>
    </div>
  )
}
