import React, { Fragment, useEffect, useState } from 'react';
import MovieCard from '../movie/MovieCard';

const Movies = ({}) => {
  const [popularMovies, setPopular] = useState([]);
  const [browseMovies, setSearch] = useState([]);
  const [watchlistMovies, setWatchlist] = useState([]);
  const [movie, setMovie] = useState('');
  const [detailView, setView] = useState(false);
  const [page, setPage] = useState(1);

  const apiUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=845024cb2f20a2bbaba2bd37eddadafc&language=en-US&page=';
  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    const getMovies = async (apiUrl) => {
      const moviesFromAPI = await fetchMovies(apiUrl);
      setPopular(moviesFromAPI);
    };
    getMovies(apiUrl + 1);
  }, []);

  const fetchMovies = async (apiUrl) => {
    const res = await fetch(apiUrl, requestOptions);
    const data = await res.json();
    return data.results;
  };

  return (
    <div className='popular-movies'>
      <div className='row'>
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
