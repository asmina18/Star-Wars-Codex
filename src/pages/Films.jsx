import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { allFilms } from "../queries/getAllFilms";
import { Modal } from "../components/Modal/Modal";
import { useState } from "react";
import styles from "./Film.module.scss"; 

export const Films = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () =>
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        allFilms
      ),
  });

  const showModal = (film) => {
    setSelectedFilm(film);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading......</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.filmsContainer}>
      <h1 className={styles.heading}>Star Wars Films</h1>
      <ul className={styles.filmList}>
        {data.allFilms.films.map((film) => (
          <li key={film.id} className={styles.filmItem}>
            <button onClick={() => showModal(film)} className={styles.filmButton}>
              {film.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Modal displaying film details */}
      {modalOpen && (
        <Modal>
          <div className={styles.modalContent}>
            <h2>{selectedFilm.title}</h2>
            <p><strong>Episode:</strong> {selectedFilm.episodeID}</p>
            <p><strong>Director:</strong> {selectedFilm.director}</p>
            <p><strong>Opening Crawl:</strong> {selectedFilm.openingCrawl}</p>
            <button onClick={closeModal} className={styles.closeButton}>Close Modal</button>
          </div>
        </Modal>
      )}
    </div>
  );
};
