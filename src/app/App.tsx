import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { AppRoutes } from './App.router';
import index from '@pages/base/index';

class App extends Component<any, any>{

  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/index/{}" />
        <Route path='/index/{}' component={index} />
        {renderRoutes(AppRoutes)}
      </Switch>

    );
  }
}
export default App;