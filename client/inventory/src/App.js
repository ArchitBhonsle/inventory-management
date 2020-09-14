import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//pages
import login from "./pages/login/login";

//components
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
