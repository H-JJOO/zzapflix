import api from "../api";

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      const popularMoviesApi = api.get(`/movie/popular?language=en-US&page=1`);
      const top_ratedApi = api.get(`/movie/top_rated?language=en-US&page=1`);
      const upcomingApi = api.get(`/movie/upcoming?language=en-US&page=1`);

      const genreKey = await api.get(`/genre/movie/list?language=en-US`);

      // 동시에 여러개의 api를 호출하고 싶을 때
      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMoviesApi,
          top_ratedApi,
          upcomingApi,
          genreKey,
        ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genreList.data.genres,
        },
      });
      console.log("popularMovies : ", popularMovies);
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

      let [movieDetail, movieReivews] = await Promise.all([
        movieDetailApi,
        movieReviewsApi,
      ]);

      dispatch({
        type: "GET_MOVIE_DETAIL_SUCCESS",
        payload: {
          movieDetail: movieDetail.data,
          movieReivews: movieReivews.data,
        },
      });

      console.log("!!!!!movieDetail : ", movieDetail);
      console.log("!!!!!movieReviews : ", movieReivews);
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
