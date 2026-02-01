import db from "@/db"
import { post, user } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { connection } from "next/server"

async function PostsPage() {

  await connection()

  const res = await db.select()
  .from(post)
  .leftJoin(user, eq(user.id, post.userId))
  .orderBy(desc(post.timestamp)).all()

  return (
    <div className="flex flex-col items-center pt-[20vh]">
      <h1 className="title">Posts</h1>
      <div className="wrapper">
        <ul className="border border-foreground rounded-lg p-2 flex flex-col gap-5">
          {res.map(item => (
            <li key={item.post.id}>
              <p className="opacity-85">{item.user!.name}</p>
              <p className="text-xl">{item.post.content}</p>
              <p className="text-xs opacity-75">{item.post.timestamp}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostsPage