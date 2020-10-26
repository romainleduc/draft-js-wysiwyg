import React from 'react';
import AppHead from '../src/modules/components/AppHead';
import MarkdownDocs from '../src/modules/components/MarkdownDocs';

interface MarkdownDocsPageProps {
    title: string;
    description: string;
    markdown: string;
}

const MarkdownDocsPage = ({
    title,
    description,
    markdown,
}: MarkdownDocsPageProps): JSX.Element => {
    return (
        <>
            <AppHead title={title} description={description} />
            <MarkdownDocs markdown={markdown} />
        </>
    );
};

export default MarkdownDocsPage;
