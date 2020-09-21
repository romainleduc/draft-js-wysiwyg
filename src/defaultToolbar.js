import React from 'react';
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    Code,
    FormatStrikethrough,
} from '@material-ui/icons';

const defaultToolbar = {
    getDefault: (type, name) => {
        return defaultToolbar[type]
            .find(option => option.name === name)
            ?.default;
    },
    inline: [
        {
            name: 'bold',
            default: <FormatBold />,
        },
        {
            name: 'italic',
            default: <FormatItalic />,
        },
        {
            name: 'underline',
            default: <FormatUnderlined />,
        },
        {
            name: 'strikethrough',
            default: <FormatStrikethrough />,
        },
        {
            name: 'code',
            default: <Code />,
        },
    ],
    blockType: [
        {
            name: 'header-one',
            default: 'H1',
        },
        {
            name: 'header-two',
            default: 'H2',
        },
        {
            name: 'header-three',
            default: 'H3',
        },
        {
            name: 'header-four',
            default: 'H4',
        },
        {
            name: 'header-five',
            default: 'H5',
        },
        {
            name: 'header-six',
            default: 'H6',
        },
        {
            name: 'ordered-list-item',
            default: 'Ordered list',
        },
        {
            name: 'unordered-list-item',
            default: 'Unordered list',
        },
        {
            name: 'blockquote',
            default: 'Blockquote',
        },
        {
            name: 'code-block',
            default: 'Code block',
        },
    ],
}

export default defaultToolbar;
