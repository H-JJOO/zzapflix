let initalState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  genreList: [],
  movieDetail: {},
  movieReviews: {},
  relatedMovies: {},
  movieTrailer: {},
  searchMovies: {},
  loading: true,
};

function movieReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_REQUEST":
      return { ...state, loading: true };
    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMovies: payload.popularMovies,
        topRatedMovies: payload.topRatedMovies,
        upcomingMovies: payload.upcomingMovies,
        genreList: payload.genreList,
        searchMovies: payload.searchMovies,
        loading: false,
      };
    case "GET_MOVIES_FAILURE":
      return { ...state, loading: true };
    case "GET_MOVIE_DETAIL_REQUEST":
      return { ...state, loading: true };
    case "GET_MOVIE_DETAIL_SUCCESS":
      return {
        ...state,
        movieDetail: payload.movieDetail,
        movieReviews: payload.movieReviews,
        relatedMovies: payload.relatedMovies,
        movieTrailer: payload.movieTrailer,
        loading: false,
      };

    case "GET_MOVIE_DETAIL_FAILURE":
      return { ...state, loading: true };

    default:
      return { ...state };
  }
}

export default movieReducer;
