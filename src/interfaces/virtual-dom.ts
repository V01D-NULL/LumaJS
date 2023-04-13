export interface IProps {
  [key: string]: any;
}

export interface IVirtualDomComponent {
  component: string;
  props?: IProps;
  children?: Array<Object>;
  eventListeners?: Array<Function>;
}
