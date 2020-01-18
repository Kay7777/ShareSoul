import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({currentUser}) => (
    <div style={{paddingBottom: 20}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <a className="navbar-brand" href="/">ShareSoul</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/user">My</a>
            {currentUser ? 
            <div>
                <a className="nav-item nav-link active" href="/signin" onClick={() => auth.signOut()}>LogOut</a>
                <a className="nav-item nav-link active" href="/friend" >SoulFriends</a>
            </div>
            :
            <a className="nav-item nav-link" href="/signin">SignIn</a>
            }
            {/* <a class="nav-item nav-link" href="#">Pricing</a> */}
            </div>
        </div>
        </nav>
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
  
export default connect(mapStateToProps)(Header);