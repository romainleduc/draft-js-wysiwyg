import { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, options);

export * from '@testing-library/react';
export { customRender as render };