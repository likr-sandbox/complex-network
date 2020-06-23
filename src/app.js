import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Root from "./pages/Root";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Root} exact />
      </Switch>
    </Router>
  );
};

export default App;
