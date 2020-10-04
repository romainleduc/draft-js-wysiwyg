import {
    SelectionState,
    ContentBlock,
    EditorState,
    ContentState,
} from 'draft-js';
import {
    replaceWithFragment,
    pushContentStateFromArray,
    getBlocksKeysBetween,
    insertText,
    getBlocksBetween,
} from './blockUtils';

/**
 * Check if a content block is of type list.
 */
export const isListType = (contentBlock: ContentBlock): boolean => {
    const type = contentBlock.getType();
    return type === 'unordered-list-item' || type === 'ordered-list-item';
};

/**
 * Return a new selection by merging the indent decrease offset.
 */
export const mergeIndentDecreaseSelection = (
    selection: SelectionState
): SelectionState => {
    return selection.merge({
        anchorOffset: selection.getAnchorOffset() - 1,
        focusOffset: selection.getFocusOffset() - 1,
    });
};

/**
 * Return a new selection by merging the indentation offset.
 *
 * The function will always keep the start of the selection
 * of the first row when it starts at 0.
 */
export const mergeIndentIncreaseSelection = (
    selection: SelectionState
): SelectionState => {
    let anchorOffset = selection.getAnchorOffset();
    let focusOffset = selection.getFocusOffset();

    if (selection.getIsBackward()) {
        if (focusOffset !== 0) {
            focusOffset += 1;
        }

        if (anchorOffset !== 0) {
            anchorOffset += 1;
        }
    }

    if (!selection.getIsBackward()) {
        focusOffset += 1;

        if (anchorOffset !== 0) {
            anchorOffset += 1;
        }
    }

    return selection.merge({ anchorOffset, focusOffset });
};

export const cloneContentBlock = (
    contentBlock: ContentBlock,
    text: string
): ContentBlock => {
    return new ContentBlock({
        key: contentBlock.getKey(),
        type: contentBlock.getType(),
        data: contentBlock.getData(),
        text,
    });
};

/**
 *
 */
export const indentIncreaseBlock = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    blockKey: string
): EditorState => {
    const contentBlock = contentState.getBlockForKey(blockKey);
    // recover only the text of the selection to avoid
    // ending up with additional text when inserting
    const endText = contentBlock
        .getText()
        .substr(selection.getStartOffset(), selection.getEndOffset());

    const text = selection.getStartOffset() !== 0 ? '\t' : `\t${endText}`;

    return EditorState.acceptSelection(
        replaceWithFragment(editorState, contentState, selection, [
            cloneContentBlock(contentBlock, text),
        ]),
        mergeIndentIncreaseSelection(selection)
    );
};

/**
 *
 */
export const indentIncreaseBlocksForKeys = (
    editorState: EditorState,
    selection: SelectionState,
    contentState: ContentState,
    blockKeys: string[]
): EditorState => {
    const contentBlocks = contentState
        .getBlocksAsArray()
        .map((contentBlock) => {
            if (blockKeys.includes(contentBlock.getKey())) {
                return cloneContentBlock(
                    contentBlock,
                    `\t${contentBlock.getText()}`
                );
            }

            return contentBlock;
        });

    return EditorState.acceptSelection(
        pushContentStateFromArray(editorState, contentBlocks),
        mergeIndentIncreaseSelection(selection)
    );
};

/**
 *
 */
export const indentIncreaseSelection = (
    editorState: EditorState,
    contentState: ContentState
): EditorState => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();

    if (!selection.isCollapsed()) {
        if (startKey === endKey) {
            return indentIncreaseBlock(
                editorState,
                contentState,
                selection,
                startKey
            );
        }

        return indentIncreaseBlocksForKeys(
            editorState,
            selection,
            contentState,
            getBlocksKeysBetween(contentState, startKey, endKey)
        );
    }

    return insertText(editorState, contentState, selection, '\t');
};

/**
 *
 */
export const indentDecreaseSelection = (
    editorState: EditorState,
    contentState: ContentState
): EditorState => {
    const selectionState = editorState.getSelection();

    return indentDecreaseBlocksForKeys(
        editorState,
        selectionState,
        contentState,
        getBlocksKeysBetween(
            contentState,
            selectionState.getStartKey(),
            selectionState.getEndKey()
        )
    );
};

export const isOutdentable = (
    selectionState: SelectionState,
    contentState: ContentState
): boolean => {
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();

    return getBlocksBetween(contentState, startKey, endKey).some(
        (contentBlock) => {
            const startText = contentBlock.getText().substr(0, 1);
            return startText === '\t' || startText === ' ';
        }
    );
};

/**
 *
 */
export const indentDecreaseBlocksForKeys = (
    editorState: EditorState,
    selection: SelectionState,
    contentState: ContentState,
    blockKeys: string[]
): EditorState => {
    const contentBlocks = contentState
        .getBlocksAsArray()
        .map((contentBlock) => {
            if (
                blockKeys.includes(contentBlock.getKey()) &&
                contentBlock.getText().substr(0, 1) === '\t'
            ) {
                return cloneContentBlock(
                    contentBlock,
                    `${contentBlock.getText().substr(1)}`
                );
            }

            return contentBlock;
        });

    return EditorState.acceptSelection(
        pushContentStateFromArray(editorState, contentBlocks),
        mergeIndentDecreaseSelection(selection)
    );
};
