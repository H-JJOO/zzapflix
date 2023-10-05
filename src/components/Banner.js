import React from "react";

import { Container, Row, Col } from "react-bootstrap";

const Banner = ({ movie }) => {
  console.log("movie : ", movie);
  return (
    <Container className="banner">
      <Row>
        <div
          className="banner"
          style={{
            backgroundImage:
              "url(" +
              `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}` +
              ")",
          }}>
          <div className="banner-info">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Banner;
