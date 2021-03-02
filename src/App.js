import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Statistics } from "./pages/Statistics";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container pt-1">
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/about"} component={About} />
          <Route path={"/settings"} component={Settings} />
          <Route path={"/statistics"} component={Statistics} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
