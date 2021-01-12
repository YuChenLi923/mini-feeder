import React, {FC, HTMLAttributes} from 'react';
import classnames from 'classnames';
import { LayoutProps } from './Layout';

export interface LayoutAsideProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}

const LayoutAside: FC<LayoutProps> = function ({
  className,
  children
}: LayoutAsideProps) {
  return (
    <aside className={classnames('fy-layout-aside', className)}>
      {children}
    </aside>
  );
}

export default LayoutAside;
