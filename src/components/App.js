import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import WelcomePage from '../pages/WelcomePage'
import AdminUsers from '../pages/AdminUsers'
import ConfigActions from '../pages/ConfigActions'
import BedState from '../pages/BedState'

function App() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={LoginPage} />
                <AuthenticatedRoute exact path="/welcome" component={WelcomePage} />
                <AuthenticatedRoute path="/adminusers" component={AdminUsers} />
                <AuthenticatedRoute path="/configactions" component={ConfigActions} />
                <AuthenticatedRoute path="/growbedstatus" component={BedState} />
            </div>
        </Router>
    );

}

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />

                )

        }
    />
};

export default App;