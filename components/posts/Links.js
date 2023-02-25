import Link from "next/link";

const PostLinks = ({
  posts,
})=> {

  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.node.id}>
          <Link href={`/posts/${post.node._sys.filename}`}>
            <a style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
            {post.node.title}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PostLinks
