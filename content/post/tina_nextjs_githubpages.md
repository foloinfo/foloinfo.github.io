---
title: Using tina with nextjs on github pages.
date: '2023-02-24T15:00:00.000Z'
---

Make a tina project for github pages.

Repository should name like `foloinfo.github.io`, use your account name.\
Using the tina project name same as the repository name maybe a good idea.

```
npx create-tina-app@latest
```

See if it works fine on http://localhost:3000 .

```
yarn
yarn dev
```

Follow the steps on [Moving from Local-Mode to Prod-Mode | TinaCMS Docs](https://tina.io/docs/tina-cloud/)  .

1. Sign up to tina cloud
2. Connect with github account
3. Pick a github pages repository
4. Copy your `Client ID` and paste to `.env` as `NEXT_PUBLIC_TINA_CLIENT_ID`
5. Navigate to `Tokens` and create new token, copy\&paste as `TINA_TOKEN`
6. `NEXT_PUBLIC_TINA_BRANCH=main` if not

Next, you need to setup Github Actions, maybe now it's a good time to commit & push to remote.

Reference the official documentation here: [Connecting the site | TinaCMS Docs](https://tina.io/docs/tina-cloud/connecting-site/#option-github-pages)

1. Open your github pages repository settings page (`https://github.com/foloinfo/foloinfo.github.io/settings` for me)
2. Open `Pages` panel and set `Build and deployment` settings to `GithubActions`
3. Select `Next.js` and configure.
4. Open `Secrets and variables` and choose `Actions`
5. Set `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`, `NEXT_PUBLIC_TINA_BRANCH`

In the official documentation, it uses environment variables like `TINA_PUBLIC_CLIENT_ID`.\
I changed those to `NEXT_PUBLIC_TINA_CLIENT_ID` to keep it consistent.

Here is the code for yml file for the github actions.\
[foloinfo.github.io/nextjs\_tina.yml at main · foloinfo/foloinfo.github.io](https://github.com/foloinfo/foloinfo.github.io/blob/main/.github/workflows/nextjs_tina.yml#L76)

Next, you need to modify tina project code to run `yarn next export`, since tina's default example uses `getServerSideProps` and it's not comatible with static site export.

You need to change it to `getStaticProps` and `getStaticPaths`.

`/pages/[slug].js`
code: [foloinfo.github.io/\[slug\].js at main · foloinfo/foloinfo.github.io](https://github.com/foloinfo/foloinfo.github.io/blob/main/pages/%5Bslug%5D.js#L22)

```javascript
export const getStaticPaths = async () => {
  const { data } = await client.queries.pageConnection();
  const paths = data.pageConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const { data, query, variables } = await client.queries.page({
    relativePath: `${params.slug}.mdx`,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
```

Now, you should be able to run `yarn build && yarn next export` in the local env.

You can push to github with main branch and it should build & release your github pages.
