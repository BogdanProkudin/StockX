export interface SubLink {
  name: string;
  path: string;
}

export interface NavigationItem {
  title: string;
  path: string;
  sub_link: SubLink[];
}

export interface BellPopUpType {
  setIsOpen: (open: boolean) => void;
  bellRef: React.RefObject<HTMLButtonElement>;
}
