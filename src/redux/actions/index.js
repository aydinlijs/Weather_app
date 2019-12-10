import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from "./../action_types";
import axios from "axios";

export const fetchForecast = () => async dispatch => {
  await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: { data: response.data } });
    })
    .catch(error => {
      dispatch({
        type: FETCH_POSTS_ERROR,
        payload: { data: [], message: error.message }
      });
    });
};
