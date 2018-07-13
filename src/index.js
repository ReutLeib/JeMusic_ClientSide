import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import ReactRouter from './router/router'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Open Sans:300,600,700', 'sans-serif',
                'Alfa Slab One', 'cursive']
  }
});

ReactDOM.render(
    <Router>
        <ReactRouter/>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
