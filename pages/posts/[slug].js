import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import DateLabel from "../../components/posts/DateLabel";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const title = data.post.title
  const content = data.post.body
  const datetime = data.post.date

  return (
    <Layout>
      <h1>{title}</h1>
      <DateLabel datetime={data.post.date} />
      <div>
        <TinaMarkdown content={content} />
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection();
  const paths = data.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
