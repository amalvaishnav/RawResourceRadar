import "./App.css";
import { createContext, useEffect, useState } from "react";
import ResourceForm from "./components/ResourceForm";

const Context = createContext();
function App() {
  const [data, setData] = useState([]);
  const [context, setContext] = useState(data);
  useEffect(() => {
    const getData = async () => {
      fetch("http://localhost:5001/data")
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setData(data);
        });
    };
    getData();
    console.log(data);
  }, [context]);

  const onItemClick = (item) => {
    console.log(item);
  };
  return (
    <div className="ResourceApp">
      <h1 className="title">Raw Resource Radar</h1>
      <Context.Provider value={[context, setContext]}>
        <div className="ResourceSection">
          <div className="ResourceContent">
            <div className="ResourceList">
              {data &&
                data.length > 0 &&
                data.map((elem, index) => {
                  return (
                    <div
                      className="Tile"
                      onClick={() => {
                        onItemClick(elem);
                      }}
                    >
                      {/* <div className="ColorTileDisplay"></div> */}
                      <li>{elem.name}</li>
                      <li>{elem.vol}</li>
                      <li>{elem.color}</li>
                    </div>
                  );
                })}
              {!data.length > 0 && <h1>No data present</h1>}
            </div>

            <ResourceForm className="ResourceForm" />
          </div>
          <div></div>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
export { Context };
