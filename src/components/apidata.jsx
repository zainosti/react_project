import React, { useState } from "react";
import axios from "axios";
const Apidata = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="center">
      <button className="submit_btn" onClick={getData}>
        Get API Tasks
      </button>
      <div className="cards">
        {data.map((item, index) => {
          return (
            <div key={index} className="card">
              <p>Title:{item.title}</p>
              <p>Id:{item.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Apidata;
