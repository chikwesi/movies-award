
import './App.css';
import NominationList from './components/nomination-list';
import SearchBar from './components/search-bar';
import SearchResult from './components/search-result';
import NotificationBanner from './components/notification-banner';
import { useEffect, useState } from "react"
import Container from './components/search-container';
import Success from './components/success';
import { emptyIds } from "./utils/empty-imdbids";
function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [nominations, setNominations] = useState([
    {
      imdbID: emptyIds.one,
    },
    {
      imdbID: emptyIds.two,
    },
    {
      imdbID: emptyIds.three,
    }, {
      imdbID: emptyIds.four,
    },
    {
      imdbID: emptyIds.five,
    }
  ])
  const [hasBanner, setHasBanner] = useState(false)
  const [omdbMovies, setOmdbMovies] = useState([])
  const [showNomation, setShowNomation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(true)
  const api = 'http://www.omdbapi.com/'

  useEffect(() => {
    setShowSearchResult(true)
    omdbMovieSearchHandler(movieTitle);
  }, [movieTitle])

  useEffect(() => {
    nominations.length > 0 ? setShowNomation('show') : setShowNomation('')
  }, [nominations])

  const omdbMovieSearchHandler = async (searchTerm) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${api}?s=${searchTerm}&apikey=41dae29c`);
      const jsonResponse = await res.json()
      if (res.status === 200 && jsonResponse.Response === "True") {
        const movies = jsonResponse.Search;
        const mappedMovies = movies.map(({ Poster, Title, Year, imdbID }) => ({ Poster, Title, Year, imdbID }))
        setOmdbMovies(mappedMovies)
      }
    }
    catch (err) {
      setOmdbMovies([])
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }

  }

  const handleNomination = (value) => {
    const noms = [...nominations]
    let nextNullIndex = noms.findIndex(nom => Object.values(emptyIds).includes(nom.imdbID))
    noms.splice(nextNullIndex, 1, value)
    // use previous value of the state
    setNominations(noms)
    if (noms.every(e => !Object.values(emptyIds).includes(e.imdbID))) {
      setHasBanner(true)
    }
  }

  const handleRemoveNomination = (id) => {
    const nominationsCopy = [...nominations];
    const index = nominations.findIndex(nom => nom.imdbID === id)
    nominationsCopy.splice(index, 1, { imdbID: Object.values(emptyIds)[index] });
    setNominations(nominationsCopy);
    setHasBanner(false)
  }

  const hideSearchResult = () => {
    setTimeout(() => setShowSearchResult(false), 200)
  }



  return (
    <div className="App">
      <button
        className="open-nominations"
        onClick={() => setShowNomation(showNomation ? '' : 'show')}
      >  &#9776; {showNomation ? 'hide' : 'show'} nominations
      </button>

      <div className="layout">
        <Container>
          <div className="search__containter">
            <h1>The Award</h1>
            <p className="nomination__instruction">Search and nominate your best movies for The Shoppies <br />Award 2020</p>
            <SearchBar onMovieSearch={setMovieTitle} onLoseFocus={hideSearchResult} />
            {showSearchResult &&
              <SearchResult
                searchTerm={movieTitle}
                omdbResult={omdbMovies}
                onNominateMovie={handleNomination}
                nominations={nominations}
                isLoading={isLoading}
              />
            }

          </div>
        </Container>
        <Container className={`nomination-container ${showNomation}`}>
          <div>
            <NominationList
              nominations={nominations}
              onRemoveNomination={handleRemoveNomination}
              onReorderNomination={setNominations}
              onCloseNomination={() => setShowNomation('')}
            />
          </div>
        </Container>

        <Container className={`notication__container ${hasBanner ? 'show' : ''}`}>
          <NotificationBanner onSetHasBanner={setHasBanner}>
          </NotificationBanner>
        </Container>
      </div>
    </div>
  );
}

export default App;
