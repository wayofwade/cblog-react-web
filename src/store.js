/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/3/26.
 */
// import the ability to modify browser history within our router
import createHistory from 'history/createBrowserHistory';

// import our logger for redux

// import a library to handle async with redux

// import the redux parts needed to start our store
import { createStore, applyMiddleware, compose } from 'redux';

// import the middleware for using react router with redux

// import the already combined reducers for redux to use

// import moltin API wrapper for use with Redux

// create and export history for router
export const history = createHistory();

// combine the middlewares we're using into a constant so that it can be used by our store

// declare any enhancers here
const enhancers = [];

// use Redux devtools if available in development
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

}

// compose our middleware
const composedEnhancers = compose(applyMiddleware(), ...enhancers);

// create our redux store using our reducers and our middleware, and export it for use in index.js
const store = createStore(composedEnhancers);

export default store;