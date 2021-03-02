declare interface RouteFCProps extends React.HTMLAttributes<HTMLElement> {
  route: import('react-router-config').RouteConfig;
}

declare enum Device {
  pc = 'pc',
  mPc = 'mPc',
  mobile = 'mobile',
  pad = 'pad'
}


