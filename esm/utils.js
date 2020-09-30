import { EditorState, Modifier, ContentBlock, BlockMapBuilder, ContentState, SelectionState, } from 'draft-js';
/**
 *
 */
export var getBlockDataForKey = function (contentState, blockKey) {
    var _a;
    return (_a = contentState
        .getBlockForKey(blockKey)) === null || _a === void 0 ? void 0 : _a.getData();
};
/**
 * Returns collection of blocks.
 */
export function getBlocksMapBetween(blockMap, startKey, endKey) {
    return blockMap
        .toSeq()
        .skipUntil(function (_, k) { return k === startKey; })
        .takeUntil(function (_, k) { return k === endKey; })
        .concat([[endKey, blockMap.get(endKey)]]);
}
/**
 * Returns array of blocks.
 */
export function getBlocksBetween(contentState, startKey, endKey) {
    return getBlocksMapBetween(contentState.getBlockMap(), startKey, endKey).toArray();
}
/**
 * Returns array keys of blocks.
 */
export function getBlocksKeysBetween(contentState, startKey, endKey) {
    return getBlocksMapBetween(contentState.getBlockMap(), startKey, endKey)
        .toArray()
        .map(function (contentBlock) { return contentBlock.getKey(); });
}
/**
 * Add block level meta-data.
 */
export var setBlockData = function (editorState, contentState, selection, blockData) {
    return EditorState.push(editorState, Modifier.setBlockData(contentState, selection, blockData), 'change-block-data');
};
/**
 *
 */
export var setAllBlocksData = function (editorState, contentState, blockData) {
    var blocks = contentState.getBlocksAsArray();
    var selectionState = SelectionState.createEmpty('blockkey');
    return setBlockData(editorState, contentState, selectionState.merge({
        anchorKey: blocks[0].getKey(),
        focusKey: blocks[blocks.length - 1].getKey(),
    }), blockData);
};
/**
 *
 */
export var insertText = function (editorState, contentState, selection, text) {
    return EditorState.push(editorState, Modifier.insertText(contentState, selection, text), 'insert-characters');
};
/**
 *
 */
export var replaceWithFragment = function (editorState, contentState, selection, contentBlocks) {
    return EditorState.push(editorState, Modifier.replaceWithFragment(contentState, selection, BlockMapBuilder.createFromArray(contentBlocks)), 'insert-fragment');
};
export var pushContentStateFromArray = function (editorState, contentBlocks) {
    return EditorState.push(editorState, ContentState.createFromBlockArray(contentBlocks), 'apply-entity');
};
/**
 * Return a new selection by merging the outdentation offset.
 */
export var mergeOutdentSelection = function (selection) {
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
export var mergeIndentSelection = function (selection) {
    var anchorOffset = selection.getAnchorOffset();
    var focusOffset = selection.getFocusOffset();
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
    return selection.merge({ anchorOffset: anchorOffset, focusOffset: focusOffset });
};
export var cloneContentBlock = function (contentBlock, text) {
    return new ContentBlock({
        key: contentBlock.getKey(),
        type: contentBlock.getType(),
        data: contentBlock.getData(),
        text: text,
    });
};
/**
 *
 */
export var indentBlock = function (editorState, contentState, selection, blockKey) {
    var contentBlock = contentState.getBlockForKey(blockKey);
    // recover only the text of the selection to avoid
    // ending up with additional text when inserting
    var endText = contentBlock.getText()
        .substr(selection.getStartOffset(), selection.getEndOffset());
    var text = selection.getStartOffset() !== 0 ? '\t' : "\t" + endText;
    return EditorState.acceptSelection(replaceWithFragment(editorState, contentState, selection, [cloneContentBlock(contentBlock, text)]), mergeIndentSelection(selection));
};
/**
 *
 */
export var indentBlocksForKeys = function (editorState, selection, contentState, blockKeys) {
    var contentBlocks = contentState
        .getBlocksAsArray()
        .map(function (contentBlock) {
        if (blockKeys.includes(contentBlock.getKey())) {
            return cloneContentBlock(contentBlock, "\t" + contentBlock.getText());
        }
        return contentBlock;
    });
    return EditorState.acceptSelection(pushContentStateFromArray(editorState, contentBlocks), mergeIndentSelection(selection));
};
/**
 *
 */
export var indentSelection = function (editorState, contentState) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    if (!selection.isCollapsed()) {
        if (startKey === endKey) {
            return indentBlock(editorState, contentState, selection, startKey);
        }
        return indentBlocksForKeys(editorState, selection, contentState, getBlocksKeysBetween(contentState, startKey, endKey));
    }
    return insertText(editorState, contentState, selection, '\t');
};
/**
 *
 */
export var outdentBlocksForKeys = function (editorState, selection, contentState, blockKeys) {
    var contentBlocks = contentState
        .getBlocksAsArray()
        .map(function (contentBlock) {
        if (blockKeys.includes(contentBlock.getKey()) && contentBlock.getText().substr(0, 1) === '\t') {
            return cloneContentBlock(contentBlock, "" + contentBlock.getText().substr(1));
        }
        return contentBlock;
    });
    return EditorState.acceptSelection(pushContentStateFromArray(editorState, contentBlocks), mergeOutdentSelection(selection));
};
/**
 *
 */
export var outdentSelection = function (editorState, contentState) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    return outdentBlocksForKeys(editorState, selection, contentState, getBlocksKeysBetween(contentState, startKey, endKey));
};
/**
 *
 */
export var mergeBlockData = function (editorState, contentState, blockKey) {
    var blockData = getBlockDataForKey(contentState, blockKey);
    var selection = editorState.getSelection();
    if (!blockData || !selection.isCollapsed()) {
        return editorState;
    }
    var splitState = EditorState.push(editorState, Modifier.splitBlock(contentState, selection), 'split-block');
    return EditorState.push(editorState, Modifier.mergeBlockData(splitState.getCurrentContent(), splitState.getSelection(), blockData), 'split-block');
};
