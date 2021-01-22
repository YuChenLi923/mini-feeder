import { RouteConfig } from 'react-router-config';

declare interface FCProps extends React.HTMLAttributes<HTMLElement> {
  gists: {
    getRssSaved(): Promise<any>;
    addRssSaved(data: RSS_DATA): Promise<any>;
    goAuth(): void;
  };
  route: RouteConfig;
}

declare enum Device {
  pc = 'pc',
  mPc = 'mPc',
  mobile = 'mobile',
  pad = 'pad'
}
