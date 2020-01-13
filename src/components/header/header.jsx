import React from "react";

const Header = () => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/user">My</a>
            <a className="nav-item nav-link" href="/signin">SignIn</a>
            {/* <a class="nav-item nav-link" href="#">Pricing</a> */}
            </div>
        </div>
        </nav>
    </div>
)

export default Header;