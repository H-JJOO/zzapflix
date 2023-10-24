import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux"; // 액션을 호출하기 위해 필요함
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";

import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);

  // 1.배너
  // 2. 카드
  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  // loading 이 true 이면 loading 스피너를 보여주고,
  // loading 이 false 이면 데이터를 보여준다.

  // true : 데이터 도착 전 (movieAction.js 에서 dispatch를 통해 데이터를 가져오기 전)
  // false : 데이터 도착 후 or 에러 발생 (movieAction.js 에서 dispatch를 통해 데이터를 가져온 후)

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color={"#ffff"} loading={loading} size={150} />
      </div>
    );
  }

  return (
    // 조건부 랜더링 : popularMovies.results가 있을 때만 Banner 컴포넌트를 랜더링
    // {popularMovies.results && <Banner movie={popularMovies.results[0]} />}
    // loading 의 조건이 있기 때문에 조건부 랜더링은 필요없음
    <div style={{ backgroundColor: "black" }}>
      <Banner movie={popularMovies.results[0]} />
      <h1 style={{ color: "white" }}>Popular Movies</h1>
      <MovieSlide movies={popularMovies} />
      <h1 style={{ color: "white" }}>Top Rated Movies</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1 style={{ color: "white" }}>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies} />
    </div>
  );
};

export default Home;
