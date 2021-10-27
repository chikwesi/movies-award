import style from "./search-bar.module.css";

const SearchBar = ({ onMovieSearch}) => {
    return (
        <form className={style.searchForm}>
            <div className={style.search}>
                <input className={style.input}
                    id="search-bar"
                    type="text"
                    placeholder="Search Movie Title"
                    autoComplete="off"
                    onChange={e => onMovieSearch(e.target.value)}
                />
                <label className={style.label} htmlFor="search-bar">
                    {/* Movie Title */}
                </label>
            </div>
        </form>


    )
}

export default SearchBar