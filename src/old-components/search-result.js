export const SearchResult = ({ result, onNominate, nominatedLists }) => {

  const getLists = () => {
    if (result) {
      return result.map((x, i) =>
        <li key={i}>{x}
          <button onClick={() => onNominate(x)}
            disabled={nominatedLists.includes(x)}
          >nominate</button>
        </li>)
    }
  }

  return (
    <div>
      Search Result {result && result.length ? result.length : ''}
      <ul>
        {getLists()}
      </ul>
    </div>
  )
}

export default SearchResult