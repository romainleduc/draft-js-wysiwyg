import React from 'react';
import { prepareMarkdown } from '../../src/modules/utils/parseMarkdown';
import MarkdownDocsPage from '../../src/modules/components/MarkdownDocsPage';

const README = require('../../src/examples/components/toggle-button/toggle-button.md').default;

const ToggleButtonPage = (): JSX.Element => {
  const { title, description, markdown } = prepareMarkdown(README);

  return (
    <MarkdownDocsPage
      title={title}
      description={description}
      markdown={markdown}
    />
  );
};

export default ToggleButtonPage;
