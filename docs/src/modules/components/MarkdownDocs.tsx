import React from 'react';
import { render, markedApiDoc } from '../utils/parseMarkdown';
import MarkdownElement from './MarkdownElement';
import Demo from './Demo';
import { Container, makeStyles } from '@material-ui/core';
import ApiDocModal from './ApiDocModal';
import clsx from 'clsx';

interface MarkdownDocsProps {
    markdown: string;
}

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 96,
    },
    mainWidth: {
        paddingLeft: 48,
        paddingRight: 48,
    },
});

const MarkdownDocs = ({ markdown }: MarkdownDocsProps): JSX.Element => {
    const classes = useStyles();

    const getDemoData = (demoPath: string) => {
        return {
            raw: require(`!raw-loader!../../examples/components/${demoPath}`).default,
            component: require(`../../examples/components/${demoPath}`).default,
            language: demoPath.match(/(tsx|jsx|js)/g)?.[0] || 'js',
        };
    };

    return (
        <Container component='main' maxWidth='md' className={clsx(classes.main, classes.mainWidth)}>
            {render(markdown).map(({ type, content }, key) => {
                if (type === 'demo') {
                    return <Demo {...getDemoData(content)} key={key} />;
                }

                if (type === 'api') {
                    const { title, html } = markedApiDoc(content);

                    return (
                        <ApiDocModal title={title} key={key}>
                            <MarkdownElement
                                className=""
                                htmlOrRaw={html}
                            />
                        </ApiDocModal>
                    );
                }

                return (
                    <MarkdownElement
                        key={key}
                        className=""
                        htmlOrRaw={content}
                    />
                );
            })}
        </Container>
    );
};

export default MarkdownDocs;
