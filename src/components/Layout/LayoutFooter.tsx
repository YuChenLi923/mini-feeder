import React, {FC, HTMLAttributes} from 'react';
import classnames from 'classnames';
export interface LayoutFooterProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}

const LayoutFooter: FC<LayoutFooterProps> = function ({
  className,
  children
}: LayoutFooterProps) {
  return (
    <div className={classnames('fy-layout-footer', className)}>
      {children}
    </div>
  );
}

export default LayoutFooter;
