import React from "react";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { genreList } = useSelector((state) => state.movie);

  // console.log("CARD genreList : ", genreList);

  const navigate = useNavigate();
  const movieDetail = () => {
    navigate(`/movies/${item.id}`);
  };
  return (
    <div
      className="card"
      onClick={() => {
        movieDetail();
      }}
      style={{
        backgroundColor: "black",
        height: "200px",
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}` +
          ")",
      }}>
      <div className="overlay">
        <h1>{item.title}</h1>
        <div>
          {item.genre_ids.map((id) => (
            <Badge bg="danger" style={{ margin: "2px" }}>
              {genreList.find((item) => item.id == id).name}
            </Badge>
          ))}
        </div>
        <div>
          <span>
            <Badge bg="light" text="dark" style={{ margin: "2px" }}>
              grade : {item.vote_average}
            </Badge>
          </span>
        </div>
        <div>
          <span>
            {item.adult ? (
              <Badge bg="danger" style={{ margin: "2px" }}>
                Rated R
              </Badge>
            ) : (
              <Badge bg="primary" style={{ margin: "2px" }}>
                Rated G
              </Badge>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
