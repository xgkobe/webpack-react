import React,{lazy} from 'react';
import Home from '@/pages/home';
import App from '@/views/App';

export const routerConfig = [
  {
    component: lazy(() => import("@/pages/home")),
    // component: Home,
    path: '/home',
  },
  {
    component: lazy(() => import("@/views/App")),
    // component: App,
    path: '/App',
  }
]