import { FCProps } from '@/types/common';
import { renderRoutes } from 'react-router-config';
import Icon from '@/components/Icon';
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import './index.scss';
import { Link } from 'react-router-dom';

const Home = ({
  gists,
  route
}: FCProps) => {
  useEffect(() => {
    gists.getRssSaved().then((data: any) => console.log(data));
  }, [gists]);
  return (
    <Layout className="mini-feeder">
      <Layout.Aside className="mini-feeder_aside">
        <section className="mini-feeder_order">
          <h1 className="mini-feeder_order-title">我的订阅</h1>
          <ul className="mini-feeder_order-list">
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
            <Link to=""><li>321321</li></Link>
          </ul>
        </section>
        <section className="mini-feeder_operas">
          <button
            className="mini-feeder_operas-item"
            title="我的收藏"
          >
            <Icon name="collect"/>
          </button>
          <button
            className="mini-feeder_operas-item"
            title="系统设置"
          >
            <Icon name="setting"/>
          </button>
          <button
            className="mini-feeder_operas-item"
            title="退出"
          >
            <Icon name="exit"/>
          </button>
        </section>
      </Layout.Aside>
      <Layout.Body>
        {renderRoutes(route.routes)}
      </Layout.Body>
    </Layout>
  );
};

Home.propTypes = {

};

export default Home;
