import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from '@/router';
ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={null}>
      {renderRoutes(routes)}
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
