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

type IndentType = 'decrease' | 'increase';

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

export const pushAdjustDepth = (
    editorState: EditorState,
    contentState: ContentState
): EditorState => {
    return EditorState.push(editorState, contentState, 'adjust-depth');
};

export const indentNestedList = (
    editorState: EditorState,
    contentState: ContentState,
    selectionState: SelectionState,
    indentType: IndentType
): EditorState => {
    const newContentBlocks = getBlocksSelected(editorState, contentState).map(
        (contentBlock) => {
            if (!isNestedList(contentState, contentBlock)) {
                return contentBlock;
            }

            const adjustment = indentType === 'increase' ? +1 : -1;

            return contentBlock.set(
                'depth',
                Math.min(
                    Math.max(contentBlock.getDepth() + adjustment, 0),
                    Math.min(
                        contentState
                            .getBlockBefore(contentBlock.getKey())
                            .getDepth() + 1,
                        4
                    )
                )
            ) as ContentBlock;
        }
    );

    return pushAdjustDepth(
        editorState,
        contentState.merge({
            blockMap: contentState
                .getBlockMap()
                .merge(BlockMapBuilder.createFromArray(newContentBlocks)),
            selectionBefore: selectionState,
            selectionAfter: selectionState,
        }) as ContentState
    );
};

/**
 *
 */
export const indentIncreaseBlockForKey = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    blockKey: string,
    nestedListOnly = false
): EditorState => {
    const contentBlock = contentState.getBlockForKey(blockKey);
    // recover only the text of the selection to avoid
    // ending up with additional text when inserting
    const endText = contentBlock
        .getText()
        .substr(selection.getStartOffset(), selection.getEndOffset());

    if (isNestedList(contentState, contentBlock)) {
        return indentNestedList(
            editorState,
            contentState,
            selection,
            'increase'
        );
    }

    if (nestedListOnly) {
        return editorState;
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
    blockKeys: string[],
    indentType: IndentType
): ContentBlock[] => {
    return getBlocksForKeys(contentState, blockKeys).map((contentBlock) => {
        if (blockKeys.includes(contentBlock.getKey())) {
            let newText = contentBlock.getText();

            if (indentType === 'increase') {
                newText = `\t${newText}`;
            } else if (newText.substr(0, 1) === '\t') {
                newText = newText.substr(1);
            }

            return cloneContentBlock(contentBlock, newText);
        }

        return contentBlock;
    });
};

/**
 *
 */
export const indentIncreaseBlocksForSelection = (
    editorState: EditorState,
    contentState: ContentState,
    selectionState: SelectionState,
    nestedListOnly = false
): EditorState => {
    const contentBlocks = getBlocksBetween(
        contentState,
        selectionState.getStartKey(),
        selectionState.getEndKey()
    );

    if (isArrayOfNestedList(contentState, contentBlocks)) {
        return indentNestedList(
            editorState,
            contentState,
            selectionState,
            'increase'
        );
    }

    if (nestedListOnly) {
        return editorState;
    }

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
                                blockKeys,
                                'increase'
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
};

/**
 *
 */
export const indentIncreaseSelection = (
    editorState: EditorState,
    contentState: ContentState,
    nestedListOnly = false
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
            startKey,
            nestedListOnly
        );
    }

    if (!selection.isCollapsed()) {
        return indentIncreaseBlocksForSelection(
            editorState,
            contentState,
            selection,
            nestedListOnly
        );
    }

    return insertText(editorState, contentState, selection, '\t');
};

/**
 *
 */
export const indentDecreaseSelection = (
    editorState: EditorState,
    contentState: ContentState,
    nestedListOnly = false
): EditorState => {
    const selectionState = editorState.getSelection();

    return indentDecreaseBlocksForKeys(
        editorState,
        selectionState,
        contentState,
        nestedListOnly
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
    selectionState: SelectionState,
    contentState: ContentState,
    nestedListOnly = false
): EditorState => {
    const contentBlocks = getBlocksBetween(
        contentState,
        selectionState.getStartKey(),
        selectionState.getEndKey()
    );

    if (isArrayOfNestedList(contentState, contentBlocks)) {
        return indentNestedList(
            editorState,
            contentState,
            selectionState,
            'decrease'
        );
    }

    if (nestedListOnly) {
        return editorState;
    }

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
                                blockKeys,
                                'decrease'
                            )
                        )
                    ),
                selectionBefore: selectionState,
                selectionAfter: selectionState,
            }) as ContentState,
            'apply-entity'
        ),
        mergeIndentDecreaseSelection(selectionState)
    );
};
