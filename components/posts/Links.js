import Link from "next/link";
import DateLabel from "./DateLabel";

const PostLinks = ({
  posts,
})=> {

  return (
    <div>
      {posts.map((post) => (
        <div key={post.node.id} style={{
          marginBottom: '1rem',
        }}>
          <Link href={`/posts/${post.node._sys.filename}`}>
            <a style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              {post.node.title}
            </a>
          </Link>
          <DateLabel datetime={post.node.date} />
        </div>
      ))}
    </div>
  )
}

export default PostLinks
