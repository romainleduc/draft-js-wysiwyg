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