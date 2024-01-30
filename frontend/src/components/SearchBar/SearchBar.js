import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/search?term=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const formatCreatedAt = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  }

  return (
    <div className="Home">
      <div className="HomeNotes">
        <h1
          className="SearchBarTitle"
          style={{
            textAlign: "center",
          }}
        >
          Search Page
        </h1>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <input
            className="SearchInputContainer"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="SearchButton" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="NoteList">
          {searchResults.map((result, index) => (
            <div key={index} className="Note">
              <div className="NoteContent">
                <div
                  style={{
                    fontSize: "20px",
                    color: "#2b2b2b",
                    paddingBottom: "10px",
                  }}
                >
                  Title - {result.title}
                </div>
                <div dangerouslySetInnerHTML={{ __html: result.content }} />
                <div className="NoteTimestamp">
                  {formatCreatedAt(result.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
          }}
          className="NoNotesFoundSearch"
        >
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
