import React, { useState, useEffect } from "react";
import { Button, Card, Toast, SkeletonBodyText } from "@shopify/polaris";

const Forecast = props => {
    const [fav, setFav] = useState(false);
    const [toast, setToast] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("favLocations")) {
            const favs = JSON.parse(localStorage.getItem("favLocations"));
            const fave = favs.filter(fave => fave.id === props.forecast.id).length;
            if (fave > 0) {
                setFav(true);
            } else {
                setFav(false);
            }
        } else {
            setFav(false);
        }
    }, [props.forecast.id, props]);

    const toggleToast = (value) => {
        setToast(value);
    }

    const toggleFavourites = () => {
        if (!fav) {
            var obj = {
                name: props.forecast.name,
                coords: props.forecast.coord,
                id: props.forecast.id
            };
            if (localStorage.getItem("favLocations")) {
                const favs = JSON.parse(localStorage.getItem("favLocations"));
                if (favs.filter(fav => fav.id === obj.id).length === 0) {
                    favs.push(obj);
                    localStorage.setItem("favLocations", JSON.stringify(favs));
                    setFav(true);
                }
            } else {
                localStorage.setItem("favLocations", JSON.stringify([obj]));
                setFav(true);
            }
        } else {
            const favs = JSON.parse(localStorage.getItem("favLocations"));
            const newFavs = favs.filter(fav => fav.id !== props.forecast.id);
            localStorage.setItem("favLocations", JSON.stringify(newFavs));
            setFav(false);
        }
        toggleToast(true);
    };

    const renderNotFound = () => {
        return (
            <Card sectioned>
                <h6>
                    The forecast for your desired location couldn't be found or you made a
                    typo when searching
                </h6>
            </Card>
        );
    };

    const formatDate = (date, timezone) => {
        const dat = date;
        //diving by the number of seconds in an hour to get the timezone offset
        const offset = timezone / 3600;
        const estimateHour = dat.getHours() + offset;
        let newHour;
        if (estimateHour < 24 && estimateHour >= 0) {
            newHour = estimateHour;
        }
        else if (estimateHour > 24) {
            newHour = estimateHour - 24;
        }
        else {
            newHour = estimateHour + 24;
        }
        return (
            newHour.toString().padStart(2, 0) +
            ":" +
            dat
                .getMinutes()
                .toString()
                .padStart(2, 0) +
            ":" +
            dat
                .getSeconds()
                .toString()
                .padStart(2, 0)
        );
    };

    const renderForecast = () => {
        const { name, main, wind, weather, sys, timezone } = props.forecast;
        let sunrise = new Date(1970, 0, 1);
        sunrise.setSeconds(sys.sunrise);
        let sunset = new Date(1970, 0, 1);
        sunset.setSeconds(sys.sunset);
        return (
            <React.Fragment>
                <Button onClick={toggleFavourites} id="favButton">
                    {fav ? "Remove from favorites" : "Add to favorites"}
                </Button>
                <Card title={`The forecast for ${name} is`} sectioned>
                    <ul>
                        <li>Humidity: {main.humidity}</li>
                        <li>Temperature: {main.temp}</li>
                        <li>Pressure: {main.pressure}</li>
                        <li>Wind: {wind.speed}</li>
                        <li>
                            Overall:{" "}
                            {weather[0].description.charAt(0).toUpperCase() +
                                weather[0].description.substring(1)}
                        </li>
                        <li>Sunrise: {formatDate(sunrise, timezone)}</li>
                        <li>Sunset: {formatDate(sunset, timezone)}</li>
                    </ul>
                </Card>
            </React.Fragment>
        );
    };

    const renderResult = () => {
        switch (props.status) {
            case 'LOADING':
                return <SkeletonBodyText>Loading...</SkeletonBodyText>;
            case 'SUCCESS':
                return renderForecast();
            case 'PERMISSION_ERROR':
                return <Card sectioned><p>You needed to allow geolocation to see the forecast of your current whereabout</p></Card>;
            case 'BROWSER_ERROR':
                return <Card sectioned><p>You browser doesn't have the tool to detect your location</p></Card>;
            case 'NETWORK_ERROR':
                return <Card sectioned><p>Some network error happened</p></Card>;
            case 'NOT_FOUND':
                return renderNotFound();
            default:
                return <SkeletonBodyText>Loading...</SkeletonBodyText>;
        }
    };
    const toastMarkup = toast ? (
        <Toast
            content={fav ? 'Added to favorites' : 'Removed from favorites'}
            onDismiss={() => toggleToast(false)}
        />
    ) : null;

    return (
        <div id="forecastCard">
            {renderResult()}
            {toastMarkup}
        </div>
    );
};

export default Forecast;
