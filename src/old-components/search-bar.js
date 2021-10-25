const SearchBar = ({onChange}) => {
    return (
        <form>
            <label>
                Movie Title
                <input type="text"
                    placeholder="search"
                    onChange={e => onChange(e.target.value)}
                />
            </label>
        </form>
    )
}

export default SearchBar