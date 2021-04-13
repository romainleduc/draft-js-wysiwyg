import {
  EditorState,
  Modifier,
  ContentBlock,
  BlockMapBuilder,
  ContentState,
  SelectionState,
  BlockMap,
  AtomicBlockUtils,
  RichUtils,
} from 'draft-js';
const { OrderedSet } = require('immutable');

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
 *
 */
export const getBlocksSelected = (
  editorState: EditorState,
  contentState: ContentState
): ContentBlock[] => {
  const selection = editorState.getSelection();
  return getBlocksBetween(
    contentState,
    selection.getStartKey(),
    selection.getEndKey()
  );
};

/**
 *
 */
export const getBlocksForKeys = (
  contentState: ContentState,
  blockKeys: string[]
): ContentBlock[] => {
  return contentState
    .getBlocksAsArray()
    .filter((contentBlock) => blockKeys.includes(contentBlock.getKey()));
};

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
export const pushReplaceWithFragment = (
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

export const insertAtomicBlock = (
  editorState: EditorState,
  type: string,
  data?: Object
): EditorState => {
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    editorState
      .getCurrentContent()
      .createEntity(type, 'IMMUTABLE', data)
      .getLastCreatedEntityKey(),
    ' '
  );
};

export const findEntitiesRangeByType = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
  type: string
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null && contentState.getEntity(entityKey).getType() === type
    );
  }, callback);
};

export const insertBlockType = (
  editorState: EditorState,
  value: string
): EditorState => {
  if (RichUtils.getCurrentBlockType(editorState) !== value) {
    return EditorState.push(
      editorState,
      Modifier.setBlockType(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        value
      ),
      'change-block-type'
    );
  }

  return editorState;
};

export const applyInlineStyle = (
  editorState: EditorState,
  inlineStyle: string
) => {
  const selection = editorState.getSelection();
  const currentStyle = editorState.getCurrentInlineStyle();

  // If the selection is collapsed, toggle the specified style on or off and
  // set the result as the new inline style override. This will then be
  // used as the inline style for the next character to be inserted.
  if (selection.isCollapsed()) {
    return !currentStyle.has(inlineStyle)
      ? EditorState.setInlineStyleOverride(
          editorState,
          currentStyle.add(inlineStyle)
        )
      : editorState;
  }

  // If the style is already present for the selection range, remove it.
  // Otherwise, apply it.
  if (currentStyle.has(inlineStyle)) {
    return editorState;
  }

  return EditorState.push(
    editorState,
    Modifier.applyInlineStyle(
      editorState.getCurrentContent(),
      selection,
      inlineStyle
    ),
    'change-inline-style'
  );
};

export const setInlineStyle = (
  editorState: EditorState,
  inlineStyle: string | string[]
) => {
  const selection = editorState.getSelection();

  // If the selection is collapsed, toggle the specified style on or off and
  // set the result as the new inline style override. This will then be
  // used as the inline style for the next character to be inserted.
  if (selection.isCollapsed()) {
    return EditorState.setInlineStyleOverride(
      editorState,
      OrderedSet(Array.isArray(inlineStyle) ? inlineStyle : [inlineStyle])
    );
  }

  return editorState;
};

export const removeInlineStyle = (
  editorState: EditorState,
  inlineStyle: string
): EditorState => {
  const selection = editorState.getSelection();
  const currentStyle = editorState.getCurrentInlineStyle();

  // If the selection is collapsed, toggle the specified style on or off and
  // set the result as the new inline style override. This will then be
  // used as the inline style for the next character to be inserted.
  if (selection.isCollapsed()) {
    return currentStyle.has(inlineStyle)
      ? EditorState.setInlineStyleOverride(
          editorState,
          currentStyle.remove(inlineStyle)
        )
      : editorState;
  }

  // If the style is already present for the selection range, remove it.
  // Otherwise, apply it.
  if (!currentStyle.has(inlineStyle)) {
    return editorState;
  }

  return EditorState.push(
    editorState,
    Modifier.removeInlineStyle(
      editorState.getCurrentContent(),
      selection,
      inlineStyle
    ),
    'change-inline-style'
  );
};
