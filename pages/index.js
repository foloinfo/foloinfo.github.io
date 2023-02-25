import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../.tina/__generated__/client";
import PostLinks from '../components/posts/Links'

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { data: postData } = useTina({
    query: props.postConnection.query,
    variables: props.postConnection.variables,
    data: props.postConnection.data,
  });

  const content = data.page.body;
  return (
    <Layout>
      <TinaMarkdown content={content} />
      <PostLinks posts={postData.postConnection.edges} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  const postConnection = await client.queries.postConnection();

  return {
    props: {
      data,
      query,
      variables,
      postConnection,
    },
  };
};
