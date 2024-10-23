import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { allCharacters } from "../queries/getAllCharacters";
import styles from "./Character.module.scss";
import { BackToTop } from "../components/BackToTop/BackToTop";
import { Helmet } from "react-helmet-async";

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

    <>
          {/* Helmet bruges til at tilføje meta-tags for bedre SEO og deling på sociale medier */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Star Wars Karakterer</title>
        <meta name="description" content="Udforsk ikoniske karakterer fra Star Wars-universet. Få detaljeret information om dine yndlingskarakterer, inklusive deres navne, fødselsår og køn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Star Wars, karakterer, Star Wars karakterer, sci-fi, Star Wars univers, karakter detaljer" />
        <meta property="og:url" content="https://star2024.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Star Wars Karakterer" />
        <meta property="og:description" content="Udforsk ikoniske karakterer fra Star Wars-universet. Få detaljeret information om dine yndlingskarakterer, inklusive deres navne, fødselsår og køn." />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/097622fa-fc08-44f2-9970-e0c8ea504f46.jpg?token=R4aBS23lHiff1aLYiQYgLGO_o5awlW7V5Usqd8B-yms&height=800&width=1200&expires=33265674353" />

      </Helmet>

      <div className={styles.characterContainer}>
        <h2>Star Wars Characters</h2>
        <BackToTop />
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
    </>
  );
};
