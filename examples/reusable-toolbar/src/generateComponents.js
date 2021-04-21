import React from 'react';

export const generateComponents = (component, values, authorizedValues, props) => {
  return values?.map(value => {
    if (authorizedValues === true || (Array.isArray(authorizedValues) && authorizedValues.includes(value?.[0]))) {
      return (
        React.cloneElement(component, {
          value: value?.[0],
          children: value?.[1],
          ...props,
        })
      );
    }

    return null;
  });
}