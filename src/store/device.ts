import { createStore } from 'react-hookstore';
import { checkDevice } from '@/utils/device';
const deviceStore = createStore(
  'device',
  {
    ...checkDevice(),
  },
  (state: any, action: any) => {
    switch (action.type) {
      case 'change':
        return {
          ...state,
          name: action.name
        }
    }
  }
)

export default deviceStore;
