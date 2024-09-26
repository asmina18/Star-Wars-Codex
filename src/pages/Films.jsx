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

export const Films = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  const { data, isLoading, error } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () =>
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        allFilms
      ),
  });

  // Updated with the correct image imports
  const filmImages = {
    "A New Hope": newHopeImage,
    "The Empire Strikes Back": empireImage,
    "Return of the Jedi": jediImage,
    "The Phantom Menace": phantomMenaceImage,
    "Attack of the Clones": clonesImage,
    "Revenge of the Sith": sithImage,
  };

  const showModal = (film) => {
    setSelectedFilm(film);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Filter films based on the search query
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
    <div className={styles.filmsContainer}>
      <h2 className={styles.heading}>Star Wars Films</h2>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a film..."
        className={styles.searchInput}
      />

      <ul className={styles.filmList}>
        {filteredFilms?.map((film) => (
          <li key={film.id} className={styles.filmItem}>
            <div className={styles.filmImageContainer}>
              <img src={filmImages[film.title]} alt={film.title} className={styles.filmImage} />
            </div>
            <button onClick={() => showModal(film)} className={styles.filmButton}>
              {film.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Modal displaying film details */}
      {modalOpen && (
        <>
          <div className={styles.modalOverlay} onClick={closeModal}></div>
          <div className={styles.modalContent}>
            <h2>{selectedFilm.title}</h2>
            <p><strong>Episode:</strong> {selectedFilm.episodeID}</p>
            <p><strong>Director:</strong> {selectedFilm.director}</p>
            <p><strong>Opening Crawl:</strong> {selectedFilm.openingCrawl}</p>
            <button onClick={closeModal} className={styles.closeButton}>Close Modal</button>
          </div>
        </>
      )}
    </div>
  );
};
