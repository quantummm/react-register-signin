/*
 * @Author: Aiden
 * @Date: 2020-09-30 12:42:01
 * @LastEditTime: 2020-10-02 17:20:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-register-signin/src/App.js
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./views/SignIn/SignIn";
import AppAppBar from "./views/AppAppBar/AppAppBar";
import SignUp from "./views/SignUp/SignUp";
import MyProfile from "./views/MyProfile/MyProfile";
import NotFound from "./views/NotFound/NotFound";
import { AuthenticationManger } from "./components/Authentication/Authentication";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
//import history from './history/History'

function App() {
  return (
    <div>
      <Router>
        <AppAppBar />
        <AuthenticationManger>
          <Switch>
            <PrivateRoute
              exact
              permissions={["admin"]}
              path="/"
              component={MyProfile}
            />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </AuthenticationManger>
      </Router>
    </div>
  );
}

export default App;
