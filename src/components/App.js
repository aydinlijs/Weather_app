import React from "react";
import Forecast from "./Forecast";
import Search from "./Search";
import Favorites from "./Favorites";
import Navigation from "./Navigation";
import { Router, Route } from "react-router-dom";
import history from "../const/nav";
import { connect } from "react-redux";
import { Page, Frame } from "@shopify/polaris";
import {
    fetchForecast,
    displayErrorMessage
} from "./../redux/actions";

class App extends React.Component {
    componentDidMount = () => {
        this.currentPosition();
    };

    currentPosition = () => {
        if (navigator.onLine) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.props.fetchForecast(position.coords, false)
                }, () => {
                    this.props.displayErrorMessage(2);
                });
            } else {
                this.props.displayErrorMessage(3);
            }
        }
        else {
            this.props.displayErrorMessage(1);
        }
    };

    searchByWord = keyword => {
        this.props.fetchForecast({ keyword }, true);
    };

    render() {
        return (
            <Frame>
                <Router history={history}>
                    <Page>
                        <Navigation />
                    </Page>
                    <Route exact path="/">
                        <Page title="Your weather app">
                            <Forecast
                                status={this.props.status}
                                notFound={this.props.notFound}
                                forecast={this.props.currentForecast}
                            />
                            {navigator.onLine ? (
                                <Search searchByWord={this.searchByWord} />
                            ) : null}
                        </Page>
                    </Route>
                    <Route path="/Favs">
                        <Page title="Your favorite locations">
                            <Favorites />
                        </Page>
                    </Route>
                </Router>
            </Frame>
        );
    }
}

const mapStateToProps = ({ forecast }) => {
    return {
        currentForecast: forecast.currentForecast,
        status: forecast.status
    };
};
export default connect(mapStateToProps, {
    fetchForecast,
    displayErrorMessage
})(App);
