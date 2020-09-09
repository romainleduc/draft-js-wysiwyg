import React from 'react';
import PropTypes from 'prop-types';
import {
    Editor,
    EditorState,
    RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import EditorToolbar from './WysiwgEditorToolbar';

const propTypes = {
    acceptCommands: PropTypes.arrayOf(PropTypes.string),
};

export const WysiwygEditor = ({
    className,
    editorProps,
    acceptCommands,
    toolbarProps,
    ...props
}) => {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const handleKeyCommand = (command, editorState) => {
        if (!acceptCommands || acceptCommands.includes(command)) {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setEditorState(newState);
                return 'handled';
            }
        }

        return 'not-handled';
    }

    return (
        <div {...props}>
            <EditorToolbar
                {...toolbarProps}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
            <Editor
                editorState={editorState}
                onChange={onEditorStateChange}
                handleKeyCommand={handleKeyCommand}
                {...editorProps}
            />
            <textarea
                readOnly
                style={{ display: 'none' }}
                value={stateToHTML(editorState.getCurrentContent())}
            />
        </div>
    );
}

WysiwygEditor.propTypes = propTypes;
