import React from 'react';
import { prepareMarkdown } from '../../src/modules/utils/parseMarkdown';
import MarkdownDocsPage from '../../src/modules/components/MarkdownDocsPage';

const README = require('../../src/examples/components/button/button.md').default;

const ButtonPage = (): JSX.Element => {
  const { title, description, markdown } = prepareMarkdown(README);

  return (
    <MarkdownDocsPage
      title={title}
      description={description}
      markdown={markdown}
    />
  );
};

export default ButtonPage;
