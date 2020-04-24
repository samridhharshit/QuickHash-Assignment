import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login_Register from "./Components/LoginRegister";
// import withAuth from "./Components/WithAuth";
// import AlreadyAuthenticated from "./Components/AlreadyAuthenticated";
import Dummy from "./Components/dummy";
import UploadImage from "./Components/UploadImage";
import PreLoginNavigation from "./Components/PreLoginNavigation";
import UserDisplay from "./Components/UserDisplay";

function App() {
  return (
    <div className="App">
        <div className="row navigation-container">
            <div className="col-sm-12 navigation">
                <PreLoginNavigation />
            </div>
        </div>
      <Router>
        <Switch>
          <Route exact path="/" component={(Login_Register)} />
          <Route exact path="/uploadImage/:name" component={(UploadImage)} />
          <Route exact path="/user/:name" component={UserDisplay} />
          <Route path="/dummy" component={Dummy} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
