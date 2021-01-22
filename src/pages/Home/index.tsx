import React, { Ref, useCallback, useEffect, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { FCProps } from '@/types/common';
import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import Setting, { SettingRef } from '@/pages/Setting';
import AddRss, { AddRssRef } from '@/pages/AddRss';
import './index.scss';
import { Link } from 'react-router-dom';

const Home = ({
  gists,
  route
}: FCProps) => {
  const settingRef: Ref<SettingRef> = useRef(null);
  const addRssRef: Ref<AddRssRef> = useRef(null);
  const onSystemClick = useCallback(() => {
    if (settingRef.current) {
      settingRef.current.show();
    }
  }, []);
  const onAdd = useCallback(() => {
    if (addRssRef.current) {
      addRssRef.current.show();
    }
  }, [])
  useEffect(() => {
    gists.getRssSaved().then((data: any) => console.log(data));
  }, [gists]);
  return (
    <Layout className="mini-feeder">
      <Layout.Aside className="mini-feeder_aside">
        <section className="mini-feeder_order">
          <h1 className="mini-feeder_order-title">我的订阅</h1>
          <ul className="mini-feeder_order-list">
            <Link to="/list"><li>321321</li></Link>
            <Link to="/list"><li>321321</li></Link>
            <Link to="/list"><li>321321</li></Link>
            <Link to="/list"><li>321321</li></Link>
            <Link to="/list"><li>321321</li></Link>
            <Link to="/list"><li>321321</li></Link>
            <Link to="/list"><li>321321</li></Link>
          </ul>
        </section>
        <section className="mini-feeder_operas">
          <button
            className="mini-feeder_operas-item"
            title="添加订阅"
            onClick={onAdd}
          >
            <Icon name="plus"/>
          </button>
          <button
            className="mini-feeder_operas-item"
            title="我的收藏"
          >
            <Icon name="collect"/>
          </button>
          <button
            className="mini-feeder_operas-item"
            title="系统设置"
            onClick={onSystemClick}
          >
            <Icon name="setting"/>
          </button>
          <button
            className="mini-feeder_operas-item"
            title="反馈"
          >
            <a href={process.env.REACT_APP_ISSUE}>
              <Icon name="issue"/>
            </a>
          </button>
        </section>
      </Layout.Aside>
      <Layout.Body>
        {renderRoutes(route.routes)}
      </Layout.Body>
      <Setting ref={settingRef}/>
      <AddRss ref={addRssRef}/>
    </Layout>
  );
};

Home.propTypes = {

};

export default Home;
