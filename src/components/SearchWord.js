import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";

function SearchWord() {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search");
  const dispatch = useDispatch();

  console.log("searchWord@#@#@#@#@# : ", searchWord);

  useEffect(() => {
    dispatch(movieAction.getMovies(searchWord));
  }, [dispatch, searchWord]);
}

export default SearchWord;
