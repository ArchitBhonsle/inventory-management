import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//pages
import login from "./pages/login/login";
import home from "./pages/home/home";
import history from "./pages/history/history";
import admin from "./pages/admin/admin";
import adminregister from "./pages/adminregister/adminregister";
import items from "./pages/items/items";
import totalview from "./pages/totalview/totalview";

//components
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={login} />
            <Route exact path="/home" component={home} />
            <Route exact path="/history/:id" component={history} />
            <Route exact path="/admin" component={admin} />
            <Route exact path="/adminregister" component={adminregister} />
            <Route exact path="/items" component={items} />
            <Route exact path="/totalview/:id" component={totalview} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
