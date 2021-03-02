import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';
import './index.scss';
export interface LoadingProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  type?: 'normal' | 'dark' | 'plain';
  show?: boolean;
}

const Loading: FC<LoadingProps> = function({
  className = '',
  type = 'normal',
  show = true,
  children
}: LoadingProps) {
  return (
    <div
      className={classnames(
        'fy-loading',
        `type-${type}`,
        className, {
          box: !!children,
          hidden: !show
        }
      )}
    >
      {children}
    </div>
  );
};

export default Loading;
