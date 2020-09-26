import {
    EditorState,
    Modifier,
    ContentBlock,
    BlockMapBuilder,
    ContentState,
} from 'draft-js';

/**
 * 
 */
export const getBlockDataForKey = (contentState, blockKey) => {
    return contentState
        .getBlockForKey(blockKey)
        ?.getData();
}

/**
 * Returns collection of blocks.
 */
export function getBlocksMapBetween(blockMap, startKey, endKey) {
    return blockMap
        .toSeq()
        .skipUntil((_, k) => k === startKey)
        .takeUntil((_, k) => k === endKey)
        .concat([[endKey, blockMap.get(endKey)]]);
}

/**
 * Returns array of blocks.
 */
export function getBlocksBetween(contentState, startKey, endKey) {
    return getBlocksMapBetween(
        contentState.getBlockMap(),
        startKey,
        endKey
    ).toArray();
}

/**
 * Returns array keys of blocks.
 */
export function getBlocksKeysBetween(contentState, startKey, endKey) {
    return getBlocksMapBetween(
        contentState.getBlockMap(),
        startKey,
        endKey
    ).toArray().map(contentBlock => contentBlock.getKey());
}

/**
 * Add block level meta-data.
 */
export const setBlockData = (editorState, blockData) => {
    return EditorState.push(
        editorState,
        Modifier.setBlockData(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            blockData
        ),
        'change-block-data'
    );
}

/**
 * 
 */
export const insertText = (editorState, contentState, selection, text) => {
    return EditorState.push(
        editorState,
        Modifier.insertText(contentState, selection, text),
        'insert-characters'
    );
}

/**
 * 
 */
export const replaceWithFragment = (editorState, contentState, selection, blocks) => {
    return EditorState.push(
        editorState,
        Modifier.replaceWithFragment(
            contentState,
            selection,
            BlockMapBuilder.createFromArray(blocks)
        ),
        'insert-fragment'
    );
}

/**
 * 
 */
export const indentBlock = (
    editorState,
    contentState,
    selection,
    blockKey,
) => {
    const contentBlock = contentState.getBlockForKey(blockKey);
    // recover only the text of the selection to avoid
    // ending up with additional text when inserting
    const endText = contentBlock.getText()
        .substr(selection.getStartOffset(), selection.getEndOffset());

    return replaceWithFragment(
        editorState,
        contentState,
        selection,
        [
            new ContentBlock({
                key: contentBlock.getKey(),
                type: contentBlock.getType(),
                text: selection.getStartOffset() !== 0 ? '\t' : `\t${endText}`,
                data: contentBlock.getData(),
            }),
        ]
    );
}

/**
 * 
 */
export const indentBlocksForKeys = (editorState, contentState, blockKeys) => {
    const contentBlocks = contentState.getBlocksAsArray().map(contentBlock => {
        if (blockKeys.includes(contentBlock.getKey())) {
            return new ContentBlock({
                key: contentBlock.getKey(),
                type: contentBlock.getType(),
                text: `\t${contentBlock.getText()}`,
                data: contentBlock.getData(),
            });
        }

        return contentBlock;
    });

    return EditorState.push(
        editorState,
        ContentState.createFromBlockArray(contentBlocks),
        'apply-entity'
    );
}

/**
 * 
 */
export const indentSelection = (editorState, contentState) => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();

    if (!selection.isCollapsed()) {
        if (startKey === endKey) {
            return indentBlock(
                editorState,
                contentState,
                selection,
                startKey
            );
        }

        return indentBlocksForKeys(
            editorState,
            contentState,
            getBlocksKeysBetween(contentState, startKey, endKey)
        );
    }

    return insertText(editorState, contentState, selection, '\t');
}

/**
 *
 */
export const outdentBlocksForKeys = (editorState, contentState, blockKeys) => {
    const contentBlocks = contentState.getBlocksAsArray().map(contentBlock => {
        if (blockKeys.includes(contentBlock.getKey()) && contentBlock.getText().substr(0, 1) === '\t') {
            return new ContentBlock({
                key: contentBlock.getKey(),
                type: contentBlock.getType(),
                text: `${contentBlock.getText().substr(1)}`,
                data: contentBlock.getData(),
            });
        }

        return contentBlock;
    });

    return EditorState.push(
        editorState,
        ContentState.createFromBlockArray(contentBlocks),
        'apply-entity'
    );
}

/**
 * 
 */
export const outdentSelection = (editorState, contentState) => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();

    return outdentBlocksForKeys(
        editorState,
        contentState,
        getBlocksKeysBetween(contentState, startKey, endKey)
    );
}

/**
 * 
 */
export const mergeBlockData = (editorState, contentState, blockKey) => {
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