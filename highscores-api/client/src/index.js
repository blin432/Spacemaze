import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import * as serviceWorker from './js/serviceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom';
import './css/index.css';
import {createStore } from 'redux';
import {mainReducer} from './reducers/main-reducer.js'
import {Provider} from 'react-redux';

let store = createStore(mainReducer);

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

serviceWorker.unregister();
