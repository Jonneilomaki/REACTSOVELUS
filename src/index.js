import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Tapahtuman aiheutti: ', event.target);
    console.log('Hakusana: ', query);
    searchMovies();
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log('Tapahtuman aiheutti: ', event.target);
    GetMovieData();
  };

  const searchMovies = () => {
    fetch(`https://jonneilomaki.github.io/REACTSOVELUS/${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Hakutulokset: ', data);
        setResults(data);
      });
  };

  const GetMovieData = () => {
    fetch('https://jonneilomaki.github.io/REACTSOVELUS/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
  };

  const handleDelete = (id) => {
    const updatedResults = results.filter((movie) => movie.id !== id);
    setResults(updatedResults);
  };

  const handleModify = (id) => {
    const movieToModify = results.find((movie) => movie.id === id);
    if (movieToModify) {
      // Kysy käyttäjältä uudet tiedot
      const newId = prompt('Uusi ID:', movieToModify.id);
      const newTitle = prompt('Uusi elokuvan nimi:', movieToModify.Title);
      const newDirector = prompt(
        'Uusi ohjaajan nimi:',
        movieToModify.Director
      );

      // Luo uusi elokuva päivitetyillä tiedoilla
      const updatedMovie = {
        id: newId,
        Title: newTitle,
        Director: newDirector,
      };

      
      const movieIndex = results.findIndex((movie) => movie.id === id);

      // Luo uusi lista päivitetyillä tiedoilla
      const updatedResults = [
        ...results.slice(0, movieIndex),
        updatedMovie,
        ...results.slice(movieIndex + 1),
      ];

      // Päivitä listä uusilla tiedoilla
      setResults(updatedResults);
    }
  };

  const handleAdd = () => {
    // Kysy käyttäjältä uudet tiedot elokuvalle
    const id = prompt('Syötä ID:');
    const title = prompt('Elokuvan nimi:');
    const director = prompt('Ohjaajan nimi:');

    // Luo uusi elokuva uusilla tiedoilla
    const newMovie = {
      id: id,
      Title: title,
      Director: director,
    };

    // Päivitä lista uusilla tiedoilla
    const updatedResults = [...results, newMovie];
    setResults(updatedResults);
  };

  const MovieArray = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No results found.</p>;
    }

    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Directors</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.Title}</td>
                <td>{item.Director}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleModify(item.id)}
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1>Hakusivu</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Hae:
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="form-control"
                placeholder="Syötä hakutermi"
                name="query"
              />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn" onClick={handleClick}>
              Hae kaikki
            </button>
          </div>
        </form>
        <div>
          <MovieArray data={results} />
        </div>
        <div>
          <button className="btn btn-success" onClick={handleAdd}>
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<SearchBar />);
