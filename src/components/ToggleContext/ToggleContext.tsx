import React from 'react';

interface ToggleContextType {
  inlineStyles: string[];
  setInlineStyles(inlineStyles: string[]): void;
  blockType: string | null;
  setBlockType(blockType: string): void;
}

const ToggleContext = React.createContext<ToggleContextType>({
  inlineStyles: [],
  setInlineStyles: () => {},
  blockType: null,
  setBlockType: () => {}
});

export default ToggleContext;
