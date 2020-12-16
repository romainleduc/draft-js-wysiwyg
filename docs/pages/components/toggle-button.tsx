import React from 'react';
import { prepareMarkdown } from '../../src/modules/utils/parseMarkdown';
import MarkdownDocsPage from '../../src/modules/components/MarkdownDocsPage';
import { NextPage } from 'next';

const README = require('../../src/examples/components/toggle-button/toggle-button.md').default;

const ToggleButtonPage: NextPage<any> = ({
  title,
  description,
  markdown,
}): JSX.Element => {
  return (
    <MarkdownDocsPage
      title={title}
      description={description}
      markdown={markdown}
    />
  );
};

ToggleButtonPage.getInitialProps = () => {
  const { title, description, markdown } = prepareMarkdown(README);

  return {
    title,
    description,
    markdown,
  }
}

export default ToggleButtonPage;
