import {
  UserRound,
  ScanBarcode,
  HandCoins,
  Heart,
  GalleryVerticalEnd,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

export const navLinksArr = [
  {
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="m12 20.703.343.667a.748.748 0 0 1-.686 0l-.003-.002-.007-.003-.025-.013a31.138 31.138 0 0 1-5.233-3.576C3.8 15.573 1 12.332 1 8.514v-.001C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.148 31.148 0 0 1-5.233 3.576l-.025.013-.007.003-.002.001ZM6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.655 29.655 0 0 0 4.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.751.751 0 0 1-1.422 0C10.537 5.389 8.841 4 6.736 4Z"></path>
      </svg>
    ),
    path: "settings/liked",
  },
  {
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12 1c3.681 0 7 2.565 7 6v4.539c0 .642.189 1.269.545 1.803l2.2 3.298A1.517 1.517 0 0 1 20.482 19H15.5a3.5 3.5 0 1 1-7 0H3.519a1.518 1.518 0 0 1-1.265-2.359l2.2-3.299A3.25 3.25 0 0 0 5 11.539V7c0-3.435 3.318-6 7-6ZM6.5 7v4.539a4.75 4.75 0 0 1-.797 2.635l-2.2 3.298-.003.01.001.007.004.006.006.004.007.001h16.964l.007-.001.006-.004.004-.006.001-.006a.017.017 0 0 0-.003-.01l-2.199-3.299a4.753 4.753 0 0 1-.798-2.635V7c0-2.364-2.383-4.5-5.5-4.5S6.5 4.636 6.5 7ZM14 19h-4a2 2 0 1 0 4 0Z"></path>
      </svg>
    ),
    path: "/settings/notifications",
  },
  {
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
      </svg>
    ),
    path: "/profile",
  },
];
export const profileArr: {
  img: any;
  name: string;
  path: string;
  description: string;
}[] = [
  {
    img: <UserRound size={26} />,
    name: "Profile",
    path: "",
    description: "Shipping,Email,Password,Shoe Size",
  },
  {
    img: <ScanBarcode size={26} />,
    name: "Buying",
    path: "",
    description: "Active Bids, In-Progress, Completed Orders",
  },
  {
    img: <HandCoins size={26} />,
    name: "Selling",
    path: "",
    description: "Active Asks, Sales, Seller Profile",
  },
  {
    img: <Heart size={26} />,
    name: "Favorites",
    path: "",
    description: "Items and lists you've saved",
  },
  {
    img: <GalleryVerticalEnd size={26} />,
    name: "Portfolio",
    path: "",
    description: "See the value of your items",
  },
  {
    img: <Wallet size={26} />,
    name: "Wallet",
    path: "",
    description: "See the value of your items",
  },
  {
    img: <Settings size={26} />,
    name: "Settings",
    path: "",
    description: "Security and Notifications",
  },
  { img: <LogOut size={26} />, name: "Log Out", path: "", description: "" },
];
