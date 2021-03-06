/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Youtube from "./src/Youtube";
import { Provider } from 'react-redux';
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { applyMiddleware,createStore } from "redux";
import { reducer } from "./reducers/reducer";
import MainRoute from './routes/route.js'

const store=createStore(reducer,applyMiddleware(thunk,logger))

const App= ()  => {
  return (
    <Provider store={store}><MainRoute/></Provider>
  );
};

export default App;
