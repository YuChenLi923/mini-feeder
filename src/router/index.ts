import { lazy } from 'react';
import { RouteConfig } from 'react-router-config';
const Home = lazy(() => import('@/pages/Home'));
const List = lazy(() => import('@/pages/List'));
export default [
  {
    component: Home,
    routes: [
      {
        path: '/',
        component: List
      }
    ]
  }
] as unknown as RouteConfig[];
