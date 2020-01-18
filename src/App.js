import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';
import Enjoy from './Enjoy'
import Share from './Share'

class App extends Component {
  constructor(props) {
    super(props);
    
    // this.userAgentApplication = new UserAgentApplication({
    //   auth: {
    //     clientId: config.appId,
    //     redirectUri: config.redirectUri
    //   },
    //   cache: {
    //     cacheLocation: "localStorage",
    //     storeAuthStateInCookie: true
    //   }
    // });
    
    var user = null;
    
    this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null
    };
    
    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }

  async login() {
    this.setState({
      isAuthenticated: true,
      user: {
        displayName: 'Przemyslaw',
        email: 'przemyslaw.zajadlak@avanade.com'
      },
      error: null
    });
    // try {
    //   await this.userAgentApplication.loginPopup(
    //     {
    //       scopes: config.scopes,
    //       prompt: "select_account"
    //     });
    //   await this.getUserProfile();
    // }
    // catch(err) {
    //   var error = {};
  
    //   if (typeof(err) === 'string') {
    //     var errParts = err.split('|');
    //     error = errParts.length > 1 ?
    //       { message: errParts[1], debug: errParts[0] } :
    //       { message: err };
    //   } else {
    //     error = {
    //       message: err.message,
    //       debug: JSON.stringify(err)
    //     };
    //   }
  
    //   this.setState({
    //     isAuthenticated: false,
    //     user: {},
    //     error: error
    //   });
    // }
  }

  logout() {
    this.setState({
      isAuthenticated: false,
      user: {},
      error: null
    });
  }

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token
  
    //   var accessToken = await this.userAgentApplication.acquireTokenSilent({
    //     scopes: config.scopes
    //   });
  
    //   if (accessToken) {
        // Get the user's profile from Graph
        // var user = await getUserDetails(accessToken);
      this.setState({
        isAuthenticated: true,
        user: {
          displayName: 'Przemyslaw',
          email: 'przemyslaw.zajadlak@avanade.com'
        },
        error: null
      });
    //   }
    }
    catch(err) {
      var error = {};
      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }
  
      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />;
    }

    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
            user={this.state.user}/>
          <Container>
            {error}
            <Route exact path="/"
              render={(props) =>
                <Welcome {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  user={this.state.user}
                  authButtonMethod={this.login.bind(this)} /> 
              } />
              <Route exact path="/enjoy"
                render={() =>
                  <Enjoy />
                } />
              <Route exact path="/share"
                render={() =>
                  <Share />
                } />
          </Container>
        </div>
      </Router>
    );
  }

  setErrorMessage(message, debug) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }
}

export default App;