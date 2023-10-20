import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Form from "react-bootstrap/Form";
import { movieAction } from "../redux/actions/movieAction";

import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

import ClipLoader from "react-spinners/ClipLoader";

import ReactPaginate from "react-paginate";

import { useLocation, useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();
  const movieDetail = (id) => {
    navigate(`/movies/${id}`);
  };
  const location = useLocation();

  let query = new URLSearchParams(location.search);

  const search = query.get("search");

  // console.log("search!@#!@# : ", search);

  const dispatch = useDispatch();
  const { popularMovies, genreList, loading, searchMovies } = useSelector(
    (state) => state.movie
  );

  const [pageNumber, setPageNumber] = React.useState(0);

  const usersPerPage = 4; // 한 페이지에 보여줄 아이템 개수
  const pagesVisited = pageNumber * usersPerPage;

  // console.log("popularMovies!!!!! : ", popularMovies.results);
  // console.log("searchMovies!!!!! : ", searchMovies);

  // 이 부분은 실제 데이터로 대체되어야 합니다.
  let mockData =
    popularMovies.results === undefined ? [] : popularMovies.results;

  if (search) {
    mockData = searchMovies.results;
  }

  // 현재 보여줘야 할 아이템들만 선택합니다.

  const displayUsers = mockData
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => (
      <Col
        style={{ paddingTop: "10px" }}
        className="movie-card"
        onClick={() => {
          movieDetail(item.id);
        }}>
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
      </Col>
    ));

  // 필요한 전체 페이지 개수를 계산합니다.
  const pageCount = Math.ceil(mockData.length / usersPerPage);

  // 이 함수는 사용자가 다른 페이지를 선택할 때마다 호출됩니다.
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    setCount(count + 1);
    dispatch(movieAction.getMovies(search));
  }, [dispatch, search]);

  if (loading) {
    return <ClipLoader color={"#ffff"} loading={loading} size={150} />;
  }

  // console.log("!!!!!!!!popularMovies : ", popularMovies.results);

  return (
    <Container>
      <Row>
        <Col
          style={{
            paddingTop: "50px",
            height: "100%",
            background: "black",
            margin: "10px",
            color: "white",
          }}
          xs={10}
          md={3}
          lg={3}>
          {search ? (
            <div>
              <h2>| Search Result |</h2>
              <h3>{search}</h3>
            </div>
          ) : (
            <div>
              <h2>| Popular Movies |</h2>
            </div>
          )}
        </Col>
        <Col className="movie-card">{displayUsers}</Col>
        <div className="pagenation">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationButtons"}
            previousLinkClassName={"previousButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"paginationDisabled"}
            pageClassName="pageItem"
            activeClassName="activePageItem"
          />
        </div>
      </Row>
    </Container>
  );
};

export default Movies;
