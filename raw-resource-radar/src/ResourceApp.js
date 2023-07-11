import "./App.css";
import { createContext, useEffect, useState } from "react";
import ResourceForm from "./components/ResourceForm";

const Context = createContext();
function App() {
  //data state to manipilate main data
  const [data, setData] = useState([]);

  //clickedItem state to track which tile is selected,
  // which passed as prop to form component to further edit the tile
  const [clickedItem, setClickedItem] = useState({});
  const [context, setContext] = useState(data);

  //useEffect hook to load data
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
  }, [context, data]);

  //set clicked item to pass over to Form component to further edit
  const onItemClick = (item) => {
    setClickedItem(item);
  };

  //Calculate the total cost of every material added in the list
  const calculateTotalCost = () => {
    let sum = 0;
    data.forEach((element) => {
      sum = sum + parseInt(element.vol * element.cost);
    });
    return sum;
  };

  //Main component
  return (
    <div className="resourceApp">
      <h1 className="title">Raw Resource Radar</h1>
      {/* Created context to add a way for the children ResourceForm component to inform Main component 
          whenever any data gets created,deleted or updated*/}
      <Context.Provider value={[context, setContext]}>
        <div className="resourceSection">
          <div className="resourceContent">
            {/* TO show the list of our materials available in the data */}
            <div className="resourceList">
              {data &&
                data.length > 0 &&
                data.map((elem) => {
                  return (
                    <div
                      className="tile"
                      onClick={() => {
                        onItemClick(elem);
                      }}
                    >
                      <div className="infoSection">
                        <p>{elem.name}</p>
                        <sub>
                          {elem.vol} m<sup>3</sup>
                        </sub>
                      </div>
                      <div
                        className="colorDiv"
                        style={{ "background-color": elem.color }} // show which color the raw material is
                      />
                    </div>
                  );
                })}
              {!data.length > 0 && <h1>No data present</h1>}
            </div>
            {/* Our Form component  */}
            <ResourceForm className="resourceForm" clickedItem={clickedItem} />
          </div>
          {data.length > 0 && <h1>Total Cost is ${calculateTotalCost()}</h1>}
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
export { Context };
