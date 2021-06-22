import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';
import './index.scss';
export interface LoadingProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  type?: 'normal' | 'dark' | 'plain';
  page?: boolean;
  show?: boolean;
}

const Loading: FC<LoadingProps> = function({
  className = '',
  type = 'normal',
  show = true,
  children,
  page = false
}: LoadingProps) {
  return (
    <div
      className={classnames(
        'fy-loading',
        `type-${type}`,
        className, {
          box: !!children,
          hidden: !show,
          page
        }
      )}
    >
      <div className="fy-loading_content">
        {children}
      </div>
    </div>
  );
};

export default Loading;
