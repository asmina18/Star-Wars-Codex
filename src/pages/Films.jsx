import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { allFilms } from "../queries/getAllFilms";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";
import { useState } from "react";


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

  console.log(data);

  if (isLoading) {
    return <div>Loading......</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Star Wars Films</h1>
      <ul>

        {data.allFilms.films.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`home/${item.id}`}>{item.title}</Link>
          
            </li>
          );
        })}

        {data.allFilms.films.map((film) => (
          <li key={film.id}>
            {/* Ved klik på film, vis modal med film-detaljer */}
            <button onClick={() => showModal(film)}>{film.title}</button>
          </li>
        ))}

      </ul>

      {/* Modal der viser film-detaljer */}
      {modalOpen && (
        <Modal>
          <div className="modal-content">
            <h2>{selectedFilm.title}</h2>
            <p><strong>Episode:</strong> {selectedFilm.episodeID}</p>
            <p><strong>Director:</strong> {selectedFilm.director}</p>
            <p><strong>Opening Crawl:</strong> {selectedFilm.openingCrawl}</p>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </Modal>
      )}
    </div>
  );
};
