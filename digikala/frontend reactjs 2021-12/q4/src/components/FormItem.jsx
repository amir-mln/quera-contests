import React from "react";

import Error from "./Error";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import Textarea from "./Textarea";
import TextInput from "./TextInput";
import CitySelector from "./CitySelector";
import ErrorTexts from "../constants/Errors";

const FormType = {
  text: TextInput,
  dropdown: Dropdown,
  textarea: Textarea,
  checkbox: Checkbox,
  city: CitySelector,
};

function FormItem({ type, error, register, dependency, control, ...props }) {
  const FormItemComponent = FormType[type];

  const capitalizedErrorType =
    error?.type?.charAt(0).toUpperCase() + error?.type?.slice(1);

  return (
    <div data-testid={`form-item-${props.name}`}>
      <FormItemComponent {...props} />
      {error && (
        <Error name={props.name} error={ErrorTexts[capitalizedErrorType]} />
      )}
    </div>
  );
}

export default FormItem;
