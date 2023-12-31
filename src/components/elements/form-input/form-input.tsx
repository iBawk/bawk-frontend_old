import style from "./form-input.module.scss";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export type DataElementFormInput = {
  type?: HTMLInputTypeAttribute | undefined;
  invalid?: boolean;
  valid?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function ElementFormInput(data: DataElementFormInput) {
  const { type, valid, invalid, onChange, value, placeholder } = data;

  const isValid = valid ? style.valid : "";
  const isInvalid = invalid ? style.invalid : "";

  return (
    <div className={`${style.ElementInput} ${isValid} ${isInvalid}`}>
      <input
        className={style.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ErrorOutlineOutlinedIcon className={`${style.icon} ${style.invalid}`} />
      <CheckCircleOutlineOutlinedIcon
        className={`${style.icon} ${style.valid}`}
      />
    </div>
  );
}
