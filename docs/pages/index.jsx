import React from 'react';
import README from '../src/examples/toggle-button/toggle-button.md';
import Markdown from 'markdown-to-jsx';
import { getTitlePage, prepareMarkdown } from '../src/modules/utils/parseMarkdown';
import AppHead from '../src/modules/components/AppHead';
// import marked from 'marked';

const IndexPage = () => {
    const { title, description, md } = prepareMarkdown(README);

    return (
        <div>
            <AppHead
                title={title}
                description={description}
            />
            <Markdown>
                {md}
            </Markdown>
        </div>
    );
}

export default IndexPage;
