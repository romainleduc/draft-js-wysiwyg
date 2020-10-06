import {
    SelectionState,
    ContentBlock,
    EditorState,
    ContentState,
    BlockMapBuilder,
} from 'draft-js';
import {
    pushReplaceWithFragment,
    pushContentStateFromArray,
    getBlocksKeysBetween,
    insertText,
    getBlocksBetween,
    getBlocksSelected,
    getBlocksForKeys,
} from './blockUtils';

/**
 * Check if a content block is of type list.
 */
export const isListType = (contentBlock: ContentBlock): boolean => {
    const type = contentBlock.getType();
    return type === 'unordered-list-item' || type === 'ordered-list-item';
};

/**
 * Check if a content block is of nested list.
 */
export const isNestedList = (
    contentState: ContentState,
    contentBlock: ContentBlock
): boolean => {
    if (isListType(contentBlock)) {
        const contentBlockBefore = contentState.getBlockBefore(
            contentBlock.getKey()
        );
        return contentBlockBefore && isListType(contentBlockBefore);
    }

    return false;
};

/**
 */
export const isArrayOfNestedList = (
    contentState: ContentState,
    contentBlocks: ContentBlock[]
): boolean => {
    return contentBlocks.every((contentBlock) =>
        isNestedList(contentState, contentBlock)
    );
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
        depth: contentBlock.getDepth(),
        text,
    });
};

export const setDepth = (
    contentState: ContentState,
    contentBlock: ContentBlock,
    maxValue: number
): ContentBlock => {
    return contentBlock.set(
        'depth',
        Math.min(
            contentBlock.getDepth() + 1,
            Math.min(
                contentState.getBlockBefore(contentBlock.getKey()).getDepth() +
                    1,
                maxValue
            )
        )
    ) as ContentBlock;
};

export const indentIncreaseNestedListSelection = (
    editorState: EditorState,
    contentState: ContentState,
    selectionState: SelectionState
): EditorState => {
    const newContentBlocks = getBlocksSelected(editorState, contentState).map(
        (contentBlock) => {
            if (isNestedList(contentState, contentBlock)) {
                return setDepth(contentState, contentBlock, 4);
            }

            return contentBlock;
        }
    );

    return EditorState.push(
        editorState,
        contentState.merge({
            blockMap: contentState
                .getBlockMap()
                .merge(BlockMapBuilder.createFromArray(newContentBlocks)),
            selectionBefore: selectionState,
            selectionAfter: selectionState,
        }) as ContentState,
        'adjust-depth'
    );
};

/**
 *
 */
export const indentIncreaseBlockForKey = (
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

    if (isNestedList(contentState, contentBlock)) {
        return indentIncreaseNestedListSelection(
            editorState,
            contentState,
            selection
        );
    }

    return EditorState.acceptSelection(
        pushReplaceWithFragment(editorState, contentState, selection, [
            cloneContentBlock(
                contentBlock,
                selection.getStartOffset() !== 0 ? '\t' : `\t${endText}`
            ),
        ]),
        mergeIndentIncreaseSelection(selection)
    );
};

/**
 *
 */
export const indentIncreaseBlocksForKeys = (
    contentState: ContentState,
    blockKeys: string[]
): ContentBlock[] => {
    return getBlocksForKeys(contentState, blockKeys).map((contentBlock) => {
        if (blockKeys.includes(contentBlock.getKey())) {
            return cloneContentBlock(
                contentBlock,
                `\t${contentBlock.getText()}`
            );
        }

        return contentBlock;
    });
};

/**
 *
 */
export const indentIncreaseBlocksForKeysSelection = (
    editorState: EditorState,
    contentState: ContentState,
    selectionState: SelectionState
): EditorState => {
    const contentBlocks = getBlocksBetween(
        contentState,
        selectionState.getStartKey(),
        selectionState.getEndKey()
    );

    if (isArrayOfNestedList(contentState, contentBlocks)) {
        return indentIncreaseNestedListSelection(
            editorState,
            contentState,
            selectionState
        );
    } else {
        const blockKeys = contentBlocks.map((contentBlock) =>
            contentBlock.getKey()
        );

        return EditorState.acceptSelection(
            EditorState.push(
                editorState,
                contentState.merge({
                    blockMap: contentState
                        .getBlockMap()
                        .merge(
                            BlockMapBuilder.createFromArray(
                                indentIncreaseBlocksForKeys(
                                    contentState,
                                    blockKeys
                                )
                            )
                        ),
                    selectionBefore: selectionState,
                    selectionAfter: selectionState,
                }) as ContentState,
                'apply-entity'
            ),
            mergeIndentIncreaseSelection(selectionState)
        );
    }
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

    if (
        startKey === endKey &&
        (!selection.isCollapsed() ||
            isListType(contentState.getBlockForKey(startKey)))
    ) {
        return indentIncreaseBlockForKey(
            editorState,
            contentState,
            selection,
            startKey
        );
    }

    if (!selection.isCollapsed()) {
        return indentIncreaseBlocksForKeysSelection(
            editorState,
            contentState,
            selection
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
