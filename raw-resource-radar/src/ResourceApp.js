import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/data", {
      // method: "GET",
      // mode: "cors",
    })
      .then((resp) => {
        console.log("response in effect", resp);
        return resp.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data);
      });
  }, []);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:5001/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          color: color,
        }),
      });

      let response = await res.json();
      if (res.status === 200) {
        console.log(res);
        console.log("User created");
      } else {
        console.log("User not created");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ResourceApp">
      <h1 className="title">Raw Resource Radar</h1>
      <div className="ResourceSection">
        <div className="ResourceContent">
          <div className="ResourceList">
            {data &&
              data.length > 0 &&
              data.map((elem, index) => {
                return <li>{elem.name}</li>;
              })}
            {!data.length > 0 && <h1>No data present</h1>}
          </div>
          <div className="ResourceForm">
            <form onSubmit={handleSubmit} className="Form">
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                value={color}
                placeholder="Color"
                onChange={(e) => setColor(e.target.value)}
              />

              <button type="submit">Create</button>

              {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
