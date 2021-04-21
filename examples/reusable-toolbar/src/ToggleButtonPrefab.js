import React from 'react';
import { ToggleButtonMenu, ToggleButtonGroup } from 'draft-js-wysiwyg';

const ToggleButtonPrefab = (
  {
    toggleType,
    defaultValue,
    isToggleMenu,
    ...other
  }
) => {

  if (isToggleMenu) {
    return (
      <ToggleButtonMenu
        orientation="vertical"
        {...other}
      />
    );
  }

  return (
    <ToggleButtonGroup
      defaultValue={defaultValue}
      {...other}
    />
  );
}

export default ToggleButtonPrefab;