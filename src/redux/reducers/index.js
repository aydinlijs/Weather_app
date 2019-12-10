import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from './../action_types';

const initialStatus = {
    currentForecast: "",
    forecastStatus: 1,
    notFound: false
}

export function forecastReduer(forecast = initialStatus, action) {
    switch (action.type) {
        case FETCH_FORECAST_SUCCESS:
            return { data: action.payload.data, status: 'SUCCESS', message: '' }
        case FETCH_FORECAST_ERROR:
            return { data: action.payload.data, status: 'ERROR', message: action.payload.message }
        default:
            return posts
    }
}