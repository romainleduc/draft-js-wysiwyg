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
    ).toArray().map(contentBlock => {
        return contentBlock.getKey();
    });
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
 *  Note: does not work correctly at the moment
 */
export const outdentBlocks = (blocks, selection) => {
    return blocks.map(block => {
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

// /**
//  * 
//  */
// export const indentSelection = (editorState, contentState, selection) => {
//     if (!selection.isCollapsed()) {
//         const startKey = selection.getStartKey();
//         const endKey = selection.getEndKey();

//         const blocks = getBlocksBetween(
//             contentState,
//             selection.getStartKey(),
//             selection.getEndKey()
//         );

//         if (startKey === endKey) {
//             return indentBlock(editorState, contentState, selection, startKey);
//         }
//         else {
//             return indentSelectionBlocks(editorState, blocks);
//         }

//     }

//     return insertText(editorState, contentState, selection, '\t');
// }

/**
 * 
 */
export const outdentSelection = (editorState, contentState, selection) => {
    if (!selection.isCollapsed()) {
        const blocks = getBlocksBetween(
            contentState,
            selection.getStartKey(),
            selection.getEndKey()
        );

        console.log('blocks: ', blocks, 'outdentBlocks: ', outdentBlocks(blocks));

        const test = replaceWithFragment(
            editorState,
            contentState,
            selection,
            outdentBlocks(blocks)
        );

        console.log('replaceWithFragment: ', test)
        return test;
    }

    return editorState;
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