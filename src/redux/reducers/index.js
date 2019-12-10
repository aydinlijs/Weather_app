import {
    FETCH_SUCCESS,
    FORECAST_NOT_FOUND,
    FORECAST_LOADING,
    FORECAST_ERROR
} from './../action_types';

const initialStatus = {
    currentForecast: {},
    status: 'LOADING'
}

export function forecastReducer(forecast = initialStatus, action) {
    switch (action.type) {
        case FETCH_SUCCESS:
            return { currentForecast: action.payload.data, status: 'SUCCESS' }
        case FORECAST_NOT_FOUND:
            return { ...forecast, status: 'NOT_FOUND' }
        case FORECAST_LOADING:
            return { ...forecast, status: 'LOADING' }
        case FORECAST_ERROR:
            let newStatus = 'LOADING';
            switch (action.payload) {
                case 1:
                    newStatus = 'NETWORK_ERROR';
                    break;
                case 2:
                    newStatus = 'PERMISSION_ERROR';
                    break;
                case 3:
                    newStatus = 'BROWSER_ERROR';
                    break;
                default:
                    newStatus = 'LOADING';
                    break;
            }
            return { ...forecast, status: newStatus }
        default:
            return forecast
    }
}