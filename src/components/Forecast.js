import React, { useState, useEffect } from "react";
import { Page, Button, Card, SkeletonBodyText } from "@shopify/polaris";

const Forecast = props => {
    const [fav, setFav] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("favLocations")) {
            const favs = JSON.parse(localStorage.getItem("favLocations"));
            const fave = favs.filter(fave => fave.id === props.forecast.id).length;
            if (fave > 0) {
                setFav(true);
            }
            else {
                setFav(false);
            }
        } else {
            setFav(false);
        }
    }, [props.forecast.id, props]);

    const toggleFavourites = () => {
        if (!fav) {
            console.log("Entered false");
            var obj = {
                name: props.forecast.name,
                coord: props.forecast.coord,
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
            console.log("Entered true");
            const favs = JSON.parse(localStorage.getItem("favLocations"));
            const newFavs = favs.filter(fav => fav.id !== props.forecast.id);
            localStorage.setItem("favLocations", JSON.stringify(newFavs));
            setFav(false);
        }
    };

    const renderNotFound = () => {
        return (
            <Card sectioned>
                <h6>The forecast for your desired location couldn't be found or you made a typo when searching</h6>
            </Card>
        );
    };

    const renderForecast = () => {
        const { name, main, wind, weather, sys } = props.forecast;
        const sunrise = new Date(1970, 0, 1);
        sunrise.setSeconds(sys.sunrise);
        const sunset = new Date(1970, 0, 1);
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
                        <li>Sunrise: {sunrise.toLocaleTimeString()}</li>
                        <li>Sunset: {sunset.toLocaleTimeString()}</li>
                    </ul>
                </Card>
            </React.Fragment>
        );
    };

    const renderResult = () => {
        switch (props.status) {
            case 1:
                return <SkeletonBodyText>Loading...</SkeletonBodyText>;
            case 2:
                return renderForecast();
            case 3:
                return <p>You needed to allow geolocation</p>;
            case 4:
                return <p>You browser doesn't have the tool to detect your location</p>;
            default:
                return <SkeletonBodyText>Loading...</SkeletonBodyText>;
        }
    };

    return (
        <Page title="Weather forecast app">
            {props.notFound ? renderNotFound() : renderResult()}
        </Page>
    );
};

export default Forecast;
