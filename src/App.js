import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";

import Navigateion from "./components/Navigateion";

import Footer from "./components/Footer";

// 해야 할 것들
// 1. 3개 페이지 필요 (홈페이지, movie 페이지, movieDetail 페이지)

// 2. 홈페이지 : 배너, 섹션 (popular, top rate, upcoming)
// 3. 섹션에서 각 영화에 마우스를 올리면 제목, 장르 ,점수, 인기도, 청불여부가 나타남
// 4. 색션에서 영화를 슬라이드로 넘기면서 볼수 있음

// 5. movieDertail 페이지 : 영화에 대한 상세정보 (포스터, 제목, 줄거리, 점수, 인기도, 청불여부, 예산, 이익, 러닝타임 등등...)
// 6. 예고편을 누르면 예고편을 볼 수 있음
// 8. 리뷰도 볼 수 있음
// 9. 관련 영화도 볼 수 있음

// 10. 모든 페이지에서 영화 검색이 가능함
// 11. 영화 정렬 가능
// 12. 영화 필터링 가능
function App() {
  window.onbeforeunload = function () {
    return false;
  };
  return (
    <div className="background">
      <Navigateion />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
