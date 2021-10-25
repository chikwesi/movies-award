import style from "./search-result.module.css";
import BallLoader from "./ball-loader";
import { useState } from "react";
import { emptyIds } from "../utils/empty-imdbids";

const SearchResult = ({ searchTerm, omdbResult, onNominateMovie, nominations, isLoading }) => {
  const [movieLoader, setMovieLoader] = useState(null)

  const nominationHandler = (movie) => {
    if (nominations.every(e => !Object.values(emptyIds).includes(e.imdbID))) {
      return
    }
    onNominateMovie(movie);
    // setMovieLoader(movie.imdbID)
    // setTimeout(
    //   () => {
  
    //     setMovieLoader(null)
    //   }, 900
    // )
  }

  const isNominatedCheck = (imdbID) => {
    let filteredArray = nominations.filter(item => item && item.imdbID === imdbID);
    return (filteredArray.length > 0)
  }
  const Result = () => (
    <>
      <p className={style.count}>
        {omdbResult.length} matched your search result for: {searchTerm}
      </p>

      <ul className={style.list}>
        {
          omdbResult &&
          omdbResult.map((movie, i) => (
            <li key={i}>
              <img src={movie.Poster !==  'N/A' ? movie.Poster : '/default-poster.jpeg'} alt="movie poster"/>
              <span>
                {movie.Title}({movie.Year})
              </span>
              <button
                disabled={isNominatedCheck(movie.imdbID)}
                onClick={() => nominationHandler(movie)}>
                {movieLoader === movie.imdbID ? <BallLoader /> : 'nominate'}
              </button>
            </li>))
        }
      </ul>
    </>
  )
  return (
    searchTerm.trim() &&
    <div className={style.result}>
      {isLoading ? <BallLoader /> : <Result />}
    </div>
  )
}

export default SearchResult