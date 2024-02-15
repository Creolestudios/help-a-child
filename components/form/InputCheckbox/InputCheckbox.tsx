import React, { FC } from "react";

const InputCheckbox: FC<any> = ({
  label,
  name,
  checked,
  setChecked,
  onChange,
  style,
}) => {
  const checkboxChange = (e: any) => {
    onChange();
  };
  return (
    <React.Fragment>
      <input
        id="input-check"
        type="checkbox"
        name={name}
        className="bg-transparent mx-1 w-[40px] md:w-[20px] h-[20px]"
        checked={checked}
        onChange={checkboxChange}
      />
      <label
        style={
          style || {
            fontFamily: "Avenir",
            color: "#150F2F",
            fontWeight: 300,
            fontStyle: "normal",
          }
        }
      >
        {label}
      </label>
    </React.Fragment>
  );
};

export default InputCheckbox;
