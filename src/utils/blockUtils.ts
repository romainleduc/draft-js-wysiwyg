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
 * Returns collection of blocks.
 */
export function getBlocksMapBetween(
    blockMap: BlockMap,
    startKey: string,
    endKey: string
): Immutable.Iterable<string, ContentBlock> {
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
): ContentBlock[] {
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
): string[] {
    return getBlocksMapBetween(contentState.getBlockMap(), startKey, endKey)
        .toArray()
        .map((contentBlock) => contentBlock.getKey());
}

/**
 * Add block level meta-data.
 */
export const setBlockData = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
    blockData: any
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    /* eslint-enable  @typescript-eslint/explicit-module-boundary-types */
): EditorState => {
    return EditorState.push(
        editorState,
        Modifier.setBlockData(contentState, selection, blockData),
        'change-block-data'
    );
};

/**
 *
 */
export const setBlocksData = (
    editorState: EditorState,
    contentState: ContentState,
    anchorKey: string,
    focusKey: string,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
    blockData: any
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    /* eslint-enable  @typescript-eslint/explicit-module-boundary-types */
): EditorState => {
    return setBlockData(
        editorState,
        contentState,
        SelectionState.createEmpty('blockkey').merge({
            anchorKey,
            focusKey,
        }),
        blockData
    );
};

/**
 *
 */
export const insertText = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    text: string
): EditorState => {
    return EditorState.push(
        editorState,
        Modifier.insertText(contentState, selection, text),
        'insert-characters'
    );
};

/**
 *
 */
export const replaceWithFragment = (
    editorState: EditorState,
    contentState: ContentState,
    selection: SelectionState,
    contentBlocks: ContentBlock[]
): EditorState => {
    return EditorState.push(
        editorState,
        Modifier.replaceWithFragment(
            contentState,
            selection,
            BlockMapBuilder.createFromArray(contentBlocks)
        ),
        'insert-fragment'
    );
};

export const pushContentStateFromArray = (
    editorState: EditorState,
    contentBlocks: ContentBlock[]
): EditorState => {
    return EditorState.push(
        editorState,
        ContentState.createFromBlockArray(contentBlocks),
        'apply-entity'
    );
};

/**
 *
 */
export const mergeBlockData = (
    editorState: EditorState,
    contentState: ContentState,
    blockKey: string
): EditorState => {
    const blockData = contentState.getBlockForKey(blockKey)?.getData();
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
};