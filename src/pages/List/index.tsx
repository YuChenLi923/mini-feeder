import { useEffect, useState, useCallback } from 'react';
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

    const toDetail = useCallback((url) => {
      window.open(url);
    }, []);
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
        </Loading>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        {data.list.map(({title, snippet, date, link}, index) => (
          <section
            key={`article-${index}`}
            className="mini-feeder-list_item"
            onClick={toDetail.bind(null, link)}
          >
            <h2>
              {title}
              <time>{moment(date).format('YYYY年MM月DD日')}</time>
            </h2>
            <p>{snippet}</p>
          </section>
        ))}
      </article>
    );
};

List.propTypes = {

};

export default List;
