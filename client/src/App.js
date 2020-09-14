import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//pages
import login from "./pages/login/login";
import home from "./pages/home/home";

//components
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
