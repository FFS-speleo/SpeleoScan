import React from "react";
import { InputWithIconProps } from "@/types";

const InputWithIconAtom: React.FC<InputWithIconProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <label className="input input-bordered flex items-center gap-2 mb-2 w-full">
    {icon}
    <input
      type={type}
      className="grow"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </label>
);

export default InputWithIconAtom;
