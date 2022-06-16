import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider, message } from 'antd';
import App from './views/App';
import { Provider } from 'react-redux';
import store from './store';
import RouterGallery from './router/index';
import {Router,Route, Link, HashRouter,BrowserRouter, Switch} from 'react-router-dom';

ReactDom.render(
  <ConfigProvider>
    <Provider store={store}>
      {/* <App/> */}
        {/* <BrowserRouter
        basename='/'
        >
          <Link to='/home'>我叫pc</Link>
          <Switch>
            <Route path="/home" render={() => <App />}>

            </Route>
          </Switch>
        </BrowserRouter> */}
      {RouterGallery}
    </Provider>
  </ConfigProvider>, 
  document.getElementById('root')
)

