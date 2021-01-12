import React, { HTMLAttributes, FC } from 'react';
import '@/assets/icon';
import './index.scss';

export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
  name: 'collect' | 'exit' | 'setting';
}

const Icon: FC<IconProps> = function (props: IconProps) {
  const {
    className,
    name
  } = props;
  return (
    <svg {...props}
         aria-hidden="true"
         className={'fy-icon ' +  className}
    >
      <use xlinkHref={`#icon-${name}`}/>
    </svg>
  );
}
export default Icon;
