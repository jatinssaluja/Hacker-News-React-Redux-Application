import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './store/configure_store';
import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);




const jsx = (

   <Provider store={createStoreWithMiddleware(rootReducer)}>

        <AppRouter/>

      </Provider>
	);


ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
