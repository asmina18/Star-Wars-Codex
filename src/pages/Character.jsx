import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import { allCharacters } from "../queries/getAllCharacters"; 


import { allCharacters } from "../queries/getAllCharacters";


export const Character = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allCharacters"],
    queryFn: async () =>
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        allCharacters
      ),
  });

  if (isLoading) {
    return <div>Loading......</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
   
      <ul>
        {data.allPeople.people.map((person) => (
          <li key={person.id}>
            <p><strong>Name:</strong> {person.name}</p>
            <p><strong>Birth Year:</strong> {person.birthYear}</p>
            <p><strong>Gender:</strong> {person.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
