import { useContext, useEffect, useState } from "react";
import "./ResourceForm.css";
import { Context } from "../ResourceApp";

const ResourceForm = () => {
  const initialFormValues = { name: "", color: "", vol: 0, cost: 0 };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    // console.log("handleChange came", e);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const [context, setContext] = useContext(Context);

  const validate = async (values) => {
    console.log("came into valkidate", values);
    let errors = {};
    if (!values.name) {
      errors.name = "Please enter name";
    }
    if (!values.color) {
      errors.color = "Please select or enter Color";
    }
    const colorRegexp = /^#[0-9a-fA-F]{6}$/;
    // console.log("regexp test", colorRegexp.test(values.color));
    if (values.color && colorRegexp.test(values.color) == false) {
      errors.color =
        "Please select or enter color in #00ffaa or #00FFAA format";
    }
    if (!values.vol) {
      errors.vol = "Please enter Vol";
    }
    if (!values.cost) {
      errors.cost = "Please enter Cost";
    }
    console.log("end", errors);
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("e", e, "isSubmit", isSubmit);
    const invalidValues = await validate(formValues);

    setFormErrors(invalidValues);
    console.log("bfore fetch", formErrors, invalidValues);
    if (Object.keys(invalidValues).length == 0) {
      console.log("no form errors ");
      try {
        let res = await fetch("http://localhost:5001/data", {
          method: "POST",
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
          console.log(res);
          console.log("User created");
          setContext([...context, res.name]);
        } else {
          console.log("User not created");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="ResourceForm">
      <form onSubmit={handleSubmit} className="Form">
        <input
          type="text"
          name="name"
          value={formValues.name}
          placeholder="Name"
          //   onChange={(e) => setName(e.target.value)}
          onChange={handleChange}
        />
        <span className="errorMsg">{formErrors.name}</span>
        <br />
        <div className="ColorComponent">
          <div className="ColorPicker">
            <input
              type="color"
              name="color"
              value={formValues.color}
              placeholder="Color"
              //   onChange={(e) => setColor(e.target.value)}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            value={formValues.color}
            placeholder="Color"
            name="color"
            // onKeyPress={onKeyPress}
            // onChange={(e) => setColor(e.target.value)}
            onChange={handleChange}
          />
        </div>
        <span className="errorMsg">{formErrors.color}</span>
        <br />
        <input
          placeholder="Volume (sq m)"
          type="number"
          name="vol"
          value={formValues.vol}
          //   onChange={handleVolChange}
          onChange={handleChange}
        />
        <span className="errorMsg">{formErrors.vol}</span>
        <br />

        <input
          placeholder="Cost"
          type="number"
          value={formValues.cost}
          name="cost"
          //   onChange={handleCostChange}
          onChange={handleChange}
        />
        <span className="errorMsg">{formErrors.cost}</span>
        <br />
        <button type="submit">Create</button>

        {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
      </form>
    </div>
  );
};

export default ResourceForm;
