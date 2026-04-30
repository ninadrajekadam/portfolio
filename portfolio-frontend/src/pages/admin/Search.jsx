import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../assets/scss/pages/admin/Search.scss";

const Search = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__icon"><FontAwesomeIcon icon={faSearch} /></div>
      <input type="text" className="search-bar__input" placeholder={placeholder} value={query} onChange={handleChange} />
    </div>
  );
};
export default Search;