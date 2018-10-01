import * as ReactDOM from 'react-dom';
import './index.less';
import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import React from 'react';
import { HashRouter } from 'react-router-dom';

ReactDOM.render( 
  <HashRouter><App/></HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
