import React, { useContext, forwardRef, useEffect } from 'react';
import {
    indentSelection as indentSelectionUtils,
    isOutdentable,
} from '../../utils';
import EditorContext from '../EditorContext';
import { DraftButton, DraftButtonProps } from '../DraftButton';
import ReduxContext from '../ReduxContext';
import { ACTION_TYPES } from '../../redux/constants';

export interface IndentDraftButtonProps extends DraftButtonProps {
    /**
     * The value to associate with the button
     */
    value: 'increase' | 'decrease';
    /**
     * If `true`, indentation will only be performed on nested list.
     * @default false
     */
    nestedListOnly?: boolean;
    /**
     * If `true`, indentation will not be available from keyboard shortcuts
     * @default false
     */
    disableKeyboardShortcuts?: boolean;
}

const IndentDraftButton = forwardRef<HTMLButtonElement, IndentDraftButtonProps>(
    (
        {
            children,
            value,
            nestedListOnly,
            disableKeyboardShortcuts,
            ...rest
        }: IndentDraftButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};
        const { dispatch } = useContext(ReduxContext);

        useEffect(() => {
            if (!disableKeyboardShortcuts) {
                dispatch({
                    type: ACTION_TYPES.ADD_KEY_BINDING,
                    payload: 'Tab',
                });
            }
        }, []);

        const handleIndentSelection = (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ): void => {
            e.preventDefault();

            if (editorState && setEditorState) {
                const contentState = editorState.getCurrentContent();

                setEditorState(
                    indentSelectionUtils(
                        editorState,
                        contentState,
                        value,
                        nestedListOnly
                    )
                );
            }
        };

        const isDisabled = () => {
            if (editorState && setEditorState) {
                if (value === 'decrease') {
                    return !isOutdentable(
                        editorState.getSelection(),
                        editorState.getCurrentContent()
                    );
                }
            }

            return rest.disabled;
        };

        return (
            <DraftButton
                ref={ref}
                onMouseDown={handleIndentSelection}
                disabled={isDisabled()}
                {...rest}
            >
                {children}
            </DraftButton>
        );
    }
);

export default IndentDraftButton;
