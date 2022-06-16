import React,{Suspense} from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { renderRoutes, RouteConfig } from 'react-router-config';
import { routerConfig as routes } from './config';
import ErrorBoundary from '@/component/ErrorBoundary';
import Layout from '@/layout';

export default (
  <ErrorBoundary>
    {/* <HashRouter>{renderRoutes(routes as RouteConfig[])}</HashRouter> */}
    <Layout>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Suspense fallback={<>loading</>}>
        {renderRoutes(routes as RouteConfig[])}
        </Suspense>
        </HashRouter>
      {/* </BrowserRouter> */}
    </Layout>
  </ErrorBoundary>
);
