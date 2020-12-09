import React from 'react';
import ctx from './FormContext';

function FormSubmit({ fields, children }) {
  const { onSubmit } = React.useContext(ctx);

  const childProps = {
    onSubmit: () => onSubmit(fields),
    onPress: () => onSubmit(fields),
  };

  if (Array.isArray(children)) {
    throw new Error('FormSubmit currenlty supports only one child');
  } else {
    return React.cloneElement(children, childProps);
  }
}

export default FormSubmit;
