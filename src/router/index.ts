import { lazy } from 'react';
import { RouteConfig } from 'react-router-config';
const Layout = lazy(() => import('@/pages/Layout'));
const Home = lazy(() => import('@/pages/Home'));
export default [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        component: Home
      }
    ]
  }
] as RouteConfig[];
