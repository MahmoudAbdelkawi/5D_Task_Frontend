import { Box, InputAdornment, InputBase } from "@mui/material";
import React from "react";

type InputFormProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: boolean;
  type?: string;
  Icon: React.ReactNode;
};

const InputForm = (props: InputFormProps) => {
  return (
    <Box>
      <InputBase
        startAdornment={
          <InputAdornment position="start">{props.Icon}</InputAdornment>
        }
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
          sx={{
          width: {xs:"100%",sm:"70%"},
          padding: "10px 10px",
          my: 1.5,
          borderRadius: "5px",
          border: `1px solid ${props.error ? "red" : "#ccc"}`,
        }}
      />
    </Box>
  );
};

export default InputForm;
