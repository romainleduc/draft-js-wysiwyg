import React from 'react';
import { render } from '../utils/parseMarkdown';
import MarkdownElement from './MarkdownElement';

interface MarkdownDocsProps {
    markdown: string;
}

const MarkdownDocs = (props: MarkdownDocsProps): JSX.Element => {
    return (
        <div>
            {render(props.markdown).map((content, key) => {
                return (
                    <MarkdownElement
                        key={key}
                        className=""
                        html={content.content}
                    />
                );
            })}
        </div>
    );
};

export default MarkdownDocs;
