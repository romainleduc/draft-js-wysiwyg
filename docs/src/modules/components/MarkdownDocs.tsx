import React from 'react';
import { render } from '../utils/parseMarkdown';
import MarkdownElement from './MarkdownElement';
import Demo from './Demo';
import { Container, makeStyles } from '@material-ui/core';

interface MarkdownDocsProps {
    markdown: string;
}

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 96,
    },
});

const MarkdownDocs = (props: MarkdownDocsProps): JSX.Element => {
    const classes = useStyles();

    const getDemoData = (demoPath: string) => {
        return {
            raw: require(`!raw-loader!../../examples/${demoPath}`).default,
            component: require(`../../examples/${demoPath}`).default,
        }
    }

    return (
        <Container
            component='main'
            maxWidth='md'
            className={classes.main}
        >
            {render(props.markdown).map((content, key) => {
                if (content.isDemo) {
                    console.log(content.content)
                    return (
                        <Demo
                            {...getDemoData(content.content)}
                            key={key}
                        />
                    );
                }

                return (
                    <MarkdownElement
                        key={key}
                        className=""
                        html={content.content}
                    />
                );
            })
            }
        </Container>
    );
};

export default MarkdownDocs;
