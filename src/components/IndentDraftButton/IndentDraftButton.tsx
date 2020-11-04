import React, { useContext, forwardRef } from 'react';
import {
    indentSelection as indentSelectionUtils,
    isOutdentable,
} from '../../utils';
import EditorContext from '../EditorContext';
import { DraftButton, DraftButtonProps } from '../DraftButton';

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
}

const IndentDraftButton = forwardRef<HTMLButtonElement, IndentDraftButtonProps>(
    (
        {
            className,
            children,
            value,
            nestedListOnly,
            ...rest
        }: IndentDraftButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};

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
