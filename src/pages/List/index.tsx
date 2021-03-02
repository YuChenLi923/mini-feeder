import { useEffect, useState } from 'react';
import { useStore } from 'react-hookstore';
import moment from 'moment';
import { getRssDetail } from '@/gists';
import Loading from '@/components/Loading';

import './index.scss';
const List = () => {
    const [feed]: [{url: string}, Function] = useStore('feed');
    const [data, setData] = useState({
      title: '',
      description: '',
      list: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!feed.url) {
        return;
      }
      setLoading(true);
      getRssDetail(feed.url).then((data: any) => {
        console.log(data);
        setData(data);
      }).finally(() => {
        setLoading(false);
      });
    }, [feed.url]);
    return (
      <article className="mini-feeder-list">
        <Loading show={loading}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          {data.list.map(({title, content, date, link}, index) => (
            <section
              key={`article-${index}`}
              className="mini-feeder-list_item"
            >
              <h2>
                <a href={link} target="__target">{title}</a>
                <time>发布日期：{moment(date).format('YYYY年MM月DD日')}</time>
              </h2>
              <div
                className="mini-feeder-list_content"
                dangerouslySetInnerHTML={{__html: content}}
              />
            </section>
          ))}
        </Loading>
      </article>
    );
};

List.propTypes = {

};

export default List;
