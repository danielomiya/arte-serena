import { useGetUserFeedQuery } from "../../graphql/feed.generated";
import { message } from "antd";
import { Message } from "../shared/Message";
import { BottomNavBar } from "../shared/BottomNavBar";
import { Post } from "../../types.generated";
import { Result } from "antd-mobile";

const notEmpty = <TValue,>(value: TValue): value is TValue =>
  value !== undefined && value !== null;

const Card = ({ post }: { post: Partial<Post> }) => {
  return (
    <article>
      <header>
        <span>{post.author?.name || "Desconhecido"}</span>
      </header>
      <section>{post.title}</section>
    </article>
  );
};

export const HomePage = () => {
  const { data, error, loading } = useGetUserFeedQuery({
    variables: { offset: 0, limit: 25 },
  });

  if (error) {
    message.error({
      content: "Ocorreu um erro ao buscar o feed!",
      duration: 3,
    });
  }

  return (
    <>
      {!data && loading && (
        <Message type="loading" content="Carregando feed..." />
      )}
      {data?.getUserFeed.posts.length === 0 && (
        <Result
          title="Parece que seu feed está vazio :("
          description="Siga outras pessoas para ver as atividades delas aqui!"
          status="waiting"
        />
      )}
      {data?.getUserFeed.posts.reduce((acc, cur) => {
        if (!notEmpty(cur)) return acc;
        acc.push(<Card post={cur} key={cur.id} />);
        return acc;
      }, [] as Array<JSX.Element>)}
      <BottomNavBar />
    </>
  );
};
