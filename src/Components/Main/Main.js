import React, { useState } from "react";

const Main = () => {
  const [listData, setListData] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const addToData = () => {
    if (inputVal.trim() === "") {
        alert("Please enter some value!");
        setInputVal("");
        return;
    }
    let newData = [
      ...listData,
      {
        itemName: inputVal,
        id: Date.now(),
        checked: false,
      },
    ];
    setListData(newData);
    setInputVal("")
  };

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
    setListData(newData);
  };

  const removeList = (id) => {
    setListData(listData.filter((item) => item.id !== id));
  }

  return (
    <main>
      <h1>Grocery Bud</h1>
      <div className="list-input">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={addToData}>add</button>
      </div>
      <div className="list-container">
        {listData.map((item) => {
          return (
            <div className="list" key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => hadleCheck(item.id)}
              />
              <span style={{textDecoration: (item.checked) ? "line-through" : "none"}}>{item.itemName}</span>
              <button onClick={() => removeList(item.id)}>remove</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;
