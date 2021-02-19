import React, { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { useStore } from 'react-hookstore';
import { FCProps } from '@/types/common';
import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Setting, { SettingRef } from '@/pages/Setting';
import AddRss, { AddRssRef } from '@/pages/AddRss';
import './index.scss';

const Home = ({
  gists,
  route
}: FCProps) => {
  const settingRef: Ref<SettingRef> = useRef(null);
  const addRssRef: Ref<AddRssRef> = useRef(null);
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStore('feed');
  const onSystemClick = useCallback(() => {
    if (settingRef.current) {
      settingRef.current.show();
    }
  }, []);

  // 打开新增
  const onAdd = useCallback(() => {
    if (addRssRef.current) {
      addRssRef.current.show();
    }
  }, []);

  // 打开编辑
  const onEdit = useCallback((data) => {
    if (addRssRef.current) {
      addRssRef.current.show(data);
    }
  }, []);

  // 查询订阅信息
  const queryList = useCallback(async () => {
    setLoading(true);
    try {
      const data = await gists.getRssSaved();
      setFeedList(data.filter((item: any) => item));
    } finally {
      setLoading(false);
    }
  }, [gists]);

  // 前往相应订阅列表
  const toFeedList = useCallback((url: string) => {
    dispatch({
      type: 'select',
      url
    });
  }, [dispatch]);

  const removeFeed = useCallback(async (url: string) => {
    const removeSuccess = await gists.removeRss(url);
    if (!removeSuccess) {
      alert('删除失败,请稍后重试');
    }
    queryList();
  }, [gists, queryList]);

  useEffect(() => {
    queryList();
  }, [queryList]);
  return (
    <Layout className="mini-feeder">
      <Layout.Aside className="mini-feeder_aside">
        <section className="mini-feeder_order">
          <h1 className="mini-feeder_order-title">我的订阅</h1>
          <Loading show={loading}>
            <ul className="mini-feeder_order-list">
              {feedList.map(({url, title}, index) => (
                <li
                  key={`feed-item-${index}`}
                >
                  <span onClick={toFeedList.bind(null, url)}>{title}</span>
                  <div className="mini-feeder_order-list_opera">
                    <button
                      className="mini-feeder_order-list_btn edit"
                      onClick={onEdit.bind(null, {url, title})}
                    >
                      编辑
                    </button>
                    <button
                      className="mini-feeder_order-list_btn delete"
                      onClick={removeFeed.bind(null, url)}
                    >
                      删除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Loading>
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
      <AddRss ref={addRssRef} $submit={queryList}/>
    </Layout>
  );
};

Home.propTypes = {

};

export default Home;
