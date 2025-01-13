import React, { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function ShoeSizeSelector({
  shoeSize,
  setShoeSize,
}: {
  shoeSize: string;
  setShoeSize: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setShoeSize(event.target.value);
  };

  return (
    <FormControl className="">
      <h1>Shoe Size</h1>
      <Select
        className="border-brand-primary bg-background-accent-1 text-text-prim relative h-12 w-full min-w-0 appearance-none rounded-md border border-[#006340] bg-[#F4F3F1] px-4 pl-0 text-lg outline-2 outline-offset-2 outline-transparent transition duration-200"
        value={shoeSize}
        onChange={handleChange}
        sx={{
          "& .MuiSelect-select": {
            fontWeight: "500",
            color: "black",
            fontSize: "16px",
          },
        }}
      >
        {[
          "3.5",
          "4",
          "4.5",
          "5",
          "5.5",
          "6",
          "6.5",
          "7",
          "7.5",
          "8",
          "8.5",
          "9",
          "9.5",
          "10",
          "10.5",
          "11",
          "11.5",
          "12",
        ].map((size) => (
          <MenuItem
            style={{ color: "black", fontWeight: "500" }}
            key={size}
            value={size}
          >
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
