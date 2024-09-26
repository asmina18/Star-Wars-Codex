import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { allCharacters } from "../queries/getAllCharacters"; 
import styles from "./Character.module.scss"; 
import { BackToTop } from "../components/BackToTop/BackToTop";

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
    return <div className={styles.loading}>Loading......</div>; 
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>; 
  }

  return (
    <div className={styles.characterContainer}>
      <h1>Star Wars Characters</h1>
      <BackToTop/>
      <ul>
        {data.allPeople.people.map((person) => (
          <li key={person.id} className={styles.characterCard}> 
            <p><strong>Name:</strong> {person.name}</p>
            <p><strong>Birth Year:</strong> {person.birthYear}</p>
            <p><strong>Gender:</strong> {person.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
