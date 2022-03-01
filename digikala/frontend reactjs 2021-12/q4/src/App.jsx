/* eslint-disable eqeqeq */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import FormItem from "./components/FormItem";
import Button from "./components/Button";
import "./App.css";

function App({ onSubmit, fields }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const allFields = watch();

  function handleFieldsMap(field) {
    const {
      name,
      type,
      label,
      required,
      dependency: { show: showDep, required: requiredDep } = {},
      options = [],
    } = field;

    const showDependencyName = showDep?.name;
    const showDependencyValue = showDep?.value || NaN;

    const requiredDependencyName = requiredDep?.name;
    const requiredDependencyValue = requiredDep?.value || NaN;

    const canShow =
      !showDep || allFields[showDependencyName] == showDependencyValue;

    const isRequired =
      allFields[requiredDependencyName] == requiredDependencyValue || required;

    return canShow ? (
      <Controller
        key={name}
        name={name}
        control={control}
        rules={{ required: isRequired }}
        render={({ field: { ref, ...restOfFields } }) => (
          <FormItem
            name={name}
            type={type}
            label={label}
            options={options}
            error={errors[name]}
            className="form__item"
            {...restOfFields}
          />
        )}
      />
    ) : null;
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {fields.map(handleFieldsMap)}
      <Button type="submit">ثبت</Button>
    </form>
  );
}

export default App;
