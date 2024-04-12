export interface Action {
  title: string;
  href: string;
  icon: (props: any) => JSX.Element;
  description?: string;
  iconBackground: string;
  iconForeground: string;
}
