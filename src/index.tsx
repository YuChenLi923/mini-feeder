import React, { FC, Suspense, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from 'react-hookstore';
import routes from '@/router';
import { checkDevice } from '@/utils/device';
import * as gists from '@/gists';
import * as store from '@/store';
import '@/assets/scss/common.scss';

const App: FC = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _store = store;
  const [, dispatch] = useStore('device');
  const deviceCheck = useCallback(() => {
    dispatch({
      type: 'change',
      ...checkDevice()
    })
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize',deviceCheck);
    return (): void => {
      window.removeEventListener('resize', deviceCheck);
    };
  }, [deviceCheck]);

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        {renderRoutes(routes, { gists })}
      </Suspense>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
