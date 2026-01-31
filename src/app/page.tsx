import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-svh flex flex-col">
      <header className="py-6 bg-foreground text-background">
        <h1 className="text-center text-4xl">Home Page</h1>
      </header>
      <nav className="h-full flex justify-center items-center flex-1">
        <ul className="h-69 flex flex-col justify-between items-center p-10 rounded-lg bg-foreground text-background">
          <li className="text-2xl"><Link href="/post-message">Post a message</Link></li>
          <li className="text-2xl"><Link href="/posts">See posts</Link></li>
        </ul>
      </nav>
    </div>
  )
}
