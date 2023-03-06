import Link from 'next/link'
import Head from 'next/head'

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: '5vw',
      }}
    >
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
        {' | '}
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </header>
      <main>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            maxWidth: '800px',
            width: '-webkit-fill-available',
          }}>
            {props.children}
          </div>
        </div>
      </main>
    </div>
  )
}
