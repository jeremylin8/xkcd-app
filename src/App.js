import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Comic from './components/Comic';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path='/' component={Comic} />
        <Route exact path='/:id' component={Comic} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
