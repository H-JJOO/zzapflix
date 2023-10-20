import api from "../api";

import { useNavigate } from "react-router-dom";

function getMovies(searchWord) {
  return async (dispatch) => {
    try {
      // console.log("searchWord : ", searchWord);
      dispatch({ type: "GET_MOVIES_REQUEST" });

      const popularMoviesApi = api.get(`/movie/popular?language=en-US&page=1`);
      const top_ratedApi = api.get(`/movie/top_rated?language=en-US&page=1`);
      const upcomingApi = api.get(`/movie/upcoming?language=en-US&page=1`);
      let searchApi = api.get(`/movie/popular?language=en-US&page=1`);

      if (searchWord) {
        searchApi = api.get(
          `/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=1`
        );
      }

      // console.log("searchApi@@@@ : ", searchApi);
      // console.log("popularMoviesApi@@@@ : ", popularMoviesApi);

      const genreKey = await api.get(`/genre/movie/list?language=en-US`);

      // 동시에 여러개의 api를 호출하고 싶을 때
      let [
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        searchMovies,
        genreList,
      ] = await Promise.all([
        popularMoviesApi,
        top_ratedApi,
        upcomingApi,
        searchApi ? searchApi : popularMoviesApi,
        genreKey,
      ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          searchMovies: searchMovies.data,
          genreList: genreList.data.genres,
        },
      });
      // console.log("popularMovies : ", popularMovies);
      // console.log("searchMovies@@@@ : ", searchMovies.data);
      // console.log(topRatedMovies);
      // console.log(upcomingMovies);
    } catch (error) {
      // 에러 핸들링
      console.log("error : ", error);
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}

function getMovieDetail(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIE_DETAIL_REQUEST" });
      const movieDetailApi = api.get(`/movie/${id}?language=en-US`);

      const movieReviewsApi = api.get(`/movie/${id}/reviews?language=en-US`);

      const relatedMoviesApi = api.get(`/movie/${id}/similar?language=en-US`);

      const movieTrailerApi = api.get(`/movie/${id}/videos?language=en-US`);

      let [movieDetail, movieReviews, relatedMovies, movieTrailer] =
        await Promise.all([
          movieDetailApi,
          movieReviewsApi,
          relatedMoviesApi,
          movieTrailerApi,
        ]);

      // console.log("!!!!!!!!movieDetail : ", movieDetail);
      // console.log("!!!!!!!!movieReviews : ", movieReviews);
      // console.log("!!!!!!!!relatedMovies : ", relatedMovies);
      // console.log("!!!!!!!!movieTrailer : ", movieTrailer);

      dispatch({
        type: "GET_MOVIE_DETAIL_SUCCESS",
        payload: {
          movieDetail: movieDetail.data,
          movieReviews: movieReviews.data,
          relatedMovies: relatedMovies.data,
          movieTrailer: movieTrailer.data,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIE_DETAIL_FAILURE" });
      console.log("error : ", error);
    }
  };
}

export const movieAction = {
  getMovies,
  getMovieDetail,
};
