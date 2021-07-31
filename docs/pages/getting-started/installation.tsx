import React from 'react';
import { prepareMarkdown } from '../../src/modules/utils/parseMarkdown';
import MarkdownDocsPage from '../../src/modules/components/MarkdownDocsPage';
import { NextPage } from 'next';

const README = require('../../src/pages/getting-started/installation.md')
  .default;

const InstallationPage: NextPage<any> = ({
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

InstallationPage.getInitialProps = () => {
  const { title, description, markdown } = prepareMarkdown(README);

  return {
    title,
    description,
    markdown,
  };
};

export default InstallationPage;
