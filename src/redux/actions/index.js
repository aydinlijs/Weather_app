import {
    FETCH_SUCCESS,
    FORECAST_NOT_FOUND,
    FORECAST_LOADING,
    FORECAST_ERROR
} from "./../action_types";
import weather from "./../../const/api";

export const fetchForecast = (params, isword) => async dispatch => {
    dispatch({ type: FORECAST_LOADING });
    const searchString = isword
        ? `weather?q=${params.keyword}&units=metric&APPID=95e119746283ccb68ff96ce7a9ce3f6b`
        : `weather?lat=${params.latitude}&lon=${params.longitude}&units=metric&APPID=95e119746283ccb68ff96ce7a9ce3f6b`;
    await weather
        .get(searchString)
        .then(response => {
            dispatch({
                type: FETCH_SUCCESS,
                payload: { data: response.data }
            });
        })
        .catch(error => {
            error.message.includes("404")
                ? dispatch({ type: FORECAST_NOT_FOUND })
                : dispatch({ type: FORECAST_ERROR, payload: 1 });
        });

};

export const displayErrorMessage = (code) => {
    return {
        type: FORECAST_ERROR,
        payload: code
    }
}
