import { useEffect, useCallback } from 'react';
import './index.scss';

const Layout = ({
  gists
}: any) => {
  const add = useCallback(() => {
    gists.updateRssSaved([
      {
        title: 'RSS1',
        url: 'www.baidu.com'
      }
    ])
  }, [gists]);
  useEffect(() => {
    gists.getRssSaved().then((data: any) => console.log(data));
  }, [gists])
  return (
    <div>
      Layout
      <button onClick={add}>add</button>
    </div>
  );
};

Layout.propTypes = {

};

export default Layout;
