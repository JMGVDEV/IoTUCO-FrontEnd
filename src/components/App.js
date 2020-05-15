import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ConfigActions from '../pages/ConfigActions';
import Diseases from '../pages/Diseases';
import Users from '../pages/Users';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LoginPage} />
        <AuthenticatedRoute path="/home" component={HomePage} />
        <AuthenticatedRoute path="/users" component={Users} />
        <AuthenticatedRoute path="/configactions" component={ConfigActions} />
        <AuthenticatedRoute path="/diseases" component={Diseases} />
      </div>
    </Router>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default App;
