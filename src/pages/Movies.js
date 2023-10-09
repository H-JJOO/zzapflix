import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Form from "react-bootstrap/Form";
import { movieAction } from "../redux/actions/movieAction";

import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

import ClipLoader from "react-spinners/ClipLoader";

const Movies = () => {
  const dispatch = useDispatch();
  const { popularMovies, genreList, loading } = useSelector(
    (state) => state.movie
  );

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    setCount(count + 1);
    dispatch(movieAction.getMovies());
  }, []);

  if (loading) {
    return <ClipLoader color={"#ffff"} loading={loading} size={150} />;
  }

  return (
    <Container>
      <Row>
        <Col
          style={{ paddingTop: "50px", height: "100%" }}
          xs={10}
          md={3}
          lg={3}>
          <Form.Select
            aria-label="Default select example"
            style={{ background: "black", margin: "10px", color: "white" }}>
            <option>Sort</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            style={{ background: "black", margin: "10px", color: "white" }}>
            <option>Filter</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col style={{ paddingTop: "10px" }} className="movie-card">
          {popularMovies.results &&
            popularMovies.results.map((item) => (
              <Card style={{ width: "18rem", backgroundColor: "black" }}>
                <Card.Img
                  variant="top"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
                <span>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger" style={{ margin: "2px" }}>
                      {genreList.find((item) => item.id == id).name}
                    </Badge>
                  ))}
                </span>
                <Card.Body style={{ color: "white" }}>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.overview}</Card.Text>
                </Card.Body>
                <div>
                  <span>
                    <Badge bg="light" text="dark" style={{ margin: "2px" }}>
                      grade : {item.vote_average}
                    </Badge>
                  </span>

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
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Movies;
