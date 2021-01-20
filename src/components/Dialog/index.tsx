import React, {
  HTMLAttributes,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  useCallback,
  MouseEvent,
  ReactElement
} from 'react';
import classnames from 'classnames';
import Icon from '@/components/Icon';
import './index.scss';

export interface DialogProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  visiable?: boolean;
}
export interface DialogRef {
  show: (ContentComponent: ReactElement | null) => void;
  close: () => void;
}
const stopClick = function (e: MouseEvent): void {
  e.stopPropagation();
}
const Dialog: ForwardRefRenderFunction<DialogRef, DialogProps> = function ({
  children,
  visiable = false
}: DialogProps, ref) {
  const [open, setOpen] = useState(visiable);
  const [ContentComponent, setContentComponent]: [ReactElement | undefined | null, Function] = useState(null);
  const close = useCallback(() => {
    setOpen(false);
  }, []);
  useImperativeHandle(ref, (): DialogRef => {
    return {
      show(ContentComponent): void {
        if (ContentComponent) {
          setContentComponent(ContentComponent);
        }
        setOpen(true)
      },
      close
    };
  }, [close]);
  return (
    <article
      className={classnames('fy-dialog', {
        open
      })}
      onClick={close}
    >
      <div
        className="fy-dialog_container"
        onClick={stopClick}
      >
        <Icon
          className="fy-dialog_close"
          name="close"
          onClick={close}
        />
        {ContentComponent ? ContentComponent : children}
      </div>
    </article>
  )
}

export default forwardRef(Dialog);
