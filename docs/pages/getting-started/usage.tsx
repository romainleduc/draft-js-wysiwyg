import React from 'react';
import { prepareMarkdown } from '../../src/modules/utils/parseMarkdown';
import MarkdownDocsPage from '../../src/modules/components/MarkdownDocsPage';
import { NextPage } from 'next';

const README = require('../../src/pages/getting-started/usage.md')
  .default;

const UsagePage: NextPage<any> = ({
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

UsagePage.getInitialProps = () => {
  const { title, description, markdown } = prepareMarkdown(README);

  return {
    title,
    description,
    markdown,
  };
};

export default UsagePage;
