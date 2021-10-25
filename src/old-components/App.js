
import { useState } from 'react';
import './App.css';
import NominationList from './components/nomination-list';
import SearchBar from './components/search-bar';
import SearchResult from './components/search-result';
import Card from './components/card'

function App() {
  const movies = ['man', 'woman', 'boy']
  const [searchResult, setSearchTerm] = useState('')
  const [nominationList, setNominationList] = useState([])

  const handleSearchFilter = (term) => {
    if (!term) {
      setSearchTerm([])
      return
    }
    let includes = movies.filter(x => x.includes(term))
    setSearchTerm(includes)
  }

  const handleClick = (item) => {
    setNominationList([...nominationList, item])
  }

  const handleRemoveClick = (item) => {
    const nomCopy = [...nominationList]
    let index = nomCopy.findIndex(x => x === item)
    nomCopy.splice(index, 1)
    setNominationList(nomCopy)
  }

  return (
    <div className="App">
      <h1>Debola's bumbum</h1>
  
      <SearchBar onChange={handleSearchFilter} />
      <div
        style={
          { display: "flex", justifyContent: 'space-around', marginTop: "3em" }
        }>
        <Card>
          <SearchResult
            result={searchResult}
            onNominate={handleClick}
            nominatedLists={nominationList} />
        </Card>
        <Card>
          <NominationList nominationList={nominationList} handleRemoveClick={handleRemoveClick} />
        </Card>
      </div>
    </div>
  );
}

export default App;
