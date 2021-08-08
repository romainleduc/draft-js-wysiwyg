import React from 'react';

export interface CustomStyleMap {
  group: string;
  exclusive?: boolean;
  styles: any;
}

const EditorThemeContext = React.createContext<{
  customStyleMaps: CustomStyleMap[];
  getCustomStyleMapOfKey: (key: string) => any;
  getCustomStyleMap: (group: string) => any;
}>({
  customStyleMaps: [],
  getCustomStyleMapOfKey: () => {},
  getCustomStyleMap: () => {},
});

export default EditorThemeContext;
