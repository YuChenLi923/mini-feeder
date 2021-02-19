import { useStore } from 'react-hookstore';
import './index.scss';
const List = () => {
    const [feed]: [{url: string}, Function] = useStore('feed');
    console.log(feed.url);
    return (
      <article>
        订阅消息列表
      </article>
    );
};

List.propTypes = {

};

export default List;
