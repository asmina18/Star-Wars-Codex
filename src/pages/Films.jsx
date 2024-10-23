import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { allFilms } from "../queries/getAllFilms";
import { useState } from "react";
import styles from "./Film.module.scss";
import newHopeImage from '../assets/images/new-hope-image.jpg';
import empireImage from '../assets/images/empire-image.jpg';
import jediImage from '../assets/images/return-of-the-jedi.jpg';
import phantomMenaceImage from '../assets/images/phantom-menace-image.jpg';
import clonesImage from '../assets/images/clones-image.jpg';
import sithImage from '../assets/images/sith-image.jpg';
import { Helmet } from "react-helmet-async";

// Komponentdefinition for Film-listen
export const Films = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Henter data med React Query og GraphQL
  const { data, isLoading, error } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () =>
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index", // GraphQL API URL
        allFilms // GraphQL forespørgsel
      ),
  });

  // Matcher filmene med deres respektive billeder
  const filmImages = {
    "A New Hope": newHopeImage,
    "The Empire Strikes Back": empireImage,
    "Return of the Jedi": jediImage,
    "The Phantom Menace": phantomMenaceImage,
    "Attack of the Clones": clonesImage,
    "Revenge of the Sith": sithImage,
  };

  // Funktion til at vise modal, når en film er valgt
  const showModal = (film) => {
    setSelectedFilm(film);
    setModalOpen(true);
  };

  // Funktion til at lukke modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Filtrerer filmene baseret på søgeforespørgslen
  const filteredFilms = data?.allFilms.films.filter((film) =>
    film.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
        <title>Star Wars Film</title>
        <meta name="description"content="Udforsk de ikoniske Star Wars film. En omfattende guide til alle filmene fra det legendariske Star Wars-univers."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Star Wars, film, filmguide, sci-fi, rumeventyr, Star Wars film"/>
        <meta property="og:url" content="https://star2024.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Star Wars" />
        <meta property="og:description"content="Star Wars er en episk fortælling om kampen mellem lyset og mørket i en fjern galakse."/>
        <meta property="og:image"content="https://opengraph.b-cdn.net/production/images/871626bc-c374-40e1-a50d-f2c058f391e3.jpg?token=53FpnlvuLq_ZymGfLZu47HsvBH6ab4T_MRtssAzk8Fo&height=800&width=1200&expires=33265672796"/>
      </Helmet>

      <div className={styles.filmsContainer}>
        <h2 className={styles.heading}>Star Wars Films</h2>

        {/* Søgefelt for at filtrere film */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a film..."
          className={styles.searchInput}
        />

        {/* Liste over filtrerede film */}
        <ul className={styles.filmList}>
          {filteredFilms?.map((film) => (
            <li key={film.id} className={styles.filmItem}>
              <div className={styles.filmImageContainer}>
                <img
                  src={filmImages[film.title]}
                  alt={film.title}
                  className={styles.filmImage}
                />
              </div>
              <button
                onClick={() => showModal(film)}
                className={styles.filmButton}
              >
                {film.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Modal der viser detaljer om den valgte film */}
        {modalOpen && (
          <>
            <div className={styles.modalOverlay} onClick={closeModal}></div>
            <div className={styles.modalContent}>
              <h2>{selectedFilm.title}</h2>
              <p>
                <strong>Episode:</strong> {selectedFilm.episodeID}
              </p>
              <p>
                <strong>Director:</strong> {selectedFilm.director}
              </p>
              <p>
                <strong>Opening Crawl:</strong> {selectedFilm.openingCrawl}
              </p>
              <button onClick={closeModal} className={styles.closeButton}>
                Close Modal
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
