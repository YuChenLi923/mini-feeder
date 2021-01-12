import React, {FC, HTMLAttributes} from 'react';
import classnames from 'classnames';

export interface LayoutBodyProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}

const LayoutBody: FC<LayoutBodyProps> = function ({
  className,
  children
}: LayoutBodyProps) {
  return (
    <main className={classnames('fy-layout-body', className)}>
      {children}
    </main>
  );
}

export default LayoutBody;
