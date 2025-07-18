import { useState } from "react";
import searchIcon from "./assets/icons8-search.svg";
import rtLogo from "./assets/Rotten_Tomatoes_Logo.svg";
import "./App.css";

const getAPIURL = (title) =>
  `http://www.omdbapi.com/?t=${title}&plot=full&r=json&apikey=8e87631`;

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [movieDetails, setMovieDetails] = useState();
  const [moviePoster, setMoviePoster] = useState();

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    if (searchText.length === 0) {
      return;
    }

    const sanitisedSearchTerm = searchText.replace(" ", "+");

    try {
      const response = await fetch(getAPIURL(sanitisedSearchTerm));
      if (!response.ok) {
        alert(
          "Search could not be completed at this time, please try again later."
        );
      }
      const responseObj = await response.json();

      if (responseObj.Response !== "True") {
        alert("Search yielded no results.");
        return;
      }

      setMovieDetails(responseObj);
      setMoviePoster(responseObj.Poster);
    } catch (error) {
      console.error("An error occurred: " + error);
    }
  };

  const handleEnter = (e) => {
    e.key === "Enter" ? handleSearch() : null;
  };

  return (
    <div className="mainContainer">
      <div className="header">
        <h1 className="mainText">Movie Database</h1>
        <span className="subText">
          Find any movie's information and posters.
        </span>
      </div>
      <div className="search">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for a Movie"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleEnter}
        />
        <button className="searchButton" onClick={handleSearch}>
          <img src={searchIcon} alt="searchIcon" className="searchIcon" />
        </button>
      </div>
      <div className="contentSection">
        <div className="moviePoster">
          <span className="posterHeading">Poster</span>
          {moviePoster && movieDetails ? (
            <img
              src={moviePoster}
              alt={movieDetails.Title}
              className="moviePoster"
            />
          ) : (
            "Please enter a search term."
          )}
        </div>
        <div className="movieDetails">
          <span className="detailsHeading">Details</span>
          {movieDetails ? (
            <>
              <div className="movieDetail">
                <span className="label">Title:&nbsp;</span>
                {movieDetails.Title}
              </div>
              <div className="movieDetail">
                <span className="label">Director(s):&nbsp;</span>
                {movieDetails.Director}
              </div>
              <div className="movieDetail">
                <span className="label">Actor(s):&nbsp;</span>
                {movieDetails.Actors}
              </div>
              <div className="movieDetail">
                <span className="label">Genre(s):&nbsp;</span>
                {movieDetails.Genre}
              </div>
              <div className="movieDetail">
                <span className="label">Plot:&nbsp;</span>
                {movieDetails.Plot}
              </div>
              <div className="movieDetail">
                <span className="label">Release Date:&nbsp;</span>
                {movieDetails.Released}
              </div>
              <div className="movieDetail">
                <span className="label">Box Office Earnings:&nbsp;</span>
                {movieDetails.BoxOffice}
              </div>
              <div className="movieDetail rating">
                <span className="label">Rotten Tomatoes Rating:&nbsp;</span>
                {
                  movieDetails.Ratings?.find(
                    (x) => x.Source === "Rotten Tomatoes"
                  )?.Value
                }
                <img
                  src={rtLogo}
                  alt="Rotten Tomatoes Logo"
                  className="rtLogo"
                />
              </div>
            </>
          ) : (
            "Please enter a search term."
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
