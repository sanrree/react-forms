import React from 'react';

function useForm() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  return {
    values,
    errors,
    setErrors,
    setValues,
  };
}

export default useForm;
