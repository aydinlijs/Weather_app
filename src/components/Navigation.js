import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from "@shopify/polaris";

const Navigation = () => {
    return (
        <Page>
            <div className="nav-bar">
                <Link to="/">Home</Link>
                <Link to="/Favs">Favs</Link>
            </div>
        </Page>
    )
}

export default Navigation;