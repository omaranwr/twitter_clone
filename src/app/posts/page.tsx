import db from "@/db"
import { post, user } from "@/db/schema"
import { eq } from "drizzle-orm"

async function PostsPage() {
  const res = await db.select()
  .from(post)
  .leftJoin(user, eq(user.id, post.userId)).all()

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {res.map(item => (
          <li key={item.post.id}>
            <p>{item.user?.name}</p>
            <p>{item.post.content}</p>
            <p>{item.post.timestamp}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsPage