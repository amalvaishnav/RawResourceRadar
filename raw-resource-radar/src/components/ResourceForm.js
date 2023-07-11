import { useContext, useEffect, useState } from "react";
import "./ResourceForm.css";
import { Context } from "../ResourceApp";
import validate from "./validate";

const ResourceForm = ({ clickedItem }) => {
  const initialFormValues = {
    name: "",
    color: "",
    vol: 0,
    cost: 0,
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [currentMode, setCurrentMode] = useState("Create");

  //Hook to determine if any of the item from list, if clicked then it will
  //set the mode to Update/Delete and clearing all the Form fields
  useEffect(() => {
    if (Object.keys(clickedItem).length !== 0) {
      setFormValues({
        name: clickedItem.name,
        color: clickedItem.color,
        vol: clickedItem.vol,
        cost: clickedItem.cost,
      });
      setCurrentMode("Update");
    }
  }, [clickedItem]);

  //HandleChange for each input fields and keep adding them to formValues until the submit button is clicked
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //Using the context created in the main component
  const [context, setContext] = useContext(Context);

  //   HandleSubmit function for Newly Create or Update the record
  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalidValues = await validate(formValues);

    setFormErrors(invalidValues); //Setting formError state to keep adding it for mentioning error messages in the span tags below

    if (Object.keys(invalidValues).length === 0) {
      const url =
        currentMode === "Update"
          ? `http://localhost:5001/data/${clickedItem._id}`
          : "http://localhost:5001/data/";
      try {
        let res = await fetch(url, {
          method: currentMode === "Update" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formValues.name,
            color: formValues.color,
            vol: formValues.vol,
            cost: formValues.cost,
          }),
        });

        let response = await res.json();
        if (res.status === 200) {
          setContext([...context, res.name]); // Checking if context is changed, if so it will send that prompt via context to Main component
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Function to call when New record add button gets pressed hence clearing form values and give ability to enter data again
  const createRecord = () => {
    clickedItem = {};
    setFormValues(initialFormValues);
    setCurrentMode("Create");
  };

  //Function to tackle deleting the record
  const handleDelete = async (e) => {
    setFormValues(initialFormValues);
    try {
      let res = await fetch(`http://localhost:5001/data/${clickedItem._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response = await res.json();
      if (res.status === 200) {
        setContext([...context, res.name]); // Checking if context is changed, if so it will send that prompt via context to Main component
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="resourceForm">
      <form onSubmit={handleSubmit} className="form">
        <sub>Name</sub>
        <input
          type="text"
          name="name"
          value={formValues.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <span className="errorMsg">{formErrors.name}</span>
        <br />

        <div className="colorComponent">
          <div className="colorPicker">
            <input
              type="color"
              name="color"
              value={formValues.color}
              placeholder="Color"
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            value={formValues.color}
            placeholder="Color"
            name="color"
          />
        </div>
        <span className="errorMsg">{formErrors.color}</span>
        <br />
        <sub>Volume (Cubic Meters)</sub>
        <input
          placeholder="Volume (sq m)"
          type="number"
          name="vol"
          step="100"
          value={formValues.vol}
          onChange={handleChange}
        />
        <span className="errorMsg">{formErrors.vol}</span>
        <br />

        <sub>Cost ( per cubic meter)</sub>
        <input
          placeholder="Cost"
          type="number"
          step="0.1"
          value={formValues.cost}
          name="cost"
          onChange={handleChange}
        />

        <span className="errorMsg">{formErrors.cost}</span>
        <br />

        <hr className="line" />
        <button type="submit">{currentMode}</button>
        <br />
      </form>
      {currentMode === "Update" && (
        <>
          <button onClick={createRecord}>Create New</button>
          <br />
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ResourceForm;
