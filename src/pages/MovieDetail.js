import React, { useEffect } from "react";
import Badge from "react-bootstrap/Badge";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";

import gener from "../json/genreKey.json";

import { Container, Row, Col } from "react-bootstrap";

const MovieDetail = () => {
  const genreList = gener.genres;
  console.log("Detail genreList : ", genreList);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { movieDetail, loading } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovieDetail(id));
  }, []);

  if (loading) {
    return <ClipLoader color={"#ffff"} loading={loading} size={150} />;
  }

  return (
    <Container className="detail">
      <Row>
        <Col xs={12} xl={6}>
          <img
            style={{ width: "500px", height: "700px" }}
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movieDetail.poster_path}`}
            alt=""
          />
        </Col>
        <Col xs={12} xl={6}>
          <div className="detail-genre">
            {movieDetail.genres &&
              movieDetail.genres.map((id) => (
                <Badge bg="danger" style={{ margin: "2px" }}>
                  {genreList.find((item) => item.id == id.id).name}
                </Badge>
              ))}
          </div>
          <div className="detail-title">
            <h1>{movieDetail.title}</h1>
          </div>
          <div className="detail-info">
            <span>
              <Badge bg="light" text="dark" style={{ margin: "2px" }}>
                grade : {movieDetail.vote_average}
              </Badge>
            </span>
            <span>
              <Badge bg="light" text="dark" style={{ margin: "2px" }}>
                vote_count : {movieDetail.vote_count}
              </Badge>
            </span>
            <span>
              {movieDetail.adult ? (
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
          <hr style={{ color: "white" }} />
          <div className="detail-overview">
            <p>{movieDetail.overview}</p>
          </div>
          <hr style={{ color: "white" }} />
          <div className="detail-info2">
            <div>
              <Badge bg="danger">Budget</Badge>${movieDetail.budget}
            </div>
            <div>
              <Badge bg="danger">Revenue</Badge>${movieDetail.revenue}
            </div>
            <div>
              <Badge bg="danger">Release Date</Badge>
              {movieDetail.release_date}
            </div>
            <div>
              <Badge bg="danger">Runtime</Badge>
              {movieDetail.runtime} min
            </div>
          </div>
          <hr style={{ color: "white" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
