import ContentLoader from "react-content-loader";
import { components, ControlProps, GroupBase } from "react-select";
import { FilterOption } from "./FilterSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const FilterSkeleton = ({ children, ...props }: any) => (
  <components.Control {...props}>
    <div className="flex items-center justify-center">
      <span className="pr-1 text-sm">Sort:</span>
      <ContentLoader
        speed={1}
        width={70}
        height={15}
        viewBox="0 0 70 15"
        backgroundColor="hsl(0, 0%, 80%)"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="4" ry="4" width="70" height="15" />
      </ContentLoader>
      <span className="pl-1 pr-1 text-customDeel">|</span>
      <ExpandMoreIcon
        fontSize="large"
        style={{ paddingRight: "10px", paddingTop: "1px" }}
      />
    </div>
  </components.Control>
);

export default FilterSkeleton;
