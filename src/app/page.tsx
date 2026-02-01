import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-svh flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-bold mb-6">Home Page</h1>
      <nav className="h-full flex justify-center items-center">
        <ul className="flex flex-col gap-3 items-center p-10 rounded-lg">
          <li className="text-2xl px-4 py-2 border border-foreground rounded-lg hover:bg-foreground hover:text-background"><Link href="/post-message">Post a message</Link></li>
          <li className="text-2xl px-4 py-2 border border-foreground rounded-lg hover:bg-foreground hover:text-background"><Link href="/posts">See posts</Link></li>
        </ul>
      </nav>
    </div>
  )
}
