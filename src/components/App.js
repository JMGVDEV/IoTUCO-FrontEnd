import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ConfigActions from '../pages/ConfigActions';
import Diseases from '../pages/Diseases';
import Users from '../pages/Users';
import DB1 from '../pages/GHCamas'
import DB2 from '../pages/GEvents'
import DB3 from '../pages/GGradosDia'
import DB4 from '../pages/GDiseases'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LoginPage} />
        <AuthenticatedRoute path="/home" component={HomePage} />
        <AuthenticatedRoute path="/users" component={Users} />
        <AuthenticatedRoute path="/configactions" component={ConfigActions} />
        <AuthenticatedRoute path="/diseases" component={Diseases} />
        <AuthenticatedRoute path="/DB1" component={DB1} />
        <AuthenticatedRoute path="/DB2" component={DB2} />
        <AuthenticatedRoute path="/DB3" component={DB3} />
        <AuthenticatedRoute path="/DB4" component={DB4} />


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
