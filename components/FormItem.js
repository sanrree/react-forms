import React from 'react';
import ctx from './FormContext';

function FormItem({ name, checkers, children }) {
  const { errors, values, onChange, updateItem } = React.useContext(ctx);

  const childProps = {
    error: errors[name],
    value: values[name],
    onChange: (value) => onChange(name, value),
  };

  React.useEffect(() => {
    updateItem(name, checkers);
  }, [checkers]);

  if (Array.isArray(children)) {
    throw new Error('FormItem currenlty supports only one child');
  } else {
    return React.cloneElement(children, childProps);
  }
}

export default FormItem;
