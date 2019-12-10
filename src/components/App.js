import React from "react";
import Forecast from "./Forecast";
import Search from "./Search";
import Favorites from "./Favorites";
import Navigation from "./Navigation";
import weather from "./../const/api";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
    state = {
        currentForecast: "",
        forecastStatus: 1,
        notFound: false
    };

    componentDidMount = () => {
        this.currentPosition();
    };

    currentPosition = () => {
        this.setState({ forecastStatus: 1, notFound: false })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, () => {
                this.setState({ forecastStatus: 3 });
            });
        } else {
            this.setState({ forecastStatus: 4 });
        }
    };
    
    showPosition = async position => {
        const { latitude, longitude } = position.coords;
        await weather
            .get(
                `weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=95e119746283ccb68ff96ce7a9ce3f6b`
            )
            .then(res => {
                this.setState({ currentForecast: res.data });
            });
        this.setState({ forecastStatus: 2 });
    };

    searchByWord = async keyword => {
        this.setState({ forecastStatus: 1 });
        await weather
            .get(
                `weather?q=${keyword}&units=metric&APPID=95e119746283ccb68ff96ce7a9ce3f6b`
            )
            .then(res => {
                this.setState({ currentForecast: res.data, notFound: false });
            })
            .catch(res => {
                this.setState({ notFound: true, needReset: false });
            });
        this.setState({ forecastStatus: 2 });
    };

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Navigation />
                    <Route exact path="/">
                        <Forecast
                            status={this.state.forecastStatus}
                            notFound={this.state.notFound}
                            forecast={this.state.currentForecast}
                        />
                        <Search searchByWord={this.searchByWord} />
                    </Route>
                    <Route path="/Favs">
                        <Favorites />
                    </Route>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default App;
