import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: "300px",
  },
}));

const Dropdown = ({
  label = "",
  value,
  setValue,
  options = [],
}: {
  label: string;
  value: string;
  setValue: (e: string) => void;
  options?: any;
}) => {
  const classes = useStyles();

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        className="max-h-[300px]"
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options?.map((option: any, idx: number) => {
          return (
            <MenuItem key={idx} value={option?.value}>
              {option?.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
