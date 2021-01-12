import { useMemo, ReactElement } from 'react';
import { flatten } from 'lodash';
interface Slots {
  [slotName: string]: ReactElement;
}
const useChildrenSlots = function (children: any): Slots {
  return useMemo(() => {
    if (!children || !children.length) {
      return {};
    }
    const _children: any = { default: [] };
    const len = children.length;
    let rcElemList = [];
    if (!len || !children[len - 1]) {
      rcElemList.push(children);
    } else {
      rcElemList = flatten(children);
    }
    rcElemList.forEach((rcElem: ReactElement) => {
      const { slot } = rcElem.props;
      if (slot) {
        _children[slot] = rcElem;
      } else {
        _children.default.push(rcElem);
      }
    });
    return _children;
  }, [children])
};

export default useChildrenSlots;
