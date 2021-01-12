import React, {FC, HTMLAttributes} from 'react';
import classnames from 'classnames';
import LayoutBody from './LayoutBody';
import LayoutFooter from './LayoutFooter';
import LayoutAside from './LayoutAside';


export type LayoutFC<P = {}> = FC<P> & {
  Body: typeof LayoutBody;
  Footer: typeof LayoutFooter;
  Aside: typeof LayoutAside;
};

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type?: string;
  backgroundImg?: string;
}

const Layout: LayoutFC<LayoutProps> = function ({
  children,
  className,
  type = 'normal',
  backgroundImg
}: LayoutProps) {
  return (
    <div
      className={classnames(`fy-layout-${type}`, className)}
    >
      {children}
      {backgroundImg &&
        <div
          className="fy-layout-bg"
          style={{
            backgroundImage: `url(${backgroundImg})`
          }}
        />
      }
    </div>
  );
}
Layout.Body = LayoutBody;
Layout.Footer = LayoutFooter;
Layout.Aside = LayoutAside;
export default Layout;
