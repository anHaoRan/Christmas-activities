import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, match } from 'react-router';
import routes from './pages/App';
import configStore from './store/configStore'
import createBrowserHistory from 'history/lib/createBrowserHistory';

const app = document.getElementById('app');
const store = configStore(window.__INITIAL_STATE__);
let history = createBrowserHistory();
let location = history.createLocation(window.location.pathname + window.location.search);

match({ location, history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router history={history} {...renderProps} />
    </Provider>,
    app
  )
});