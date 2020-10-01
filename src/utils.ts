import {
    EditorState,
    Modifier,
    ContentBlock,
    BlockMapBuilder,
    ContentState,
    SelectionState,
    BlockMap,
} from 'draft-js';

/**
 * 
 */
export const getBlockDataForKey = (contentState: ContentState, blockKey: string) => {
    return contentState
        .getBlockForKey(blockKey)
        ?.getData();
}

/**
 * Returns collection of blocks.
 */
export function getBlocksMapBetween(
    blockMap: BlockMap,
    startKey: string,
    endKey: string
) {
    return blockMap
        .toSeq()
        .skipUntil((_, k) => k === startKey)
        .takeUntil((_, k) => k === endKey)
        .concat([[endKey, blockMap.get(endKey)]]);
}

/**
 * Returns array of blocks.
 */
export function getBlocksBetween(
    contentState: ContentState,
    startKey: string,
    endKey: string
) {
    return getBlocksMapBetween(
        contentState.getBlockMap(),
        startKey,
        endKey
    ).toArray();
}

/**
 * Returns array keys of blocks.
 */
export function getBlocksKeysBetween(
    contentState: ContentState,
    startKey: string,
    endKey: string
) {
    return getBlocksMapBetween(
        contentState.getBlockMap(),
        startKey,
        endKey
    )
    .toArray()
    .map(contentBlock => contentBlock.getKey());
}

/**
 * Add block level meta-data.
 */
export const setBlockData = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    blockData: any
) => {
    return EditorState.push(
        editorState,
        Modifier.setBlockData(
            contentState,
            selection,
            blockData
        ),
        'change-block-data'
    );
}

/**
 * 
 */
export const setAllBlocksData = (
    editorState: EditorState,
    contentState: ContentState,
    blockData: any
) => {
    const blocks = contentState.getBlocksAsArray();
    const selectionState = SelectionState.createEmpty('blockkey');

    return setBlockData(
        editorState,
        contentState,
        selectionState.merge({
            anchorKey: blocks[0].getKey(),
            focusKey: blocks[blocks.length -1].getKey(),
        }),
        blockData
    );
}

/**
 * 
 */
export const insertText = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    text: string
) => {
    return EditorState.push(
        editorState,
        Modifier.insertText(contentState, selection, text),
        'insert-characters'
    );
}

/**
 * 
 */
export const replaceWithFragment = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    contentBlocks: ContentBlock[]
) => {
    return EditorState.push(
        editorState,
        Modifier.replaceWithFragment(
            contentState,
            selection,
            BlockMapBuilder.createFromArray(contentBlocks)
        ),
        'insert-fragment'
    );
}

export const pushContentStateFromArray = (
    editorState: EditorState,
    contentBlocks: ContentBlock[]
) => {
    return EditorState.push(
        editorState,
        ContentState.createFromBlockArray(contentBlocks),
        'apply-entity'
    );
}

/**
 * Return a new selection by merging the outdentation offset.
 */
export const mergeIndentDecreaseSelection = (selection: SelectionState) => {
    return selection.merge({
        anchorOffset: selection.getAnchorOffset() - 1,
        focusOffset: selection.getFocusOffset() - 1,
    });
}

/**
 * Return a new selection by merging the indentation offset.
 * 
 * The function will always keep the start of the selection
 * of the first row when it starts at 0.
 */
export const mergeIndentIncreaseSelection = (selection: SelectionState) => {
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
}

export const cloneContentBlock = (contentBlock: ContentBlock, text: string) => {
    return new ContentBlock({
        key: contentBlock.getKey(),
        type: contentBlock.getType(),
        data: contentBlock.getData(),
        text,
    });
}

/**
 * 
 */
export const indentIncreaseBlock = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    blockKey: string,
) => {
    const contentBlock = contentState.getBlockForKey(blockKey);
    // recover only the text of the selection to avoid
    // ending up with additional text when inserting
    const endText = contentBlock.getText()
        .substr(selection.getStartOffset(), selection.getEndOffset());

    const text = selection.getStartOffset() !== 0 ? '\t' : `\t${endText}`;

    return EditorState.acceptSelection(
        replaceWithFragment(
            editorState,
            contentState,
            selection,
            [cloneContentBlock(contentBlock, text)]
        ),
        mergeIndentIncreaseSelection(selection)
    );
}

/**
 * 
 */
export const indentIncreaseBlocksForKeys = (
    editorState: EditorState,
    selection: SelectionState,
    contentState: ContentState,
    blockKeys: any
) => {
    const contentBlocks = contentState
        .getBlocksAsArray()
        .map(contentBlock => {
            if (blockKeys.includes(contentBlock.getKey())) {
                return cloneContentBlock(contentBlock, `\t${contentBlock.getText()}`);
            }

            return contentBlock;
        });

    return EditorState.acceptSelection(
        pushContentStateFromArray(
            editorState,
            contentBlocks
        ),
        mergeIndentIncreaseSelection(selection)
    );
}

/**
 * 
 */
export const indentSelection = (
    editorState: EditorState,
    contentState: ContentState,
    type: 'increase' | 'decrease'
) => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();

    if (type === 'decrease') {
        return indentDecreaseBlocksForKeys(
            editorState,
            selection,
            contentState,
            getBlocksKeysBetween(contentState, startKey, endKey)
        );
    }

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
}

export const isOutdentable = (
    selectionState: SelectionState,
    contentState: ContentState
): boolean => {
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();

    return getBlocksBetween(contentState, startKey, endKey).some(contentBlock => {
        const startText = contentBlock.getText().substr(0, 1);
        return startText === '\t' || startText === ' ';
    });
}

/**
 *
 */
export const indentDecreaseBlocksForKeys = (
    editorState: EditorState,
    selection: SelectionState,
    contentState: ContentState,
    blockKeys: any
): EditorState => {
    const contentBlocks = contentState
        .getBlocksAsArray()
        .map(contentBlock => {
            if (blockKeys.includes(contentBlock.getKey()) && contentBlock.getText().substr(0, 1) === '\t') {
                return cloneContentBlock(contentBlock, `${contentBlock.getText().substr(1)}`);
            }

            return contentBlock;
        });

    return EditorState.acceptSelection(
        pushContentStateFromArray(
            editorState,
            contentBlocks
        ),
        mergeIndentDecreaseSelection(selection)
    );
}


/**
 * 
 */
export const mergeBlockData = (
    editorState: EditorState,
    contentState: ContentState,
    blockKey: string
) => {
    const blockData = getBlockDataForKey(contentState, blockKey);
    const selection = editorState.getSelection();

    if (!blockData || !selection.isCollapsed()) {
        return editorState;
    }

    const splitState = EditorState.push(
        editorState,
        Modifier.splitBlock(contentState, selection),
        'split-block'
    );

    return EditorState.push(
        editorState,
        Modifier.mergeBlockData(
            splitState.getCurrentContent(),
            splitState.getSelection(),
            blockData
        ),
        'split-block'
    );
}