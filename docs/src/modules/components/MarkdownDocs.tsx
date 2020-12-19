import React from 'react';
import { render, markedApiDoc } from '../utils/parseMarkdown';
import MarkdownElement from './MarkdownElement';
import Demo from './Demo';
import ApiDocModal from './ApiDocModal';

interface MarkdownDocsProps {
  markdown: string;
}

const MarkdownDocs = ({ markdown }: MarkdownDocsProps): JSX.Element => {
  const getDemoData = (demoPath: string) => {
    return {
      raw: require(`!raw-loader!../../examples/components/${demoPath}`).default,
      component: require(`../../examples/components/${demoPath}`).default,
      language: demoPath.match(/(tsx|jsx|js)/g)?.[0] || 'js',
    };
  };

  return (
    <>
      {render(markdown).map(({ type, content }, key) => {
        if (type === 'demo') {
          return <Demo {...getDemoData(content)} key={key} />;
        }

        if (type === 'api') {
          const { title, html } = markedApiDoc(content);

          return (
            <ApiDocModal title={title} key={key}>
              <MarkdownElement className="" htmlOrRaw={html} />
            </ApiDocModal>
          );
        }

        return <MarkdownElement key={key} className="" htmlOrRaw={content} />;
      })}
    </>
  );
};

export default MarkdownDocs;
