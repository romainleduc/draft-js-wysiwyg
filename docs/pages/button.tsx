import React from 'react';
import README from '../src/examples/components/button/button.md';
import { prepareMarkdown } from '../src/modules/utils/parseMarkdown';
import MarkdownDocsPage from './MarkdownDocsPage';

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
