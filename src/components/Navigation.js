import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/Favs">Favs</Link>
        </div>
    )
}

export default Navigation;