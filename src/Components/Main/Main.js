import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import List from "./List";
import ColorInput from "./ColorInput";

const Main = () => {
  const [listData, setListData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [inputVal, setInputVal] = useState("");
  const [backgroundColorCode, setColorCode] = useState("#000000");
  const [textColorCode, setTextColorCode] = useState("#ffffff");

  //TODO Toastr Options
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  //Todo Add List item to the container
  const addToData = () => {
    if (inputVal.trim() === "") {
      toastr.error("Please enter some value!");
      setInputVal("");
      return;
    }
    let newData = [
      ...listData,
      {
        itemName: inputVal,
        id: Date.now(),
        checked: false,
        backgroundColor: backgroundColorCode,
        textColor: textColorCode,
      },
    ];
    toastr.success("Item Added to the List");
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
    setInputVal("");
  };

  //Todo Handle CheckBox
  const hadleCheck = (id) => {
    let newData = listData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    toastr.info("List Updated");
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
  };

  //TODO Remove list item from data
  const removeList = (id) => {
    toastr.warning("Item Removed");
    let newData = listData.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
  };


  //Todo render to UI
  return (
    <main>
      <h1>Grocery Bud</h1>
      {/* Item Input and Add Butto */}
      <div className="list-input">
        <div className="text-input">
          <input
            type="text"
            placeholder="Enter Item"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button onClick={addToData}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M12 22V2M2 12h20"
              />
            </svg>
          </button>
        </div>
        {/* BackGroud Color Input */}
        <ColorInput
          title="BackGround Color: "
          id="background"
          value={backgroundColorCode}
          onClick={(e) => setColorCode(e.target.value)}
        />
        {/* Text Color Input */}
        <ColorInput
          title="Text Color: "
          id="text"
          value={textColorCode}
          onClick={(e) => setTextColorCode(e.target.value)}
        />
      </div>
      {/* List Rendering */}
      <div className="list-container">
        {listData.map((item, index) => {
          return (
            <List
              key={item.id}
              item={item}
              index={index}
              handleCheckbox={() => hadleCheck(item.id)}
              handleRemove={() => removeList(item.id)}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Main;
