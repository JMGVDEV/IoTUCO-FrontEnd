import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MainPage from '../pages/MianPage'
import WelcomePage from '../pages/WelcomePage'
import AdminUsers from '../pages/AdminUsers'

const App = () => (                                                     //de esta manera funciona igual que usando
                                                                        //function APP comentado abajo, es una manera mas
                                                                        //moderna de trabajar javascript
   <div>                                                                   
                                                                    
    <BrowserRouter>                                                                   
        <Switch>
                <Route exact path = "/" component = {MainPage}/>
                <Route exact path = "/welcome" component = {WelcomePage}/>
                <Route exact path = "/adminusers" component = {AdminUsers}/>
        </Switch>
    </BrowserRouter>
    </div> 
)

export default App