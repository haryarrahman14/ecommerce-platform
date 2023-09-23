export interface INavMenu {
  title: string;
  icon: string;
  iconActive: string;
  href: string;
}

export interface INavigation {
  navigation: INavMenu[];
}
