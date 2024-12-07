import { CheckIcon } from "lucide-react";
import { OptionProps, components } from "react-select";

const Option = (props: OptionProps<any>) => (
  <components.Option {...props}>
    {props.data.label}
    {props.isSelected && <CheckIcon className="ml-2 h-4 w-4 text-blue-500" />}
  </components.Option>
);

export default Option;
