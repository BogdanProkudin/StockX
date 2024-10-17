import AddIcon from "@mui/icons-material/Add";
export const aboutArr: { img: string; name: string; path: string }[] = [
  { img: "icon_profile.png", name: "How StockX Works", path: "" },
  { img: "icon_buying.png", name: "Buying Guide", path: "" },
  { img: "icon_selling.png", name: "Selling Guide", path: "" },
  { img: "icon_favorites.png", name: "Verification", path: "" },
  { img: "icon_portfolio.png", name: "Newsroom", path: "" },
  { img: "icon_wallet.png", name: "Company", path: "" },
];

export const sellArr: { img: any; name: string; path: string }[] = [
  { img: `${(<AddIcon />)}`, name: "New Listing", path: "" },
  { img: "icon_buying.png", name: "Current Listings", path: "" },
  { img: "icon_selling.png", name: "Pending Sales", path: "" },
  { img: "icon_favorites.png", name: "History", path: "" },
  { img: "icon_portfolio.png", name: "Professional Tools", path: "" },
];
export const arrLinks: { name: string; path: string }[] = [
  {
    name: "News",
    path: "/News",
  },
  {
    name: "About",
    path: "/About",
  },
  {
    name: "Help",
    path: "/Help",
  },
  {
    name: "Sell",
    path: "/Sell",
  },
];
