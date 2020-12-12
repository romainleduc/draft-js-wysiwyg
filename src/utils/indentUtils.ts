import {
  SelectionState,
  ContentBlock,
  EditorState,
  ContentState,
  BlockMapBuilder,
} from 'draft-js';
import {
  pushReplaceWithFragment,
  insertText,
  getBlocksBetween,
  getBlocksSelected,
  getBlocksForKeys,
} from './blockUtils';

export type IndentType = 'decrease' | 'increase';

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
 * Return a new selection by merging the indentation offset.
 *
 * The function will always keep the start of the selection
 * of the first row when it starts at 0.
 */
export const mergeIndentSelection = (
  selection: SelectionState,
  indentType: IndentType
): SelectionState => {
  let anchorOffset = selection.getAnchorOffset();
  let focusOffset = selection.getFocusOffset();

  if (indentType === 'decrease') {
    anchorOffset--;
    focusOffset--;
  }

  if (indentType === 'increase') {
    if (selection.getIsBackward()) {
      if (focusOffset !== 0) {
        focusOffset++;
      }

      if (anchorOffset !== 0) {
        anchorOffset++;
      }
    }

    if (!selection.getIsBackward()) {
      focusOffset++;

      if (anchorOffset !== 0) {
        anchorOffset++;
      }
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
            contentState.getBlockBefore(contentBlock.getKey()).getDepth() + 1,
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
    return indentNestedList(editorState, contentState, selection, 'increase');
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
    mergeIndentSelection(selection, 'increase')
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
export const indentBlocksForSelection = (
  editorState: EditorState,
  contentState: ContentState,
  selectionState: SelectionState,
  indentType: IndentType,
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
      indentType
    );
  }

  if (nestedListOnly) {
    return editorState;
  }

  const blockKeys = contentBlocks.map((contentBlock) => contentBlock.getKey());

  return EditorState.acceptSelection(
    EditorState.push(
      editorState,
      contentState.merge({
        blockMap: contentState
          .getBlockMap()
          .merge(
            BlockMapBuilder.createFromArray(
              indentIncreaseBlocksForKeys(contentState, blockKeys, indentType)
            )
          ),
        selectionBefore: selectionState,
        selectionAfter: selectionState,
      }) as ContentState,
      'apply-entity'
    ),
    mergeIndentSelection(selectionState, indentType)
  );
};

/**
 *
 */
export const indentSelection = (
  editorState: EditorState,
  contentState: ContentState,
  indentType: IndentType,
  nestedListOnly = false
): EditorState => {
  const selectionState = editorState.getSelection();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();

  if (indentType === 'decrease') {
    return indentBlocksForSelection(
      editorState,
      contentState,
      selectionState,
      'decrease',
      nestedListOnly
    );
  }

  if (
    startKey === endKey &&
    (!selectionState.isCollapsed() ||
      isListType(contentState.getBlockForKey(startKey)))
  ) {
    return indentIncreaseBlockForKey(
      editorState,
      contentState,
      selectionState,
      startKey,
      nestedListOnly
    );
  }

  if (!selectionState.isCollapsed()) {
    return indentBlocksForSelection(
      editorState,
      contentState,
      selectionState,
      'increase',
      nestedListOnly
    );
  }

  return insertText(editorState, contentState, selectionState, '\t');
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
