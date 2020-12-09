import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import ctx from './FormContext';
import { useForm } from '../hooks';

const FormContainer = forwardRef((props, ref) => {
  const items = useRef({});

  const { values, errors, setValues, setErrors } = props.useForm || useForm();

  useImperativeHandle(ref, () => ({
    setError(name, error) {
      setErrors({ ...errors, [name]: error });
    },
  }));

  function updateItem(name, checkers) {
    items.current[name] = checkers;
  }

  function onChange(name, value) {
    setValues({ ...values, [name]: value });
  }

  function onSubmit(fields) {
    const itemsToCheck = Array.isArray(fields)
      ? fields
      : Object.keys(items.current);

    let checkResult = {};

    itemsToCheck?.forEach((i) => {
      const res = items.current[i]
        ?.map((x) => x(values[i]))
        .filter((x) => x !== null);

      if (res.length !== 0) {
        checkResult[i] = res[0];
      }
    });

    setErrors(checkResult);

    if (Object.keys(checkResult).length === 0) {
      props.onSubmit(
        Object.keys(items.current).reduce((prev, current, index) => {
          return { ...prev, [current]: values[current] || null };
        }, [])
      );
    }
  }

  function getContextValue() {
    return {
      updateItem: updateItem,
      onChange: onChange,
      errors: errors,
      values: values,
      onSubmit: onSubmit,
    };
  }

  return (
    <ctx.Provider value={getContextValue()}>{props.children}</ctx.Provider>
  );
});

export default FormContainer;
