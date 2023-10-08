import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";

import gener from "../json/genreKey.json";

import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import YouTube, { YouTubeProps } from "react-youtube";

const MovieDetail = () => {
  // Modal
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  // Youtube
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // Genre(json파일)
  const genreList = gener.genres;

  const { id } = useParams();

  const dispatch = useDispatch();
  const { movieDetail, movieReviews, relatedMovies, movieTrailer, loading } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovieDetail(id));
  }, []);

  if (loading) {
    return <ClipLoader color={"#ffff"} loading={loading} size={150} />;
  }

  console.log("!!!movieDetail : ", movieDetail);
  console.log("!!!movieReviews : ", movieReviews);
  console.log("!!!relatedMovies : ", relatedMovies);
  console.log("!!!movieTrailer : ", movieTrailer);

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
          </div>
          <hr style={{ color: "white" }} />
          <div>
            {values.map((v, idx) => (
              <Button
                key={idx}
                className="me-2 mb-2"
                onClick={() => handleShow(v)}>
                Watch Trailer
                {typeof v === "string" && `below ${v.split("-")[0]}`}
              </Button>
            ))}
            <Modal
              show={show}
              fullscreen={fullscreen}
              onHide={() => setShow(false)}>
              <Modal.Header closeButton style={{ background: "black" }}>
                <Modal.Title style={{ color: "white" }}>
                  {movieDetail.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: "black" }}>
                <YouTube
                  videoId={movieTrailer.results && movieTrailer.results[0].key}
                  opts={opts}
                  onReady={onPlayerReady}
                />
              </Modal.Body>
            </Modal>
          </div>
        </Col>

        <Col
          xs={12}
          xl={12}
          style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Badge bg="danger" style={{ width: "100%", height: "100%" }}>
            REVIEWS ({movieReviews && movieReviews.total_results})
          </Badge>
        </Col>
        <Col xs={12} xl={12} className="reviews-box">
          {movieReviews.results &&
            movieReviews.results.map((item) => {
              return (
                <div className="reviews">
                  <h3>{item.author}</h3>
                  <p>{item.content}</p>
                  <hr></hr>
                </div>
              );
            })}
        </Col>
        <Col
          xs={12}
          xl={12}
          style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Badge bg="danger" style={{ width: "100%", height: "100%" }}>
            RELATED MOVIES (
            {relatedMovies.results && relatedMovies.results.length})
          </Badge>
        </Col>
        <Col xs={12} xl={12} className="relatedMovies-box">
          {relatedMovies.results &&
            relatedMovies.results.map((item) => {
              return (
                <div className="relatedMovie">
                  <h3>{item.title}</h3>
                  <img
                    style={{ width: "298px", height: "400px" }}
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.backdrop_path}`}
                  />
                </div>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
