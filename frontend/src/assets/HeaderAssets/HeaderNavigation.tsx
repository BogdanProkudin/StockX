import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ClearIcon from "@mui/icons-material/Clear";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
export const aboutArr: { img: any; name: string; path: string }[] = [
  {
    img: <EmojiObjectsOutlinedIcon fontSize="small" />,
    name: "How StockX Works",
    path: "",
  },
  { img: <MoveToInboxIcon fontSize="small" />, name: "Buying Guide", path: "" },
  { img: <LocalAtmIcon fontSize="small" />, name: "Selling Guide", path: "" },
  {
    img: <VerifiedOutlinedIcon fontSize="small" />,
    name: "Verification",
    path: "",
  },
  { img: <ArticleOutlinedIcon fontSize="small" />, name: "Newsroom", path: "" },
  { img: <ClearIcon fontSize="small" />, name: "Company", path: "" },
];

export const sellArr: { img: any; name: string; path: string }[] = [
  { img: <AddIcon fontSize="medium" />, name: "New Listing", path: "" },
  {
    img: <FormatListBulletedIcon fontSize="small" />,
    name: "Current Listings",
    path: "",
  },
  {
    img: <AccessTimeIcon fontSize="small" />,
    name: "Pending Sales",
    path: "",
  },
  { img: <LocalAtmIcon fontSize="small" />, name: "History", path: "" },
  {
    img: <ClearIcon fontSize="small" />,
    name: "Professional Tools",
    path: "",
  },
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
