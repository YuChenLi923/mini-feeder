import React, {useMemo, FC, HTMLAttributes} from 'react';
import { useStore } from 'react-hookstore';
import { range } from '@/utils/number-handler';
import './col.scss';

export type ColPops = HTMLAttributes<HTMLDivElement> & {
  [device in Device]?: {
    span?: number;
    offset?: number;
  } | number
} & {
  span?: number;
  offset?: number;
  className?: string;
};

const Col: FC<ColPops> = function (props: ColPops) {
  const {
    className = '',
    children,
    span = 1,
    offset = 0,
  } = props;
  const [device]: [{name: Device}, Function] = useStore('device');
  const $span: number = useMemo(() => {
    const _device = props[device.name];
    if (typeof _device === 'number') {
      return _device;
    } else {
      return _device?.span || span;
    }
  }, [span, device, props])
  const width = useMemo(() => {
    return range(Math.floor($span), [0, 20]) * 5 + '%'
  }, [$span]);
  const marginLeft = useMemo(() => {
    const _device = props[device.name];
    let _offset = offset;
    if (typeof _device !== 'number') {
      _offset = _device?.offset || offset;
    }
    return range(Math.floor(_offset), [0, 20]) * 5 + '%'
  }, [offset, props, device]);
  return (
    <div style={{ width, marginLeft }}
         className={'fy-col ' + className}
    >
      {children}
    </div>
  );
};
export default Col;
