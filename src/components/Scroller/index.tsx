import React, { FC, useEffect, useCallback, HTMLAttributes, useRef, RefObject, useState, MutableRefObject } from 'react';
import { useStore } from 'react-hookstore';
import Loading from '@/components/Loading';
import useSlots from '@/hooks/useSlots';
import './index.scss';
const docEl = document.documentElement;
export interface ScrollerProps extends HTMLAttributes<HTMLDivElement> {
  scrollDis?: number;
  $load?: () => Promise<boolean>;
}

const Scroller: FC<ScrollerProps> = function (props: ScrollerProps) {
  const {
    children,
    scrollDis = 30,
    $load
  } = props;

  const [device]: [{name: Device; dpr: number}, Function] = useStore('device');
  const slots = useSlots(children);
  const scrollerEl: RefObject<HTMLDivElement> = useRef(null);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const preDis: MutableRefObject<number> = useRef(-Infinity);
  const preResizeRef: MutableRefObject<EventListener|null> = useRef(null);
  const onResize = useCallback(() => {
    if (loading) {
      return;
    }
    if (scrollerEl && scrollerEl.current) {
      const rectData = scrollerEl.current.getBoundingClientRect();
      const dis: number = ((docEl.clientHeight) - (rectData.top + rectData.height));
      if (dis > -scrollDis && dis > preDis.current) {
        setLoading(true)
        if ($load) {
          $load().then((isRest) => {
            if (!isRest && preResizeRef.current) {
              setEnd(true);
              window.removeEventListener('scroll', preResizeRef.current, true);
            }
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }
      preDis.current = dis;
    }
  }, [scrollDis, loading, $load]);
  useEffect(() => {
    if (!scrollerEl || !scrollerEl.current || end) {
      return;
    }
    const rectData = scrollerEl.current.getBoundingClientRect();
    if (rectData.height < docEl.clientHeight / device.dpr) {
      console.warn(`[fy Scroller]: It doesn't work when the scroller's height lessthan viewport's height`);
      return;
    }
    if (preResizeRef.current) {
      window.removeEventListener('scroll', preResizeRef.current, true);
    }
    window.addEventListener('scroll', onResize, true);
    preResizeRef.current = onResize;
    return (): void => {
      window.removeEventListener('scroll', onResize, true);
    };
  }, [onResize, end]);
  return (
    <div ref={scrollerEl}>
      {slots.default}
      {loading && (slots.loading ||
        <Loading/>
      )}
      {end && !loading &&
        <div className="fy-scroller_end">
          已经到底啦 Σ( ° △ °|||)︴
        </div>
      }
    </div>
  );
};
export default Scroller;
