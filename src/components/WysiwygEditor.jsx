import React from 'react';
import PropTypes from 'prop-types';
import {
    Editor,
    EditorState,
    RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const propTypes = {
    acceptCommands: PropTypes.arrayOf(PropTypes.string),
};

export const WysiwygEditor = ({
    className,
    editorProps,
    acceptCommands,
    ...props,
}) => {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

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
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={editorState => setEditorState(editorState)}
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
