import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

// import pages
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/signinpage/signinpage';
import Header from './components/header/header';
import CreateStoryPage from "./pages/createstorypage/createstorypage";
import UserPage from "./pages/userpage/userpage";
import FriendPage from "./pages/friendpage/friendpage";

// import firebase
import { auth, createUserProfileDocument } from './firebase/firebase';

// import redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import from user redux
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // execute update user-redux: user information
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      // setCurrentUser(userAuth);
    });
  }

  // the Whole session finishes, re-call auth update to clear the auth
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path="/createstory" component={CreateStoryPage} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/friend" component={FriendPage} />
          <Route
          // if auth, render into homepage.
            exact
            path='/signin'
            render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />)}
          />
        </Switch>
      </div>
    );
  }
}

// user-redux selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// update user-redux: user information
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);