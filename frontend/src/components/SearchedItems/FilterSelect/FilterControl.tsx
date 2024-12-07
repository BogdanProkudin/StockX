import { ControlProps, components } from "react-select";
import FilterSkeleton from "./FilterSkeleton";

const Control = ({ children, ...props }: ControlProps<any, false>) => (
  <components.Control {...props}>
    <span className="text-sm">Sort:</span> {children}
  </components.Control>
);

export default Control;
