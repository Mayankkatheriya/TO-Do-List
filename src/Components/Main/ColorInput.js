import React from "react";

const ColorInput = ({title, id, value, onClick}) => {
  return (
    <div className="color-input">
      <label htmlFor={id}>{title}</label>
      <input
        type="color"
        id={id}
        value={value}
        onChange={onClick}
      />
    </div>
  );
};

export default ColorInput;
