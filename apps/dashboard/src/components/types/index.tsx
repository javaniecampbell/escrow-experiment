import React from "react";

export interface Action {
  title: string;
  href: string;
  icon: (props: any) => React.ReactNode;
  description?: string;
  iconBackground: string;
  iconForeground: string;
}
