import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { allFilms } from "../queries/getAllFilms";
import { Link } from "react-router-dom";

export const Films = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () =>
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        allFilms
      ),
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading......</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {data.allFilms.films.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`home/${item.id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
