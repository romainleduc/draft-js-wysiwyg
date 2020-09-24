import {
    EditorState,
    Modifier,
    ContentBlock,
    BlockMapBuilder,
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
export const indentBlocks = (blocks) => {
    return blocks.map(block => new ContentBlock({
        key: block.getKey(),
        type: block.getType(),
        text: `\t${block.getText()}`,
        data: block.getData(),
    }));
}

/**
 *  
 */
export const outdentBlocks = (blocks) => {
    return blocks.map(block => {
        console.log(block.getText().substr(0, 1) === '\t',block.getText().substr(0, 1))
        if (block.getText().substr(0, 1) === '\t') {
            return new ContentBlock({
                key: block.getKey(),
                type: block.getType(),
                text: `${block.getText().substr(1)}`,
                data: block.getData(),
            });
        }

        return block;
    });
}

/**
 * 
 */
export const indentSelection = (editorState, contentState, selection) => {
    if (!selection.isCollapsed()) {
        const blocks = getBlocksBetween(
            contentState,
            selection.getStartKey(),
            selection.getEndKey()
        );

        return replaceWithFragment(
            editorState,
            contentState,
            selection,
            indentBlocks(blocks)
        );
    } else {
        return insertText(editorState, contentState, selection, '\t');
    }
}

export const outdentSelection = (editorState, contentState, selection) => {
    if (!selection.isCollapsed()) {
        const blocks = getBlocksBetween(
            contentState,
            selection.getStartKey(),
            selection.getEndKey()
        );

        return replaceWithFragment(
            editorState,
            contentState,
            selection,
            outdentBlocks(blocks)
        );
    } else {
        return editorState;
    }
}

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