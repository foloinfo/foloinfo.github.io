import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import PostLinks from "../../components/posts/Links";

export default function PostList(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const postsList = data.postConnection.edges;

  return (
    <Layout>
      <h1>Posts</h1>
      <PostLinks posts={postsList} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.postConnection();

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
