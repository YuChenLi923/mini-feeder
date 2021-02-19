import { createStore } from 'react-hookstore';
const feedStore = createStore(
  'feed',
  {
    url: '' // 当前选中的订阅地址
  },
  (state: any, action: any) => {
    switch (action.type) {
      case 'select':
        return {
          ...state,
          url: action.url
        }
    }
  }
)

export default feedStore;
