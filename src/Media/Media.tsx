import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ContentState, ContentBlock } from 'draft-js';

export interface MediaData {
    title?: string;
    src: string;
    alt?: string;
}

export type MediaType = 'image' | 'video' | 'audio';

const useStyles = makeStyles({
    media: {
        display: 'block',
        margin: '0 auto',
        maxWidth: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial',
    },
});

export interface MediaProps {
    contentState: ContentState,
    block: ContentBlock,
}

export const Media = (props: MediaProps): JSX.Element => {
    const classes = useStyles();
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    return (
        <>
            {type === 'audio' &&
                <audio
                    className={classes.media}
                    controls
                    src={src}
                />
            }
            {type === 'image' &&
                <img
                    className={classes.media}
                    src={src}
                />
            }
            {type === 'video' &&
                <video
                    className={classes.media}
                    controls
                    src={src}
                />
            }
        </>
    );
}
