import React from 'react';
import EditorContext, { CustomStyleMap } from './EditorProviderContext';

export interface EditorProviderProps {
  customStyleMaps: CustomStyleMap[];
  children: any;
}

const EditorProvider = ({
  customStyleMaps,
  children,
}: EditorProviderProps): JSX.Element => {
  const getCustomStyleMapOfKey = (key: string) => {
    return customStyleMaps.find((customStyleMap) =>
      Object.keys(customStyleMap.styles)
        .map((style) => `${customStyleMap.group}_${style}`)
        .includes(key)
    );
  };

  const getCustomStyleMap = (group: string) => {
    return customStyleMaps.find(
      (customStyleMap) => customStyleMap.group === group
    );
  };

  return (
    <EditorContext.Provider
      value={{
        customStyleMaps,
        getCustomStyleMapOfKey,
        getCustomStyleMap,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
