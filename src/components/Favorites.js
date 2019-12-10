import React from 'react';
import { Page, Button } from "@shopify/polaris";

class Favorites extends React.Component {
    state = { favs: [] };

    componentDidMount() {
        this.fetchFavs();
    }

    fetchFavs = () => {
        const favoriteds = JSON.parse(localStorage.getItem("favLocations"));
        this.setState({
            favs: favoriteds
        })
    }

    removeFromFavs = (id) => {
        const favs = JSON.parse(localStorage.getItem("favLocations"));
        const newFavs = favs.filter(fav => fav.id !== id);
        localStorage.setItem("favLocations", JSON.stringify(newFavs));
        this.fetchFavs();
    };

    renderFavs = () => {
        return this.state.favs.length ? this.state.favs.map(fav => (
            <div className="fav-box" key={fav.id}>
                <p><b>Name</b>: {fav.name}</p>
                <p><b>Latitude</b>: {fav.coord.lat}</p>
                <p><b>Longitude:</b> {fav.coord.lon}</p>
                <p><b>ID:</b> {fav.id}</p>
                <Button>Fetch forecast</Button>                
                <Button onClick={() => this.removeFromFavs(fav.id)}>Remove from favs</Button>
            </div>
        )) : <p>You yet have no fav locations</p>
    }


    render() {
        return (
            <Page title="Your favorite locations">
                <div className="fav-boxes">
                    {this.renderFavs()}
                </div>
            </Page>
        )
    }
}

export default Favorites;