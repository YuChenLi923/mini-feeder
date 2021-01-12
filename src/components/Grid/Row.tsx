import React, {FC, HtmlHTMLAttributes} from 'react';
import './row.scss';
export interface RowProps extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Row: FC<RowProps> = function (props: RowProps) {
  const {
    className = '',
    children
  } = props;
  return (
    <div className={'fy-row ' + className}>
      {children}
    </div>
  );
};

export default Row;
