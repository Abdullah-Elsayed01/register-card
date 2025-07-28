/* eslint-disable react/prop-types */
import { useState } from "react";
import { inputAttributes } from "../util/functions";
const Input = ({
  htmlInputType = "text",
  validationType,
  onChange,
  value,
  handleInputValid,
}) => {
  const [error, setError] = useState("");
  // It generates a unique attributes for each input type such as pattern, placeholder, etc...
  const attributes = inputAttributes(htmlInputType, validationType);
  // Handles the input validity and value
  const inputHandle = (event) => {
    const inputElement = event.target;
    const inputField = validationType.toLowerCase();
    if (!inputElement.checkValidity()) {
      handleInputValid(inputField, false);
      setError(inputElement.validationMessage);
    } else {
      handleInputValid(inputField, true);
      setError("");
    }
  };
  return (
    <>
      <input
        {...attributes}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => inputHandle(e)}
      />
      {error ? <p className="error-message">{error}</p> : ""}
    </>
  );
};
export default Input;
