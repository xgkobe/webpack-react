import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import App from './views/App';
import { Provider } from 'react-redux';
import store from './store';
import RouterGallery from './router/index';
import 'antd/dist/antd.css';

ReactDom.render(
  <ConfigProvider>
    <Provider store={store}>
      {RouterGallery}
    </Provider>
  </ConfigProvider>, 
  document.getElementById('root')
)

