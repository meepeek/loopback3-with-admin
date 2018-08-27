import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { createBrowserHistory } from 'history';
import { App } from 'app';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();

// render react DOM
ReactDOM.render(
  <App history={history} />
  ,document.getElementById('root')
);
