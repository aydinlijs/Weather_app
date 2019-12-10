import React from 'react';
import { Button, Card, Toast } from "@shopify/polaris";
import { connect } from 'react-redux';
import { fetchForecast } from './../redux/actions';
import history from './../const/nav';

class Favorites extends React.Component {
    state = { favs: [], toast: false };

    componentDidMount() {
        this.fetchFavs();
    }

    fetchFavs = () => {
        const favoriteds = JSON.parse(localStorage.getItem("favLocations"));
        this.setState({
            favs: favoriteds
        })
    }

    seeForecast = (id) => {
        const fav = this.state.favs.find(fa => fa.id === id);
        this.props.fetchForecast({ keyword: fav.name }, true);
        history.push('/')
    }

    removeFromFavs = (id) => {
        const favs = JSON.parse(localStorage.getItem("favLocations"));
        const newFavs = favs.filter(fav => fav.id !== id);
        localStorage.setItem("favLocations", JSON.stringify(newFavs));
        this.fetchFavs();
        this.setState({ toast: true });
    };

    renderFavs = () => {
        return this.state.favs.length ? this.state.favs.map(fav => (
            <div className="fav-box" key={fav.id}>
                <p><b>Name</b>: {fav.name}</p>
                <p><b>Latitude</b>: {fav.coords.lat}</p>
                <p><b>Longitude:</b> {fav.coords.lon}</p>
                <p><b>ID:</b> {fav.id}</p>
                <Button onClick={() => this.seeForecast(fav.id)}>Fetch forecast</Button>
                <Button onClick={() => this.removeFromFavs(fav.id)}>Remove from favs</Button>
            </div>
        )) : <Card sectioned><p>You yet have no fav locations</p></Card>
    }

    toggleToast = () => {
        this.setState({ toast: false })
    }


    render() {
        const toastMarkup = this.state.toast ? (
            <Toast
                content={'Removed from favorites'}
                onDismiss={this.toggleToast}
            />
        ) : null;
        return (
            <div className="fav-boxes">
                {this.renderFavs()}
                {toastMarkup}
            </div>
        )
    }
}

export default connect(null, { fetchForecast })(Favorites);