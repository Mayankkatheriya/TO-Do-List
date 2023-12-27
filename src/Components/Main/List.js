import React from "react";

const List = ({item, index, handleCheckbox, handleRemove}) => {
    const {itemName, id, checked, backgroundColor, textColor} = item
  return (
    <div
      className="list"
      style={{ backgroundColor: backgroundColor }}
    >
      <span
        style={{
          color: textColor,
          textDecoration: checked
            ? `line-through ${backgroundColor} solid 3px`
            : "none",
        }}
      >
        {index + 1}. {itemName}
      </span>
      <div className="btn-container">
        <input
          style={{ accentColor: textColor }}
          type="checkbox"
          checked={checked}
          onChange={handleCheckbox}
        />
        <button onClick={handleRemove}>
          <i style={{ color: textColor }} className="bx bxs-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default List;
