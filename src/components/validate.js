// Adding validations for Form entries.
const validate = async (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Please enter name";
  }
  if (!values.color) {
    errors.color = "Please select or enter Color";
  }
  const colorRegexp = /^#[0-9a-fA-F]{6}$/;
  if (values.color && colorRegexp.test(values.color) === false) {
    errors.color = "Please select or enter color in #00ffaa or #00FFAA format";
  }
  if (!values.vol) {
    errors.vol = "Please enter Vol";
  }
  if (!values.cost) {
    errors.cost = "Please enter Cost";
  }
  return errors;
};

export default validate;
