import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext';
import { ACTION_TYPES } from '../../redux/constants';
import ReduxContext from '../ReduxContext';

export interface InlineToggleButtonProps
    extends Omit<ToggleButtonProps, 'value'> {
    value: string;
}

const InlineToggleButton = forwardRef<
    HTMLButtonElement,
    InlineToggleButtonProps
>(({ value, selected, children, ...rest }: InlineToggleButtonProps, ref) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};
    const { dispatch } = useContext(ReduxContext);

    useEffect(() => {
        if (selected) {
            handleClick();
        }

        dispatch({
            type: ACTION_TYPES.ADD_KEY_COMMAND,
            payload: value,
        });
    }, []);

    // Synchronize selection with keyboard shortcuts
    // const synchronizeSelection = () => {
    //     if (editorState && setEditorState) {
    //         if (editorState.getCurrentContent().hasText()) {
    //             const hasValue = editorState.getCurrentInlineStyle().has(value);

    //             return (hasValue && !selected) || (!hasValue && selected)
    //                 ? !selected
    //                 : selected;
    //         }
    //     }

    //     return selected;
    // };

    const handleClick = () => {
        if (editorState && setEditorState) {
            console.log(value)
             setEditorState(
                RichUtils.toggleInlineStyle(
                    EditorState.forceSelection(
                        editorState,
                        editorState.getSelection()
                    ),
                    value
                )
            );
        }
    };

    return (
        <ToggleButton
            {...rest}
            ref={ref}
            selected={selected}
            onClick={handleClick}
            // selected={synchronizeSelection()}
            value={value}
        >
            {children}
        </ToggleButton>
    );
});

InlineToggleButton.displayName = 'InlineToggleButton';

export default InlineToggleButton;
